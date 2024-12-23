import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BoardBase, Writer } from 'types/board';

import Button from '@/components/Button';
import EditorViewer from '@/components/EditorViewer';
import Heart from '@/components/Heart/Heart';
import useCheckMobile from '@/hooks/useCheckMobile';
import instance from '@/lib/axios-client';
import dateConversion from '@/utils/dateConversion';

import ButtonIcon from './ButtonIcon';

interface BoardDetailCard extends BoardBase {
  isOwner: boolean;
  isLiked: boolean;
}

/**
 * 게시글 상세보기 카드 컴포넌트
 * @param {string} title - 제목
 * @param {string} props.name - 작성자 이름
 * @param {string} props.createdAt - 작성일
 * @param {string} props.updatedAt - 수정일
 * @param {number} props.likeCount - 좋아요 수
 * @param {string} props.content - 내용
 * @param {string} props.image - 이미지
 * @param {boolean} props.isOwner - 작성자 여부
 *
 */
export default function BoardDetailCard({
  title,
  name = '',
  createdAt = '',
  updatedAt = '',
  likeCount = 0,
  content = '',
  image = 'https://ifh.cc/g/V26MYS.png',
  isOwner = false,
  isLiked: initialIsLiked = false,
}: BoardDetailCard & Writer) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const isMobile = useCheckMobile();
  const router = useRouter();
  const { articleId } = router.query;
  const id = articleId as string;

  // 수정하기 버튼 클릭 시 수정 페이지 이동
  const handleUpdateClick = async () => {
    await router.push(`/updateboard/${id}`);
  };

  // 삭제하기 버튼 클릭 시 게시글 삭제
  const handleDeleteClick = async () => {
    try {
      await instance.delete(`/articles/${id}`);

      await router.push('/boards');
    } catch (error) {
      console.error('게시글을 삭제하지 못했습니다.', error);
    }
  };

  // 하트 클릭 시 동작
  const handleHeartClick = async () => {
    const method = isLiked ? 'delete' : 'post';

    try {
      await instance[method](`/articles/${id}/like`);
      setIsLiked(!isLiked);
      setLikeCountState((prevCount) =>
        isLiked ? prevCount - 1 : prevCount + 1
      );
    } catch (error) {
      console.error('--- handleHeartClick:error:', error);
    }
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
                <Button onClick={handleDeleteClick} variant="danger">
                  삭제하기
                </Button>
              </>
            ) : (
              <>
                <ButtonIcon onClick={handleUpdateClick} type="write" />
                <ButtonIcon onClick={handleDeleteClick} type="delete" />
              </>
            ))}
        </div>
        <div className="flex items-center gap-[10px] text-14 text-gray-400 mo:text-12">
          <span>{name}</span>
          <span>등록일 : {dateConversion(createdAt)}</span>
          <span>|</span>
          <span className="flex-1">
            최근 수정일 : {dateConversion(updatedAt)}
          </span>

          <Heart
            initialCount={likeCountState}
            isLiked={isLiked}
            onClick={handleHeartClick}
          />
        </div>
      </header>

      <div>
        <Image
          src={image}
          alt="게시글 이미지"
          width={500}
          height={300}
          className="mb-5 mo:mb-[15px] mo:max-h-[177px] mo:max-w-[295px]"
        />
        <EditorViewer content={content} />
      </div>
    </div>
  );
}
