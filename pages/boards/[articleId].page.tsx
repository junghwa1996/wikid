import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArticleData, CommentsData } from 'types/board';

import Button from '@/components/Button';
import instance from '@/lib/axios-client';
import { getBoardDetail } from '@/services/api/boardsAPI';
import { getUserInfo } from '@/services/api/userInfoAPI';

import BoardDetailCard from './components/BoardDetailCard';
import Comment from './components/Comment';
import CommentForm from './components/CommentForm';

export default function BoardsDetails() {
  const [data, setData] = useState<ArticleData | null>(null);
  const [value, setValue] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();
  const { articleId } = router.query as { articleId?: string };
  const LIMIT = 10;

  useEffect(() => {
    if (
      !Array.isArray(articleId) &&
      articleId !== undefined &&
      articleId !== null &&
      articleId !== ''
    ) {
      // 게시글 상세 내용 로드
      const fetchBoardsDetail = async () => {
        const data = await getBoardDetail(articleId);
        setData(data);
      };

      // 유저 정보 로드
      const fetchUserInfo = async () => {
        const res = await getUserInfo();
        if (res?.id) {
          setUserId(
            res?.id !== undefined && res?.id !== null ? Number(res.id) : null
          );
        }
      };

      if (articleId) {
        fetchBoardsDetail().catch((error) => {
          console.error('게시물 상세 데이터를 불러오는데 실패 했습니다', error);
        });
        fetchUserInfo().catch((error) => {
          console.error('유저 정보를 불러오는데 실패 했습니다', error);
        });
      }
    }
  }, [articleId]);

  // Intersection Observer 설정
  const { ref, inView } = useInView({
    threshold: 1.0,
    rootMargin: '100px',
  });

  // 댓글 데이터 가져오기
  const getComments = async ({
    queryKey,
    pageParam = 0, // 기본 값 설정
  }: QueryFunctionContext<[string, string, number]>): Promise<CommentsData> => {
    const [_key, articleId, LIMIT] = queryKey;
    try {
      const cursorParam =
        pageParam !== undefined && pageParam !== null
          ? `&cursor=${encodeURIComponent(pageParam as string)}`
          : '';
      const res = await instance.get(
        `/articles/${String(articleId)}/comments?limit=${LIMIT}${cursorParam}`
      );
      return res.data as CommentsData;
    } catch (error) {
      console.error('게시글 댓글을 불러오지 못했습니다.', error);
      throw new Error('댓글 데이터를 가져오는 중 문제가 발생했습니다.');
    }
  };

  // 댓글 데이터 무한 스크롤 로직 (React Query)
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['comments', articleId, LIMIT],
    // @ts-expect-error: queryFn 타입 미스매치로 인한 에러 무시
    queryFn: getComments,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor === null ? undefined : lastPage.nextCursor;
    },
    enabled: articleId !== undefined && articleId !== null && articleId !== '',
  });

  // Intersection Observer를 통해 fetchNextPage 호출
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch((error) => {
        console.error('Failed to fetch next page', error);
      });
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 댓글 입력창 value 변경
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // 댓글 등록
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await instance.post(`/articles/${articleId as string}/comments`, {
        content: value,
      });
      setValue('');
      await instance.get(
        `/articles/${articleId as string}/comments?limit=${LIMIT}`
      );
      await refetch();
    } catch (error) {
      console.error('댓글을 등록하지 못했습니다.', error);
    }
  };

  // 댓글 수정
  const handleUpdate = async (id: number, newContent: string) => {
    try {
      await instance.patch(`/comments/${id}`, { content: newContent });
      await instance.get(
        `/articles/${articleId as string}/comments?limit=${LIMIT}`
      );
      await refetch();
    } catch (error) {
      console.error('댓글을 수정하지 못했습니다.', error);
    }
  };

  // 댓글 삭제
  const handleDelete = async (id: number) => {
    try {
      await instance.delete(`/comments/${id}`);
      await instance.get(
        `/articles/${articleId as string}/comments?limit=${LIMIT}`
      );
      await refetch();
    } catch (error) {
      console.error('댓글을 삭제하지 못했습니다.', error);
    }
  };

  return (
    <>
      <Head>
        <title>{data?.title} - 자유게시판 | wikied</title>
      </Head>
      <main className="mt-20 py-[50px] mo:py-5 ta:py-10 tamo:mt-[60px]">
        <div className="container flex flex-col gap-[60px] ta:px-[60px] pc:max-w-[1095px] tamo:gap-10">
          {/* 게시글 상세 본문 */}
          {data && (
            <BoardDetailCard
              id={data?.id}
              isOwner={data?.writer?.id === userId}
              title={data?.title}
              name={data?.writer?.name}
              createdAt={data?.createdAt}
              updatedAt={data?.updatedAt}
              likeCount={data?.likeCount}
              content={data?.content}
              image={data?.image}
              isLiked={data?.isLiked}
            />
          )}

          {/* 목록으로 이동 버튼 */}
          <div className="flex justify-center">
            <Button href="/boards" variant="secondary" className="w-[140px]">
              목록으로
            </Button>
          </div>

          {/* 댓글 목록 */}
          <div>
            {/* 댓글 form */}
            <div className="mb-[42px] tamo:mb-6">
              <div className="mb-[15px] text-18sb mo:mb-2 mo:text-16sb">
                댓글&nbsp;
                <span className="text-green-200">
                  {comments?.pages
                    ?.map((page) => page.list.length)
                    .reduce((sum, count) => sum + count, 0) || 0}
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

            {/* 댓글 리스트 */}
            <ul className="flex flex-col gap-6 mo:gap-[14px] ta:gap-4">
              {comments?.pages.map((page) =>
                page.list.map((item) => (
                  <li key={item.id}>
                    <Comment
                      id={item.id}
                      writer={item.writer}
                      name={item.writer.name}
                      content={item.content}
                      updatedAt={item.updatedAt ?? ''}
                      onclick={{
                        update: (newContent: string) =>
                          handleUpdate(item.id, newContent),
                        delete: () => handleDelete(item.id),
                      }}
                      isOwner={item.writer.id === userId}
                    />
                  </li>
                ))
              )}
            </ul>

            {/* 무한 스크롤 로딩 감지용 div */}
            <div ref={ref} className="h-10" />
            {isFetchingNextPage && <p>로딩 중...</p>}
          </div>
        </div>
      </main>
    </>
  );
}
