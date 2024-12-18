import BoardItem from './BoardItem';

/**
 * 게시글 리스트
 * @param {any[]} data - 게시글 데이터
 * @example <BoardList data={data} />
 */
export default function BoardList({ data }: { data: any[] }) {
  const tableStyles =
    'grid grid-cols-[50px_2fr_100px_100px_150px] py-[11px] mo:py-[14px] border-b items-center text-16 pc:px-[50px] ta:px-[20px]';

  return (
    <div className="w-full text-center mo:text-left">
      <div className={`${tableStyles} border-t text-gray-400 mo:hidden`}>
        <p>번호</p>
        <p>제목</p>
        <p>작성자</p>
        <p>좋아요</p>
        <p>날짜</p>
      </div>
      {data.map((item) => (
        <BoardItem
          key={item.id}
          id={item.id}
          title={item.title}
          name={item.writer.name}
          likeCount={item.likeCount}
          updatedAt={item.updatedAt}
          className={`${tableStyles} mo:flex`}
        />
      ))}
    </div>
  );
}
