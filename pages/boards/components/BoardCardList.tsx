import { BoardListResponse } from 'types/board';

import BoardCard from './BoardCard';

export default function BoardCardList({ data = [] }: BoardListResponse) {
  return (
    <ul className="grid grid-cols-4 content-between gap-4 ta:grid-cols-2 ta:flex-wrap ta:gap-5">
      {data.map((item) => (
        <li key={item.id}>
          <BoardCard
            id={item.id}
            image={item.image}
            updatedAt={item.updatedAt}
            title={item.title}
            name={item.writer.name}
            likeCount={item.likeCount}
          />
        </li>
      ))}
    </ul>
  );
}
