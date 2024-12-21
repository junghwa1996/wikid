import { useEffect, useState } from 'react';

import Button from '@/components/Button';

import BoardDetailCard from './components/BoardDetailCard';
import Comment from './components/Comment';
import CommentForm from './components/CommentForm';

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

const commentsData = {
  nextCursor: 0,
  list: [
    {
      writer: {
        image: 'string',
        name: 'string',
        id: 1,
      },
      updatedAt: '2024-12-20T07:15:16.862Z',
      createdAt: '2024-12-20T07:15:16.862Z',
      content: 'string',
      id: 1,
    },
    {
      writer: {
        image: 'string',
        name: 'string',
        id: 2,
      },
      updatedAt: '2024-12-20T07:15:16.862Z',
      createdAt: '2024-12-20T07:15:16.862Z',
      content: 'string',
      id: 2,
    },
    {
      writer: {
        image: 'string',
        name: 'string',
        id: 3,
      },
      updatedAt: '2024-12-20T07:15:16.862Z',
      createdAt: '2024-12-20T07:15:16.862Z',
      content: 'string',
      id: 3,
    },
  ],
};

export default function BoardsDetails() {
  const [value, setValue] = useState('');
  const [comments, setComments] = useState<typeof commentsData.list>([]);
  const [update, setUpdate] = useState(false);
  const userId = 1; // TODO: 실제 로그인한 사용자의 ID로 대체

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleUpdate = (id: number, newContent: string) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, content: newContent } : comment
    );
    setComments(updatedComments);
    setUpdate(true);
  };

  const handleDelete = (id: number): void => {
    const filteredComments = comments.filter((comment) => comment.id !== id);
    setComments(filteredComments);
  };

  useEffect(() => {
    // TODO: 실제 API 요청으로 대체
    const fetchComments = async () => {
      // 더미 API 요청
      const response = await new Promise<{
        nextCursor: number;
        list: typeof commentsData.list;
      }>((resolve) => {
        setTimeout(() => resolve(commentsData), 1000);
      });
      setComments(response.list);
    };

    fetchComments();
  }, []);

  useEffect(() => {
    if (update) {
      // TODO: 실제 API 요청으로 대체
      setComments(comments);
      setUpdate(false);
    }
  }, [update, comments]);

  return (
    <main className="mt-20 py-[50px] mo:py-5 ta:py-10 tamo:mt-[60px]">
      <div className="container flex flex-col gap-[60px] ta:px-[60px] pc:max-w-[1095px] tamo:gap-10">
        {/* 게시글 상세 본문 */}
        <BoardDetailCard
          // TODO - api 작업 시 수정
          isOwner={data.writer.id === 1}
          title={data.title}
          name={data.writer.name}
          updatedAt={data.updatedAt}
          likeCount={data.likeCount}
          content={data.content}
        />

        {/* 목록으로 이동 버튼 */}
        <div className="flex justify-center">
          <Button href="/boards" variant="secondary" className="w-[140px]">
            목록으로
          </Button>
        </div>

        {/* 댓글 목록 */}
        <div>
          {/* 댓글 from */}
          <div className="mb-[42px] tamo:mb-6">
            <div className="mb-[15px] text-18sb mo:mb-2 mo:text-16sb">
              댓글&nbsp;
              <span className="text-green-200">{commentsData.list.length}</span>
            </div>
            <CommentForm value={value} onChange={handleChange} />
          </div>

          {/* 댓글 리스트 */}
          <ul className="flex flex-col gap-6 mo:gap-[14px] ta:gap-4">
            {comments.map((item) => (
              <li key={item.id}>
                <Comment
                  name={item.writer.name}
                  content={item.content}
                  date={item.updatedAt}
                  onclick={{
                    update: () => handleUpdate(item.id, 'Updated content'),
                    delete: () => handleDelete(item.id),
                  }}
                  isOwner={item.writer.id === userId}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
