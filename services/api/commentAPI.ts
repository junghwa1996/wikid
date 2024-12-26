import instance from '@/lib/axios-client';
import { CommentsData } from 'types/board';

// 댓글 페칭 함수
export const fetchComments = async (
  articleId: string | string[] | undefined,
  cursor: string | null
): Promise<CommentsData> => {
  const response = await instance.get(
    `/articles/${articleId}/comments?limit=100${cursor ? `&cursor=${cursor}` : ''}`
  );
  return response.data;
};

// 댓글 추가 함수
export const addComment = async (articleId: string, content: string) => {
  const response = await instance.post(`/articles/${articleId}/comments`, {
    content,
  });
  return response.data;
};

// 댓글 수정 함수
export const updateComment = async (id: number, newContent: string) => {
  const response = await instance.patch(`/comments/${id}`, {
    content: newContent,
  });
  return response.data;
};

// 댓글 삭제 함수
export const deleteComment = async (id: number) => {
  const response = await instance.delete(`/comments/${id}`);
  return response.data;
};
