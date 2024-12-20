import { useState } from 'react';
import Head from 'next/head';

import Pagination from '@/components/Pagination/Pagination';
import SearchInput from '@/components/SearchInput';
import ListItem from './ListItem';
import Image from 'next/image';

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

export default function WikiList() {
  const [searchValue, setSearchValue] = useState('');
  const [submitValue, setSubmitValue] = useState('');
  const [page, setPage] = useState(1);
  const hasList = dummyData.list.length > 0;

  const handleChange = (value: string) => {
    setSearchValue(value);
  };
  const handleSubmit = () => {
    setSubmitValue(searchValue);
  };
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="min-h-svh">
      <Head>
        <title>
          위키 목록{submitValue && ` - 검색어 '${submitValue}'`} | wikied
        </title>
      </Head>

      <div className="container pt-20 mo:pt-10">
        <div className="mt-20 px-20 mo:px-0">
          <SearchInput
            size="large"
            value={searchValue}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          {submitValue && (
            <p className="mt-4 text-16 text-gray-400">
              {`“${submitValue}”님을 총 `}
              <span className="text-green-200">{dummyData.list.length}</span>명
              찾았습니다.
            </p>
          )}

          <ul className="my-[57px] flex flex-col gap-6 mo:my-10">
            {hasList ? (
              dummyData.list.map((data) => (
                <ListItem key={data.id} data={data} />
              ))
            ) : (
              <li className="flex flex-col items-center justify-center gap-8">
                <p className="text-20sb text-gray-400">
                  {submitValue === ''
                    ? '위키 목록이 없어요.'
                    : `${submitValue}와(과) 일치하는 검색 결과가 없어요.`}
                </p>
                <Image
                  src="/images/empty.png"
                  alt=""
                  width="144"
                  height="144"
                />
              </li>
            )}
          </ul>

          {hasList && (
            <div className="my-[120px] flex justify-center mo:my-10">
              <Pagination
                totalCount={dummyData.totalCount}
                currentPage={page}
                pageSize={PAGE_SIZE}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
