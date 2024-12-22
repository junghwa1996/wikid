import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Heart from '@/components/Heart/Heart';
import useCheckMobile from '@/hooks/useCheckMobile';
import dateConversion from '@/utils/dateConversion';

import ButtonIcon from './ButtonIcon';

interface BoardDetailCardProps {
  title: string;
  name: string;
  updatedAt: string;
  likeCount: number;
  content: string;
  isOwner: boolean;
}

/**
 * 게시글 상세보기 카드 컴포넌트
 * @param {string} title - 제목
 * @param {string} props.name - 작성자 이름
 *  @param {string} props.updatedAt - 작성일
 * @param {number} props.likeCount - 좋아요 수
 * @param {string} props.content - 내용
 */
export default function BoardDetailCard({
  title,
  name,
  updatedAt,
  likeCount,
  content,
  isOwner,
}: BoardDetailCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const isMobile = useCheckMobile();
  const router = useRouter();
  const { articleId } = router.query;

  useEffect(() => {
    // TODO: 좋아요 여부 API 연동
    console.log(`좋아요 여부 : ${isLiked}`);
  }, [isLiked]);

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
  };

  const handleUpdateClick = () => {
    router.push(`/updateboard/${articleId}`);
  };

  return (
    <div className="rounded-custom bg-background px-[30px] py-10 shadow-custom dark:shadow-custom-dark mo:p-5">
      <header className="mb-[38px] mo:mb-[15px] mo:pb-[11px] ta:mb-[30px] ta:pb-2 tamo:border-b">
        <div className="mb-[30px] flex items-center justify-between gap-[14px] mo:mb-[14px] tamo:gap-3">
          <h1 className="flex-1 text-32sb mo:text-24sb">{title}</h1>
          {isOwner &&
            (!isMobile ? (
              <>
                <Button onClick={handleUpdateClick}>수정하기</Button>
                {/* TODO - api 연동 시 수정 */}
                <Button onClick={() => console.log('삭제요청api')}>
                  삭제하기
                </Button>
              </>
            ) : (
              <>
                {/* TODO - api 연동 시 수정 */}
                <ButtonIcon
                  onClick={() => console.log('수정하기')}
                  type="write"
                />
                {/* TODO - api 연동 시 수정 */}
                <ButtonIcon
                  onClick={() => console.log('삭제하기')}
                  type="delete"
                />
              </>
            ))}
        </div>
        <div className="flex items-center gap-[10px] text-14 text-gray-400 mo:text-12">
          <span>{name}</span>
          <span className="flex-1">{dateConversion(updatedAt)}</span>
          <Heart initialCount={likeCount} onClick={handleLikeClick} />
        </div>
      </header>

      <div>{content}</div>
    </div>
  );
}
