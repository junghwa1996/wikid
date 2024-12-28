import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import LinkBar from '@/components/LinkBar';

import { ProfileProps } from '@/pages/wikilist/index';
import { WIKI_LINK } from '../../constants/terms';

interface ListItemProps {
  data: ProfileProps;
  onSnackBarClick: (name: string) => void;
}

// 상세 텍스트 최대 글자수
const MAX_TEXT_LENGTH = 10;

// 텍스트 길이 제한 함수
const limitText = (text: string, limit: number = MAX_TEXT_LENGTH): string => {
  if (text.length > limit) {
    return text.slice(0, limit) + '...';
  }
  return text;
};

/**
 * 위키 목록 페이지 리스트 아이템 컴포넌트
 * @param data - 목록에 출력할 프로필 데이터
 * @param onSnackBarClick - 스낵바 클릭 함수
 */
export default function ListItem({ data, onSnackBarClick }: ListItemProps) {
  const { name, code, image, city, nationality, job } = data;
  const shortUrl = `${WIKI_LINK}${code}...`;
  const baseProfileImage = '/icon/icon-profile.svg';

  // 링크바 클릭 핸들러 함수
  const handleLinkClick = async () => {
    await navigator.clipboard.writeText(`${WIKI_LINK}${code}`);
    onSnackBarClick(name);
  };

  // 이미지 로딩 실패 시 대체 이미지 처리 함수
  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    target.srcset = '';
    target.src = baseProfileImage;
  };

  return (
    <li className="relative rounded-custom shadow-custom transition-all hover:scale-[1.02] hover:bg-gray-100 hover:shadow-xl dark:shadow-custom-dark">
      <Link
        href={`/wiki/${code}`}
        className="flex gap-8 rounded-full px-9 py-6 mo:gap-5 mo:px-6 mo:py-5"
      >
        <figure className="size-[85px] self-start overflow-hidden rounded-full mo:size-[60px]">
          <Image
            src={image || baseProfileImage}
            className="size-full object-cover"
            width={85}
            height={85}
            alt={`${name} 프로필 이미지`}
            onError={handleError}
          />
        </figure>

        <div className="mr-auto mo:mb-10">
          <h2 className="mb-[14px] text-24sb mo:mb-[10px] mo:text-20sb">
            {name}
          </h2>
          <p className="text-14 text-gray-400 mo:text-12">
            {limitText(city)}
            {city && nationality && ', '}
            {limitText(nationality)}
            <br />
            {limitText(job)}
          </p>
        </div>
      </Link>

      <LinkBar
        link={shortUrl}
        onClick={handleLinkClick}
        classNames="absolute bottom-6 right-9 ml-auto mt-[14px] self-end mo:bottom-5 mo:left-[104px] mo:right-6 w-80 mo:w-auto"
      />
    </li>
  );
}
