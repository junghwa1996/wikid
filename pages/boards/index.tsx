import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
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
import SnackBar, { SnackBarProps } from '@/components/SnackBar';
import Router from 'next/router';

const BoardCardList_Swiper = dynamic(
  () => import('@/components/boards.page/BoardCardList.swiper'),
  {
    ssr: false,
  }
);

/**
 * 게시판 페이지
 */
export default function Boards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [likeBoards, setLikeBoards] = useState<Board[]>([]);

  const [totalCount, setTotalCount] = useState(0);
  const [currentData, setCurrentData] = useState<Board[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedOption, setSelectedOption] = useState('최신순');

  const [value, setValue] = useState('');

  const { isAuthenticated } = useProfileContext();

  const isMobile = useCheckMobile();
  const PAGE_SIZE = 10;

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackStyled, setSnackStyled] =
    useState<SnackBarProps['severity']>(undefined);

  // 베스트 게시글 fetch
  useEffect(() => {
    const fetchBoardsLike = async () => {
      const res = await getBoards({ orderBy: 'like', pageSize: 4 });
      if (Array.isArray(res.list) && res.list.length > 0) {
        setLikeBoards(res.list);
      }
    };

    fetchBoardsLike().catch((error) =>
      console.error('베스트 게시글 데이터를 불러오지 못했습니다 :', error)
    );
  }, []);

  // 모든 게시글 GET
  useEffect(() => {
    const fetchBoards = async () => {
      const orderBy = selectedOption === '최신순' ? 'recent' : 'like';
      const res = await getBoards({
        orderBy,
        pageSize: PAGE_SIZE,
        page: currentPage,
      });
      if (Array.isArray(res.list) && res.list.length > 0) {
        setBoards(res.list);
        setTotalCount(res.totalCount);
      }
    };

    fetchBoards().catch((error) =>
      console.error('게시글 데이터를 불러오지 못했습니다 :', error)
    );
  }, [currentPage, selectedOption]);

  // 게시글 목록 업데이트
  useEffect(() => {
    setCurrentData(boards);
  }, [boards]);

  const handleSearchSubmit = async () => {
    const res = await getBoards({
      keyword: value,
      pageSize: PAGE_SIZE,
      page: currentPage,
    });
    if (Array.isArray(res.list) && res.list.length > 0) {
      setBoards(res.list);
      setTotalCount(res.totalCount);
    }
  };

  // 정렬 옵션
  const options = ['최신순', '인기순'];
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setCurrentPage(1);
  };

  const handleCreateClick = async () => {
    if (isAuthenticated) {
      Router.push('/addboard');
    } else {
      setSnackStyled('fail');
      setSnackBarMessage('로그인 후 이용해주세요');
      setSnackBarOpen(true);
      return;
    }
  };

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
              options={options}
              onSelect={handleOptionSelect}
              dropdownSize="w-[140px] ta:w-[120px] mo:w-[89.337vw]"
            />
          </div>

          {/* 게시글 목록 */}
          <BoardList data={currentData} />
        </div>

        {/* 페이지네이션 */}
        <div className="mo:-mt-2">
          <Pagination
            totalCount={totalCount}
            currentPage={currentPage}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <SnackBar
        severity={snackStyled}
        open={snackBarOpen}
        onClose={() => setSnackBarOpen(false)}
        autoHideDuration={2000}
      >
        {snackBarMessage}
      </SnackBar>
    </main>
  );
}
