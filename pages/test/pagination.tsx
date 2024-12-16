import { useEffect, useState } from 'react';

import Pagination from '@/components/Pagination/Pagination';

interface Post {
  writer: {
    name: string;
    id: number;
  };
  title: string;
  id: number;
}

/**
 * 테스트를 위한 더미 데이터 생성
 */
const dummyData: Post[] = Array.from({ length: 100 }, (_, i) => ({
  writer: {
    name: `작성자 ${i + 1}`,
    id: i + 1,
  },
  title: `게시글 제목 ${i + 1}`,
  id: i + 1,
}));

export default function PaginationTest() {
  const [data, setData] = useState<Post[]>([]); // 게시글 데이터
  const [totalCount, setTotalCount] = useState(0); // 전체 페이지 카운트
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const pageSize = 10; // 페이지 당 데이터 개수

  // 실제 서버 요청 대신 더미 데이터 사용
  useEffect(() => {
    const fetchData = async () => {
      // 페이지를 넘겼을때 시작 데이터 위치 계산
      const startIndex = (currentPage - 1) * pageSize;
      // 페이지를 넘겼을때 마지막 데이터 위치 계산
      const endIndex = startIndex + pageSize;
      // pageSize만큼 잘라서 데이터 노출
      const currentData = dummyData.slice(startIndex, endIndex);
      setData(currentData);
      setTotalCount(dummyData.length);
    };

    fetchData();
  }, [currentPage]);

  return (
    <>
      {/* 더미 게시글 UI */}
      <ul>
        {data.map((item) => (
          <li key={item.id} className="flex justify-between border-b px-4 py-2">
            <h3>{item.title}</h3>
            <p>{item.writer.name}</p>
          </li>
        ))}
      </ul>

      {/* Pagination 컴포넌트 사용 부분 */}
      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
