import Link from 'next/link';
import { BoardBase, Writer } from 'types/board';

import Heart from '@/components/Heart/Heart';
import useCheckMobile from '@/hooks/useCheckMobile';
import dateConversion from '@/utils/dateConversion';

interface BoardItem extends BoardBase {
  name: Writer['name'];
  className?: string;
}

/**
 * 게시글 리스트 아이템
 * @param {number} id - 게시글 아이디
 * @param {string} props.title - 게시글 제목
 * @param {string} props.name - 작성자 이름
 * @param {number} props.likeCount - 좋아요 수
 * @param {string} props.createdAt - 등록한 날짜
 * @param {string} props.className - 커스텀 클래스
 * @example <BoardItem id={1} title="게시글 제목" name="작성자" likeCount={10} createdAt="2024-12-17T08:25:07.098Z" />
 */
export default function BoardItem({
  id,
  title = '',
  name = '',
  likeCount = 0,
  createdAt = '',
  className,
}: BoardItem) {
  const isMobile = useCheckMobile();

  const textColors = 'mo:text-gray-400';

  return (
    <Link
      href={`/boards/${id}`}
      className={`border-b ${className} mo:flex-wrap`}
    >
      <p className="mo:hidden">{id}</p>
      <p className="w-full truncate mo:mb-[3px]">{title}</p>
      <p className={`mo:order-2 mo:mr-[16px] ${textColors}`}>{name}</p>
      {isMobile ? (
        <Heart
          initialCount={likeCount}
          textSize="mo:text-16"
          iconSize="mo:w-[18px] mo:h-[18px]"
          className="mo:order-4"
        />
      ) : (
        <p className="mo:hidden">{likeCount}</p>
      )}
      <p className={`mo:order-3 mo:flex-1 ${textColors}`}>
        {dateConversion(createdAt)}
      </p>
    </Link>
  );
}
