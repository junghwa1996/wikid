import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FormEvent, useEffect, useState } from 'react';

import Button from '@/components/Button';
import TextEditor from '@/components/TextEditor';
import { getBoardDetail, patchBoard } from '@/services/api/boardsAPI';
import { extractContent, formatDate } from '@/utils/boardHelpers';

// 제목 글자수 제한
const MAX_TITLE = 30;

/**
 * 게시글 수정하기 페이지
 */
export default function UpdateBoard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  const { articleId } = router.query;

  console.log(articleId);

  useEffect(() => {
    // 게시글 상세 내용 로드
    const fetchArticle = async () => {
      try {
        const res = await getBoardDetail(articleId as string);
        setTitle(res.title);
        setContent(res.content);
        setImage(res.image);
      } catch {
        throw new Error('게시글을 불러오지 못했습니다.');
      }
    };

    if (typeof articleId === 'string') {
      void fetchArticle();
    }
  }, [articleId]);

  // 등록 버튼 비활성화
  const submitDisabled = title.length === 0 || content.length === 0;
  // 내용에서 추출된 텍스트
  const textContent = extractContent(content);
  // 오늘 날짜
  const today = formatDate(new Date().toISOString());

  // 제목 input 콜백 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  // 내용 에디터 콜백 함수
  const handleContentChange = (value: string) => {
    setContent(value);
  };
  // 작성 폼 서브밋 함수
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await patchBoard(articleId as number | string, {
        title,
        content,
        image: image ?? 'https://ifh.cc/g/V26MYS.png',
      });
      if (typeof articleId === 'string') {
        await router.push(`/boards/${articleId}`);
      }
    } catch {
      throw new Error('게시글을 수정하지 못했습니다.');
    }
  };

  return (
    <div className="min-h-svh">
      <Head>
        <title>게시물 수정하기 | wikied</title>
      </Head>

      <main>
        <div className="container pt-20 mo:px-0 mo:pt-[60px]">
          <div className="mb-5 mt-[54px] rounded-custom p-[30px] shadow-custom dark:shadow-custom-dark mo:mt-0 mo:px-5 mo:py-4 mo:shadow-none">
            <header className="my-4 flex items-center justify-between">
              <h1 className="mo:text-16sb ta:text-20sb pc:text-24sb">
                게시물 수정하기
              </h1>
              <Button
                form="write-form"
                className="w-[140px] mo:w-auto"
                disabled={submitDisabled}
              >
                수정하기
              </Button>
            </header>

            <div className="my-6 text-16 text-gray-300 mo:my-4 mo:text-12">
              등록일
              <span className="ml-3 mo:ml-2">{today}</span>
            </div>

            <form
              id="write-form"
              className="mt-[33px] mo:mt-5 ta:mt-6"
              onSubmit={handleSubmit}
            >
              {/* TODO : 추후 썸네일 등록 버튼 생성 되면 수정 할 수 있도록 작업 */}
              <Image
                src={image ?? 'https://ifh.cc/g/V26MYS.png'}
                alt="게시물 썸네일"
                width={500}
                height={300}
                priority
                className="mo:h-auto mo:w-[295px]"
              />
              <fieldset className="my-5 flex items-center justify-between border-y border-gray-200 mo:mb-4">
                <label htmlFor="title" className="sr-only">
                  제목
                </label>
                <input
                  id="title"
                  className="w-0 flex-1 bg-transparent py-3 text-20md focus-visible:outline-green-200 mo:text-16md"
                  type="text"
                  maxLength={MAX_TITLE}
                  value={title}
                  onChange={handleInputChange}
                  placeholder="제목을 입력해주세요"
                />
                <div className="ml-4 w-10 text-14md mo:text-13md">
                  {title.length}/
                  <span className="text-green-200">{MAX_TITLE}</span>
                </div>
              </fieldset>

              <p className="mb-[10px] mt-5 text-16md mo:my-4 mo:text-14md">
                공백포함 : 총 {textContent.length}자 | 공백제외 총
                {textContent.replaceAll(' ', '').length}자
              </p>

              <div className="h-[520px] mo:h-[50vh] ta:h-[480px]">
                <TextEditor value={content} onChange={handleContentChange} />
              </div>
            </form>
          </div>

          <div className="mb-8 text-center">
            <Button href="/boards" variant="secondary" className="w-[140px]">
              목록으로
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
