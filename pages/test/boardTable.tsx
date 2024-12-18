import BoardList from '../boards/components/BoardList';

const data = [
  {
    updatedAt: '2024-12-17T08:25:07.098Z',
    likeCount: 123,
    writer: {
      name: '이름',
      id: 1,
    },
    title: '게시글 제목입니다.',
    id: 1,
  },
  {
    updatedAt: '2024-12-17T08:25:07.098Z',
    likeCount: 10,
    writer: {
      name: '이름',
      id: 2,
    },
    title: '게시글 제목입니다.',
    id: 2,
  },
];

export default function BoardTableTest() {
  return <BoardList data={data} />;
}
