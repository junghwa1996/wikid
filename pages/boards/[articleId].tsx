// FIXME : 댓글 수정, 삭제 시 댓글 목록이 초기화되는 문제 해결 필요

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArticleData, CommentsData } from 'types/board';

import Button from '@/components/Button';
import instance from '@/lib/axios-client';
import { getBoardDetail } from '@/services/api/boardsAPI';
import { getUserInfo } from '@/services/api/userInfoAPI';

import { useProfileContext } from '@/hooks/useProfileContext';
import BoardDetailCard from '@/components/boards.page/BoardDetailCard';
import CommentForm from '@/components/boards.page/CommentForm';
import Comment from '@/components/boards.page/Comment';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { articleId } = context.query;

  if (!articleId || Array.isArray(articleId)) {
    return {
      props: {
        boardData: null,
        initialComments: null,
        articleId: null,
      },
    };
  }

  const parsedArticleId = parseInt(articleId, 10);

  if (isNaN(parsedArticleId)) {
    return {
      props: {
        boardData: null,
        initialComments: null,
        articleId: null,
      },
    };
  }

  try {
    const boardData = await getBoardDetail(parsedArticleId);
    const commentsData = await instance.get(
      `/articles/${parsedArticleId}/comments?limit=10`
    );

    return {
      props: {
        boardData,
        initialComments: commentsData.data,
        articleId: parsedArticleId,
      },
    };
  } catch (error) {
    console.error('SSR에서 게시글 데이터를 불러오는데 실패했습니다.', error);

    return {
      props: {
        boardData: null,
        initialComments: null,
        articleId: parsedArticleId,
      },
    };
  }
}

interface BoardsDetailsProps {
  boardData: ArticleData | null;
  initialComments: CommentsData | null;
  articleId: number | null;
}

export default function BoardsDetails({
  boardData,
  initialComments,
  articleId,
}: BoardsDetailsProps) {
  const [comments, setComments] = useState<CommentsData | null>(
    initialComments
  );
  const [value, setValue] = useState('');
  const [userId, setUserId] = useState<number | string | null>(null);
  const [cursor, setCursor] = useState<string | null>(
    initialComments?.nextCursor || null
  );
  const [hasMore, setHasMore] = useState(initialComments?.nextCursor !== null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const { isAuthenticated } = useProfileContext();

  const LIMIT = 10;

  // 유저 정보 로드
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        if (res) {
          setUserId(res.id);
        }
      } catch (error) {
        return null;
      }
    };

    fetchUserInfo();
  }, []);

  // 댓글 데이터 가져오기
  const fetchComments = useCallback(async () => {
    if (isLoading || !hasMore || !articleId) return; // 중복 요청 방지 및 articleId 확인

    setIsLoading(true);
    setError(null); // 이전 에러 상태 초기화

    try {
      const res = await instance.get(
        `/articles/${articleId}/comments?limit=${LIMIT}${
          cursor ? `&cursor=${cursor}` : ''
        }`
      );
      const newComments = res.data.list;
      const newNextCursor = res.data.nextCursor;

      // 중복 제거 및 댓글 추가
      setComments((prevComments) => {
        if (!prevComments) return res.data;

        const existingIds = new Set(prevComments.list.map((item) => item.id));
        const filteredNewComments = newComments.filter(
          (item: any) => !existingIds.has(item.id)
        );

        return {
          ...res.data,
          list: [...prevComments.list, ...filteredNewComments],
        };
      });

      // 다음 커서 업데이트
      setCursor(newNextCursor);
      setHasMore(newNextCursor !== null);
    } catch (error) {
      console.error('댓글 데이터를 불러오지 못했습니다.', error);
      setError('댓글 데이터를 불러오는 중 문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [articleId, cursor, hasMore, isLoading]);

  // Intersection Observer 설정
  const lastCommentElementRef = useCallback(
    (node: Element | null) => {
      if (isLoading || !hasMore) return; // 로딩 중이거나 더 가져올 데이터가 없으면 실행하지 않음

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          fetchComments();
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, isLoading, fetchComments]
  );

  // 댓글 입력창 value 변경
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // 댓글 등록
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || !articleId) return;

    try {
      if (isAuthenticated) {
        await instance.post(`/articles/${articleId}/comments`, {
          content: value,
        });
        setValue('');
        setComments(null);
        setCursor(null);
        setHasMore(true);
        await fetchComments();
      } else {
        alert('로그인이 필요한 서비스입니다.');
        return await Router.push('/login');
      }
    } catch (error) {
      console.error('댓글을 등록하지 못했습니다.', error);
    }
  };

  // 댓글 수정
  const handleUpdate = async (id: number, newContent: string) => {
    try {
      await instance.patch(`/comments/${id}`, { content: newContent });
      setComments(null);
      setCursor(null);
      setHasMore(true);
      await fetchComments();
    } catch (error) {
      console.error('댓글을 수정하지 못했습니다.', error);
    }
  };

  // 댓글 삭제
  const handleDelete = async (id: number) => {
    try {
      await instance.delete(`/comments/${id}`);
      setComments(null);
      setCursor(null);
      setHasMore(true);
      await fetchComments();
    } catch (error) {
      console.error('댓글을 삭제하지 못했습니다.', error);
    }
  };

  useEffect(() => {
    if (!comments && hasMore && !isLoading && articleId !== null) {
      fetchComments();
    }
  }, [comments, hasMore, isLoading, fetchComments, articleId]);

  // 게시글 데이터가 없는 경우 로딩 상태
  if (!boardData) {
    return <div>게시글을 불러오는 중입니다...</div>;
  }

  // 에러가 있는 경우 에러 메시지 표시
  if (error) {
    return <div>댓글을 불러오지 못했습니다: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>{boardData.title} - 자유게시판 | wikied</title>
      </Head>
      <main className="mt-20 py-[50px] mo:py-5 ta:py-10 tamo:mt-[60px]">
        <div className="container flex flex-col gap-[60px] ta:px-[60px] pc:max-w-[1095px] tamo:gap-10">
          <BoardDetailCard
            id={boardData.id}
            isOwner={boardData.writer.id === userId}
            title={boardData.title}
            name={boardData.writer.name}
            createdAt={boardData.createdAt}
            updatedAt={boardData.updatedAt}
            likeCount={boardData.likeCount}
            content={boardData.content}
            image={boardData.image}
            isLiked={boardData.isLiked}
          />

          <div className="flex justify-center">
            <Button href="/boards" variant="secondary" className="w-[140px]">
              목록으로
            </Button>
          </div>

          <div>
            <div className="mb-[42px] tamo:mb-6">
              <div className="mb-[15px] text-18sb mo:mb-2 mo:text-16sb">
                댓글&nbsp;
                <span className="text-green-200">
                  {comments?.list.length ?? 0}
                </span>
              </div>
              <CommentForm
                value={value}
                onChange={handleChange}
                onSubmit={(e) => {
                  handleCommentSubmit(e).catch((error) => {
                    console.error('Failed to submit comment', error);
                  });
                }}
              />
            </div>

            {/* 댓글 목록 조건부 렌더링 */}
            {comments && comments.list.length > 0 ? (
              <ul className="flex flex-col gap-6 mo:gap-[14px] ta:gap-4">
                {comments.list.map((item, index) => (
                  <li
                    key={item.id}
                    ref={
                      comments.list.length === index + 1
                        ? lastCommentElementRef
                        : null
                    }
                  >
                    <Comment
                      id={item.id}
                      profile={item.writer.image}
                      writer={item.writer}
                      name={item.writer.name}
                      content={item.content}
                      createdAt={item.createdAt}
                      updatedAt={item.updatedAt}
                      onclick={{
                        update: (newContent: string) =>
                          handleUpdate(item.id, newContent),
                        delete: () => handleDelete(item.id),
                      }}
                      isOwner={item.writer.id === userId}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">작성된 댓글이 없습니다.</div>
            )}

            {isLoading && <p>로딩 중...</p>}
          </div>
        </div>
      </main>
    </>
  );
}
