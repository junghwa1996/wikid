import BoardCard from '../boards/components/BoardCard';

const data = {
  updatedAt: '2024-12-17T08:25:07.098Z',
  createdAt: '2024-12-17T08:25:07.098Z',
  likeCount: 0,
  writer: {
    name: '이름',
    id: 1,
  },
  image: 'https://via.placeholder.com/1000',
  title: '게시글 제목입니다.',
  id: 1,
};

export default function BoardCardTest() {
  return (
    <BoardCard
      id={data.id}
      title={data.title}
      image={data.image}
      name={data.writer.name}
      updatedAt={data.updatedAt}
      likeCount={data.likeCount}
    />
  );
}
