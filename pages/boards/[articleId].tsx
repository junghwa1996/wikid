import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ArticleData } from 'types/board';

import Button from '@/components/Button';
import { getBoardDetail } from '@/services/api/boardsAPI';
import { getUserInfo } from '@/services/api/userInfoAPI';

import { useProfileContext } from '@/hooks/useProfileContext';
import BoardDetailCard from '@/components/boards.page/BoardDetailCard';
import CommentForm from '@/components/boards.page/CommentForm';
import Comment from '@/components/boards.page/Comment';

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  QueryFunctionContext,
} from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import {
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
} from '@/services/api/commentAPI';
import { CommentsData, CommentType } from 'types/board';
import SnackBar, { SnackBarProps } from '@/components/SnackBar';

export default function BoardsDetails() {
  const [boardData, setBoardData] = useState<ArticleData | null>(null);
  const [value, setValue] = useState('');
  const [userId, setUserId] = useState<number | string | null>(null);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackStyled, setSnackStyled] =
    useState<SnackBarProps['severity']>(undefined);

  const router = useRouter();
  const { articleId } = router.query;
  const { isAuthenticated } = useProfileContext();
  const queryClient = useQueryClient();

  // 유저 정보 페칭
  useEffect(() => {
    const fetchUserInfoData = async () => {
      try {
        const res = await getUserInfo(isAuthenticated);
        if (res) {
          setUserId(res.id);
        }
      } catch (error) {
        console.log('유저 정보를 불러오지 못했습니다.', error);
      }
    };

    fetchUserInfoData();
  }, [isAuthenticated]);

  // 게시글 상세 정보 페칭
  useEffect(() => {
    const fetchBoardDetail = async () => {
      if (!articleId || typeof articleId !== 'string') return;

      try {
        const res = await getBoardDetail(articleId);
        setBoardData(res);
      } catch (error) {
        console.error('게시글 데이터를 불러오지 못했습니다.', error);
      }
    };

    fetchBoardDetail();
  }, [articleId]);

  // useInfiniteQuery를 사용한 댓글 페칭
  const {
    data,
    error: commentsError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<CommentsData, Error>({
    queryKey: ['comments', articleId],
    queryFn: async (context: QueryFunctionContext) => {
      const pageParam = context.pageParam as string | null;
      if (typeof articleId !== 'string') {
        throw new Error('id가 올바르지 않습니다.');
      }
      return fetchComments(articleId, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!articleId && typeof articleId === 'string',
    staleTime: 5 * 60 * 1000, // 5분
    initialPageParam: null,
  });

  const comments = data?.pages.flatMap((page) => page.list) ?? [];

  // 무한 스크롤 트리거 설정
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 뮤테이션 설정 (댓글 추가, 수정, 삭제)
  const addCommentMutation = useMutation({
    mutationFn: (content: string) => addComment(articleId as string, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', articleId],
      });
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({ id, newContent }: { id: number; newContent: string }) =>
      updateComment(id, newContent),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', articleId],
      });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', articleId],
      });
    },
  });

  // 댓글 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // 댓글 제출 핸들러
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || !articleId || typeof articleId !== 'string') return;

    try {
      if (isAuthenticated) {
        await addCommentMutation.mutateAsync(value);
        setValue('');
      } else {
        setSnackBarMessage('로그인이 필요한 서비스입니다.');
        setSnackStyled('fail');
        setSnackBarOpen(true);
      }
    } catch (error) {
      console.error('댓글을 등록하지 못했습니다.', error);
    }
  };

  // 댓글 수정 핸들러
  const handleUpdate = async (id: number, newContent: string) => {
    try {
      await updateCommentMutation.mutateAsync({ id, newContent });
    } catch (error) {
      console.error('댓글을 수정하지 못했습니다.', error);
    }
  };

  // 댓글 삭제 핸들러
  const handleDelete = async (id: number) => {
    try {
      await deleteCommentMutation.mutateAsync(id);
    } catch (error) {
      console.error('댓글을 삭제하지 못했습니다.', error);
    }
  };

  // 게시글 데이터 로딩 상태
  if (!boardData) {
    return <div>게시글을 불러오는 중입니다...</div>;
  }

  // 댓글 페칭 에러 처리
  if (commentsError) {
    return (
      <div>댓글을 불러오지 못했습니다: {(commentsError as Error).message}</div>
    );
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
                <span className="text-green-200">{comments.length}</span>
              </div>
              <CommentForm
                value={value}
                onChange={handleChange}
                onSubmit={handleCommentSubmit}
              />
            </div>

            {/* 댓글 목록 조건부 렌더링 */}
            {comments.length > 0 ? (
              <ul className="flex flex-col gap-6 mo:gap-[14px] ta:gap-4">
                {comments.map((item: CommentType) => (
                  <li key={item.id}>
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

            {/* 무한 스크롤 로더 */}
            <div ref={ref} className="h-10">
              {isFetchingNextPage && <p>로딩 중...</p>}
            </div>

            {/* 일반 로딩 표시기 */}
            {isFetching && !isFetchingNextPage && <p>로딩 중...</p>}
          </div>
        </div>
        <SnackBar
          severity={snackStyled}
          open={snackBarOpen}
          onClose={() => setSnackBarOpen(false)}
          autoHideDuration={2000}
        >
          {snackBarMessage}
        </SnackBar>
      </main>
    </>
  );
}
