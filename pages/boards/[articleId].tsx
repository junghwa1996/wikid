import Head from 'next/head';

import BoardDetailCard from './components/BoardDetailCard';

{
  /* ANCHOR - 리뷰를 위해서 추가한 코드 */
}
const data = {
  updatedAt: '2024-12-20T05:08:25.226Z',
  createdAt: '2024-12-20T05:08:25.226Z',
  likeCount: 0,
  writer: {
    name: '이름',
    id: 1,
  },
  image: 'string',
  title: '게시글 제목입니다.',
  id: 1,
  isLiked: true,
  content: '게시글 내용입니다.',
};

export default function boardsDetails() {
  return (
    <>
      <Head>
        <title>게시글 제목 - 자유게시판 | wikied</title>
      </Head>
      <main className="mt-20 py-[50px]">
        <div className="container">
          <BoardDetailCard
            // TODO - api 작업 시 수정
            isOwner={data.writer.id === 1}
            title={data.title}
            name={data.writer.name}
            updatedAt={data.updatedAt}
            likeCount={data.likeCount}
            content={data.content}
          />
          {/* ANCHOR - 리뷰를 위해서 추가한 코드 */}
          <BoardDetailCard
            isOwner={data.writer.id === 2}
            title={data.title}
            name={data.writer.name}
            updatedAt={data.updatedAt}
            likeCount={data.likeCount}
            content={data.content}
          />
        </div>
      </main>
    </>
  );
}
