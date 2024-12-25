import {
  ArticleData,
  BoardCreateData,
  BoardResponse,
  CommentsData,
} from 'types/board';

import instance from '../../lib/axios-client';

// 게시글 리스트 불러오기
export const getBoards = async (query: any) => {
  const queryString = new URLSearchParams(query).toString();
  try {
    const res = await instance.get(`/articles?${queryString}`);
    return res.data as BoardResponse;
  } catch {
    throw new Error('게시글을 불러오지 못했습니다.');
  }
};

// 게시글 상세 내용 불러오기
export const getBoardDetail = async (
  articleId: string | string[]
): Promise<ArticleData> => {
  try {
    const res = await instance.get(`/articles/${articleId}`);
    return res.data as ArticleData;
  } catch {
    throw new Error('게시글 데이터를 가져오는 중 문제가 발생했습니다.');
  }
};

// 게시글 댓글 리스트 불러오기

export const getComments = async (
  articleId: number,
  limit: number
): Promise<CommentsData> => {
  try {
    const res = await instance.get(
      `/articles/${articleId}/comments?limit=${limit}`
    );
    return res.data as CommentsData;
  } catch {
    throw new Error('댓글 데이터를 가져오는 중 문제가 발생했습니다.');
  }
};

export const patchBoard = async (
  articleId: number | string,
  data: BoardCreateData
) => {
  try {
    await instance.patch(`/articles/${articleId}`, data);
  } catch {
    throw new Error('게시글을 수정하지 못했습니다.');
  }
};
