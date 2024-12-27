import Link from 'next/link';
import { useRouter } from 'next/router';

export default function GNB() {
  const router = useRouter();

  // 특정 페이지에 따라 스타일 변경
  const isWikiListPage = router.pathname === '/wikilist';
  const isBoardsPage = router.pathname === '/boards';

  return (
    <div className="flex items-center gap-10 text-14">
      <Link
        className={`${isWikiListPage ? `text-green-300` : ``} hover:text-green-200 active:text-green-300 mo:hidden`}
        href="/wikilist"
      >
        위키목록
      </Link>
      <Link
        className={`${isBoardsPage ? `text-green-300` : ``} hover:text-green-200 active:text-green-300 mo:hidden`}
        href="/boards"
      >
        자유게시판
      </Link>
    </div>
  );
}
