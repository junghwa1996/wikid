import Image from 'next/image';
import Link from 'next/link';

import Heart from '@/components/Heart/Heart';
import dateConversion from '@/utils/dateConversion';

import { BoardBase, Writer } from '../../../types/board';

type BoardCardProps = Omit<BoardBase & Writer, 'content' | 'createdAt'>;

/**
 * 게시글 카드 컴포넌트
 * @param {number} id - 게시글 id
 * @param {string} props.image - 게시글 이미지
 * @param {string} props.title - 게시글 제목
 * @param {string} props.name - 유저 이름
 * @param {string} props.updatedAt - 게시글 수정일
 * @param {number} props.likeCount - 게시글 좋아요 수
 */
export default function BoardCard({
  id,
  image = 'https://ifh.cc/g/V26MYS.png',
  title = '',
  name = '',
  updatedAt = '',
  likeCount = 0,
}: BoardCardProps) {
  return (
    <Link
      href={`/boards/${id}`}
      className="block h-auto w-[250px] overflow-hidden rounded-custom shadow-custom dark:shadow-custom-dark ta:w-full"
    >
      <div className="relative h-[130px] w-auto overflow-hidden bg-gray-100 ta:h-[17.475vw]">
        <Image
          src={image}
          alt={`${title} 썸네일`}
          style={{ objectFit: 'cover' }}
          fill
          priority
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="bg-background px-[20px] pb-[14px] pt-[20px] mo:pt-[11px]">
        <h3 className="mb-[6px] truncate text-18sb mo:mb-0 mo:text-16sb">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-14 text-gray-300 mo:text-12">
          <p>{name}</p>
          <span className="flex-1">
            {updatedAt && dateConversion(updatedAt)}
          </span>
          <Heart initialCount={likeCount} />
        </div>
      </div>
    </Link>
  );
}
