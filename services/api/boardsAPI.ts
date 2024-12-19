import instance from '../../lib/axios-client';

/**
 * 게시글 목록을 불러오는 API
 */
export default async function getBoards() {
  try {
    const response = await instance.get('/articles');
    return response.data;
  } catch (error) {
    console.error('게시글을 불러오지 못했습니다.', error);
  }
}
