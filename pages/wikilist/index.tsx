import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import LinkBar from '@/components/LinkBar';
import Pagination from '@/components/Pagination/Pagination';
import SearchInput from '@/components/SearchInput';

const dummyData = {
  totalCount: 78,
  list: [
    {
      id: 1,
      name: '홍길동',
      nationality: '대한민국',
      city: '서울',
      job: '대학생',
      code: 'gildong',
      image: '',
    },
    {
      id: 2,
      name: '김철수',
      nationality: '대한민국',
      city: '부산',
      job: '직장인',
      code: 'chulsoo',
      image: '',
    },
    {
      id: 3,
      name: '이영희',
      nationality: '대한민국',
      city: '대구',
      job: '학생',
      code: 'yeonghee',
      image: '',
    },
    {
      id: 4,
      name: '박민수',
      nationality: '대한민국',
      city: '인천',
      job: '대학생',
      code: 'minsu',
      image: '',
    },
    {
      id: 5,
      name: '정미영',
      nationality: '대한민국',
      city: '대전',
      job: '직장인',
      code: 'miyoung',
      image: '',
    },
  ],
};

const PAGE_SIZE = 5;

interface ProfileProps {
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

const ListItem = ({ data }: ProfileProps) => {
  const { name, code, image, city, nationality, job } = data;

  const handleLinkClick = () => {
    console.log('handleLinkClick:');
  };

  return (
    <li className="relative rounded-custom shadow-custom transition-all hover:bg-gray-100 hover:shadow-xl dark:shadow-custom-dark">
      <Link
        href={`/wiki/${code}`}
        className="flex gap-8 rounded-full px-9 py-6"
      >
        <Image
          src={image || '/icon/icon-profile.svg'}
          width="85"
          height="85"
          alt={`${name} 프로필 이미지`}
        />
        <div className="mr-auto">
          <h2 className="mb-[14px] text-24sb">{name}</h2>
          <p className="text-14 text-gray-400">
            {city}, {nationality}
            <br />
            {job}
          </p>
        </div>
      </Link>

      <div className="absolute bottom-6 right-9">
        <LinkBar
          link={`https://www.wikied.kr/${code}`}
          onClick={handleLinkClick}
        />
      </div>
    </li>
  );
};

export default function WikiList() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);

  const handleChange = (value: string) => {
    setSearchValue(value);
  };
  const handleSubmit = () => {
    console.log('handleSubmit:', searchValue);
  };
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="min-h-svh">
      <Head>
        {/* TODO - 검색 했을 때 타이틀 수정 */}
        <title>위키 목록 | wikied</title>
      </Head>

      <div className="container pt-20">
        <div className="mt-20 px-20">
          <SearchInput
            size="large"
            value={searchValue}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          <ul className="my-[57px] flex flex-col gap-6">
            {dummyData.list.map((data) => (
              <ListItem key={data.id} data={data} />
            ))}
          </ul>

          <div className="my-[120px] flex justify-center">
            <Pagination
              totalCount={dummyData.totalCount}
              currentPage={page}
              pageSize={PAGE_SIZE}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
