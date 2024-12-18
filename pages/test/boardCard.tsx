import BoardCard from '../boards/components/BoardCard';

const data_noImage = {
  updatedAt: '2024-12-17T08:25:07.098Z',
  createdAt: '2024-12-17T08:25:07.098Z',
  likeCount: 0,
  writer: {
    name: '이름',
    id: 1,
  },
  image: '',
  title: '게시글 제목입니다.',
  id: 1,
};

const data_Image = {
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
    <div className="flex gap-4">
      <BoardCard
        id={data_noImage.id}
        title={data_noImage.title}
        image={data_noImage.image}
        name={data_noImage.writer.name}
        updatedAt={data_noImage.updatedAt}
        likeCount={data_noImage.likeCount}
      />
      <BoardCard
        id={data_Image.id}
        title={data_Image.title}
        image={data_Image.image}
        name={data_Image.writer.name}
        updatedAt={data_Image.updatedAt}
        likeCount={data_Image.likeCount}
      />
    </div>
  );
}
