import React, { FormEvent, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { extractContent, formatDate } from '@/utils/boardHelpers';
import { createArticle } from '@/services/api/boardsAPI';
import { createImageUpload } from '@/services/api/imageAPI';

import Button from '@/components/Button';
import ImageUploadModal from '@/components/Modal/ImageUploadModal';
import TextEditor from '@/components/TextEditor';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'context/SnackBarContext';
import ErrorMessage from '@/components/ErrorMessage';
import Modal from '@/components/Modal/Modal';

// 제목 글자수 제한
const MAX_TITLE = 30;

/**
 * 게시글 등록하기 페이지
 */
export default function Addboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isThumbnailOpen, setIsThumbnailOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { showSnackbar } = useSnackbar();

  const router = useRouter();
  const formData = new FormData();

  const submitDisabled = title.length === 0 || content.length === 0; // 등록 버튼 비활성화
  const textContent = extractContent(content); // 내용에서 추출된 텍스트
  const today = formatDate(new Date().toISOString()); // 오늘 날짜

  // 이미지 처리 tanstack
  const imageMutate = useMutation({
    mutationFn: async (formdata: FormData) => {
      const data = await createImageUpload(formdata);
      return data;
    },
    onSuccess: () => {
      // console.log('--- 썸네일 업로드 성공:', data);
      formData.delete('image');
    },
    onError: (err) => {
      console.error('--- 썸네일 업로드 에러:', err);
      showSnackbar('썸네일 등록에 실패하였습니다.', 'fail');
    },
  });
  // 글작성 tanstack
  const articleMutate = useMutation({
    mutationFn: async (imageUrl: string) => {
      const res = await createArticle(title, content, imageUrl);
      return res;
    },
    onSuccess: (data) => {
      showSnackbar('게시물이 등록되었습니다.', 'success');
      router.push('/boards/' + data.id);
    },
    onError: (err) => {
      console.error('--- 게시물 등록 에러:', err);
      showSnackbar('게시물 등록에 실패하였습니다.', 'fail');
    },
  });

  // 제목 input 콜백 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  // 썸네일 이미지 클릭 콜백 함수
  const handleAddThumbnail = () => {
    setIsThumbnailOpen(true);
  };
  // 이미지 모달 닫기
  const handleImageModalClose = () => {
    setIsThumbnailOpen(false);
  };
  const handleErrorModalClose = () => {
    setIsErrorOpen(false);
  };
  // 이미지 파일 가져오기
  const getImageFile = (file: File | null) => {
    setImageFile(file);
  };
  // 내용 에디터 콜백 함수
  const handleContentChange = (value: string) => {
    setContent(value);
  };
  // 작성 폼 서브밋 함수
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let imageUrl = '';

    if (imageFile) {
      formData.append('image', imageFile);
      const { url } = await imageMutate.mutateAsync(formData);
      if (url) imageUrl = url;
    }
    articleMutate.mutate(imageUrl);
  };

  return (
    <div className="min-h-svh">
      <Head>
        <title>게시물 등록하기 | wikied</title>
      </Head>

      <main>
        <div className="container pb-5 pt-20 mo:px-0 mo:pt-[60px]">
          <div className="mb-5 mt-[54px] rounded-custom p-[30px] shadow-custom dark:shadow-custom-dark mo:mt-0 mo:px-5 mo:py-4 mo:shadow-none">
            <header className="my-4 flex items-center justify-between">
              <h1 className="mo:text-16sb ta:text-20sb pc:text-24sb">
                게시물 등록하기
              </h1>
              <Button
                form="write-form"
                className="min-w-[140px] mo:w-auto"
                disabled={submitDisabled}
                isLoading={isLoading}
              >
                {isLoading ? '등록중 입니다.' : '등록하기'}
              </Button>
            </header>

            <div className="mt-6 text-16 text-gray-300 mo:my-4 mo:text-12">
              등록일
              <span className="ml-3 mo:ml-2">{today}</span>
            </div>

            <form
              id="write-form"
              className="mt-[33px] mo:mt-5 ta:mt-6"
              onSubmit={handleSubmit}
            >
              <fieldset className="mb-5 flex items-center justify-between gap-4 border-y border-gray-200 py-3 mo:mb-4">
                <input
                  id="title"
                  className="w-0 flex-1 bg-transparent text-20md focus-visible:outline-green-200 mo:text-16md"
                  type="text"
                  maxLength={MAX_TITLE}
                  value={title}
                  onChange={handleInputChange}
                  placeholder="제목을 입력해주세요"
                />
                <div className="w-10 text-right text-14md mo:text-13md">
                  {title.length}/
                  <span className="text-green-200">{MAX_TITLE}</span>
                </div>
                <Button
                  type="button"
                  size="small"
                  variant="secondary"
                  onClick={handleAddThumbnail}
                >
                  썸네일 이미지 {imageFile === null ? '추가' : '변경'}
                </Button>
              </fieldset>

              <p className="mb-[10px] mt-5 text-16md mo:my-4 mo:text-14md">
                공백포함 : 총 {textContent.length}자 | 공백제외 총&nbsp;
                {textContent.replaceAll(' ', '').length}자
              </p>

              <div className="h-[420px] mo:h-[50vh]">
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

      <ImageUploadModal
        imageFile={imageFile}
        isOpen={isThumbnailOpen}
        onClose={handleImageModalClose}
        onGetImageFile={getImageFile}
      />

      <Modal
        isOpen={isErrorOpen}
        onClose={handleErrorModalClose}
        width="w-[520px]"
      >
        <ErrorMessage
          title="게시글 등록에 실패하였습니다."
          buttonPosition="right"
        >
          이용에 불편을 드려 죄송합니다. 잠시 후 다시 시도해 주십시오.
          <br />
          오류 현상이 반복되면 코드잇 서버 개발 부서에 연락 부탁 드립니다.
          <div className="text-14sb text-gray-400">
            &middot; 11-7팀에는 아무 잘못이 없습니다.
          </div>
          <a
            href="mailto:support@codeit.kr"
            className="text-14sb hover:underline"
          >
            📧 support@codeit.kr
          </a>
        </ErrorMessage>
      </Modal>
    </div>
  );
}
