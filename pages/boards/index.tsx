import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Board } from 'types/board';

import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import Pagination from '@/components/Pagination/Pagination';
import SearchInput from '@/components/SearchInput';
import useCheckMobile from '@/hooks/useCheckMobile';
import { getBoards } from '@/services/api/boardsAPI';

import BoardCardList from '@/components/boards.page/BoardCardList';
import BoardList from '@/components/boards.page/BoardList';

import 'swiper/css';
import { useProfileContext } from '@/hooks/useProfileContext';
import Router from 'next/router';
import EmptyList from '@/components/EmptyList';
import { useSnackbar } from 'context/SnackBarContext';

const BoardCardList_Swiper = dynamic(
  () => import('@/components/boards.page/BoardCardList.swiper'),
  {
    ssr: false,
  }
);

interface BoardsProps {
  initialBoards: Board[];
  initialLikeBoards: Board[];
  totalCount: number;
}

// SSR 데이터 패칭
export const getServerSideProps: GetServerSideProps = async () => {
  const PAGE_SIZE = 10;

  try {
    const [likeBoardsRes, boardsRes] = await Promise.all([
      getBoards({ orderBy: 'like', pageSize: 4 }),
      getBoards({ orderBy: 'recent', pageSize: PAGE_SIZE, page: 1 }),
    ]);

    const initialLikeBoards = likeBoardsRes.list || [];
    const initialBoards = boardsRes.list || [];
    const totalCount = boardsRes.totalCount || 0;

    return {
      props: {
        initialLikeBoards,
        initialBoards,
        totalCount,
      },
    };
  } catch (error) {
    console.error('SSR 데이터 패칭 중 에러 발생:', error);
    return {
      props: {
        initialLikeBoards: [],
        initialBoards: [],
        totalCount: 0,
      },
    };
  }
};

export default function Boards({
  initialBoards,
  initialLikeBoards,
  totalCount,
}: BoardsProps) {
  const [boards, setBoards] = useState<Board[]>(initialBoards);
  const [likeBoards] = useState<Board[]>(initialLikeBoards);
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('최신순');
  const { showSnackbar } = useSnackbar();

  const isMobile = useCheckMobile();
  const PAGE_SIZE = 10;

  const { isAuthenticated } = useProfileContext();

  // 선택된 옵션에 따라 게시글 다시 가져오기
  useEffect(() => {
    const fetchBoards = async () => {
      const orderBy = selectedOption === '최신순' ? 'recent' : 'like';
      const res = await getBoards({
        orderBy,
        pageSize: PAGE_SIZE,
        page: currentPage,
        keyword: searchValue,
      });
      if (Array.isArray(res.list) && res.list.length > 0) {
        setBoards(res.list);
      } else {
        setBoards([]);
      }
    };

    fetchBoards().catch((error) =>
      console.error('게시글 데이터를 불러오지 못했습니다 :', error)
    );
  }, [selectedOption, currentPage, searchValue]);

  const handleSearchSubmit = async () => {
    setSearchValue(value);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setCurrentPage(1);
  };

  const handleCreateClick = async () => {
    if (isAuthenticated) {
      Router.push('/addboard');
    } else {
      showSnackbar('로그인 후 이용해주세요', 'fail');
      return;
    }
  };

  const emptyListText =
    searchValue === ''
      ? '게시글이 존재하지 않습니다.'
      : `${searchValue}와(과) 일치하는 검색 결과가 없습니다.`;

  const pxTablet = 'ta:px-[60px]';

  return (
    <main className="pt-[80px] tamo:pt-[60px]">
      <div className="flex flex-col gap-[60px] py-[60px] mo:gap-10 mo:py-10">
        <header
          className={`container flex items-center justify-between ${pxTablet}`}
        >
          <h1 className="text-32sb mo:text-24sb">베스트 게시글</h1>
          <Button onClick={handleCreateClick}>게시물 등록하기</Button>
        </header>

        {/* 베스트 게시글 */}
        <div className={`container mo:px-0 ${pxTablet}`}>
          {!isMobile ? (
            <BoardCardList data={likeBoards} />
          ) : (
            <BoardCardList_Swiper data={likeBoards} />
          )}
        </div>

        {/* 전체 게시글 */}
        <div className={`container ${pxTablet}`}>
          {/* search, dropdown bar */}
          <div className="mb-5 flex items-center gap-5 mo:mb-[30px] mo:flex-wrap mo:gap-x-[15px]">
            <div className="flex-1 basis-8/12">
              <SearchInput
                size="full"
                value={value}
                onChange={(value) => setValue(value)}
                placeholder="제목을 검색해 주세요"
                onSubmit={handleSearchSubmit}
              />
            </div>
            <Button onClick={handleSearchSubmit}>검색</Button>
            <Dropdown
              options={['최신순', '인기순']}
              onSelect={handleOptionSelect}
              dropdownSize="w-[140px] ta:w-[120px] mo:w-[89.337vw]"
            />
          </div>

          {/* 게시글 목록 */}
          {boards.length > 0 ? (
            <BoardList data={boards} />
          ) : (
            <EmptyList classNames="mt-[60px] mo:mt-10" text={emptyListText} />
          )}
        </div>

        {/* 페이지네이션 */}
        {boards.length > 0 && (
          <div className="mo:-mt-2">
            <Pagination
              totalCount={totalCount}
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </main>
  );
}
