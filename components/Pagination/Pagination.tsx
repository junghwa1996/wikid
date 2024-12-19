import Image from 'next/image';

import PaginationButton from './PaginationButton';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

/**
 * 페이지네이션 컴포넌트
 * @param totalCount - 전체 데이터 개수
 * @param currentPage - 현재 페이지 번호
 * @param pageSize - 페이지 당 데이터 개수
 * @param onPageChange - 페이지 변경 핸들러(상태 리프팅, setter 함수를 받음)
 * @example
  * <Pagination
      totalCount={totalCount}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={setCurrentPage}
    />
 */
export default function Pagination({
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  // 노출 될 페이지네이션의 총 개수 (현재 5개만 노출)
  const maxPages = 5;

  // 이전 페이지로 이동할 때, 최소 1 페이지를 유지
  const handlePrev = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  // 다음 페이지로 이동할 때, 최대 totalPages 페이지를 유지
  const handleNext = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  // 총 페이지 번호를 계산하여 배열로 리턴하는 함수
  const getPages = () => {
    const pages = []; // 반환할 페이지 번호 배열
    const half = Math.floor(maxPages / 2); // 현재 페이지 중심 버튼 배치 기준점(중앙 배치를 위해 /2)

    let start = Math.max(currentPage - half, 1); // 시작 페이지 계산
    const end = Math.min(start + maxPages - 1, totalPages); // 끝 페이지 계산

    /**
     * 시작 페이지 조정
     * - end - start < maxPages - 1: 끝 페이지가 maxPages보다 작을 경우 조건 실행
     * - (끝 페이지 - 총 페이지 + 1) 과 1 중 큰 값을 선택하여 시작 페이지 재할당
     */
    if (end - start < maxPages - 1) {
      start = Math.max(end - maxPages + 1, 1);
    }

    // 페이지 배열 생성
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const arrowStyles = 'h-[24px] w-[24px] mo:h-[18px] mo:w-[18px]';

  return (
    <div className="flex items-center justify-center gap-[15px] mo:gap-[10px]">
      {/* 이전 페이지 버튼 - 현재 페이지가 1일 경우 disabled*/}
      <PaginationButton onClick={handlePrev} disabled={currentPage === 1}>
        <Image
          src="/icon/icon-arrow.svg"
          alt="이전 페이지로 이동"
          className={arrowStyles}
        />
      </PaginationButton>

      {/* 페이지 버튼 목록 */}
      <div className="flex items-center justify-center gap-[10px] mo:gap-[5px]">
        {getPages().map((pageNumber) => (
          <PaginationButton
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={
              pageNumber === currentPage ? 'text-green-200' : 'text-gray-400'
            }
          >
            {pageNumber}
          </PaginationButton>
        ))}
      </div>

      {/* 다음 페이지 버튼 - 현재 페이지가 totalPages와 같으면 disabled*/}
      <PaginationButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <Image
          src="/icon/icon-arrow.svg"
          alt="다음 페이지로 이동"
          className={`${arrowStyles} rotate-180`}
        />
      </PaginationButton>
    </div>
  );
}
