import Image from 'next/image';
import Link from 'next/link';

import LinkBar from '@/components/LinkBar';

interface ListItemProps {
  data: {
    id: number;
    name: string;
    code: string;
    image: string;
    city: string;
    nationality: string;
    job: string;
  };
}

/**
 * 위키 목록 페이지 리스트 아이템 컴포넌트
 * @param data - 목록에 출력할 프로필 데이터
 */
export default function ListItem({ data }: ListItemProps) {
  const { name, code, image, city, nationality, job } = data;
  const url = `https://www.wikied.kr/${code}`;

  // 링크바 클릭 핸들러 함수
  const handleLinkClick = () => {
    navigator.clipboard.writeText(url);
    // TODO: 스낵바로 변경
    alert(`${name}님 위키 링크가 복사되었습니다.`);
  };

  return (
    <li className="relative rounded-custom shadow-custom transition-all hover:bg-gray-100 hover:shadow-xl dark:shadow-custom-dark">
      <Link
        href={`/wiki/${code}`}
        className="flex gap-8 rounded-full px-9 py-6 mo:gap-5 mo:px-6 mo:py-5"
      >
        <Image
          src={image || '/icon/icon-profile.svg'}
          className="self-start rounded-full mo:size-[60px]"
          width="85"
          height="85"
          alt={`${name} 프로필 이미지`}
        />
        <div className="mr-auto mo:mb-10">
          <h2 className="mb-[14px] text-24sb mo:mb-[10px] mo:text-20sb">
            {name}
          </h2>
          <p className="text-14 text-gray-400 mo:text-12">
            {city}, {nationality}
            <br />
            {job}
          </p>
        </div>
      </Link>

      <div className="absolute bottom-6 right-9 ml-auto mt-[14px] self-end">
        <LinkBar link={url} onClick={handleLinkClick} />
      </div>
    </li>
  );
}
