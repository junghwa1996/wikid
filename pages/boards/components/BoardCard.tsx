import Image from 'next/image';
import Link from 'next/link';

import Heart from '@/components/Heart/Heart';
import dateConversion from '@/utils/dateConversion';

interface BoardCardProps {
  id: number;
  image: string;
  title: string;
  name: string;
  updatedAt: string;
  likeCount: number;
}

export default function BoardCard({
  id,
  image,
  title = '게시글 제목',
  name = '유저 이름',
  updatedAt = '2021-01-01T00:00:00.000Z',
  likeCount = 0,
}: BoardCardProps) {
  return (
    <Link
      href={`/boards/${id}`}
      className="block h-auto w-[250px] overflow-hidden rounded-custom shadow-custom dark:shadow-custom-dark ta:w-[302px]"
    >
      <div className="relative h-[130px] w-auto overflow-hidden bg-gray-100">
        <Image
          src={image === '' ? '/icon/icon-no-image.svg' : image}
          alt="베스트 게시글 이미지"
          fill
        />
      </div>
      <div className="bg-background px-[20px] pb-[14px] pt-[20px] mo:pt-[11px]">
        <h3 className="mb-[6px] text-18sb mo:mb-0 mo:text-16sb">{title}</h3>
        <div className="flex items-center gap-2 text-14 text-gray-300 mo:text-12">
          <p>{name}</p>
          <span className="flex-1">{dateConversion(updatedAt)}</span>
          <Heart initialCount={likeCount} />
        </div>
      </div>
    </Link>
  );
}
