import instance from 'lib/axios-client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';

import Button from '@/components/Button';
import ImageUploadModal from '@/components/Modal/ImageUploadModal';
import SnackBar from '@/components/SnackBar';
import TextEditor from '@/components/TextEditor';

// 게시글 상세 작성 응답 데이터 타입 정의
interface ArticleResponse {
  data: {
    id: number;
    title: string;
    content: string;
    image: string;
  };
  status: number;
}
// 이미지 업로드 응답 데이터 타입 정의
interface ImageResponse {
  data: {
    url: string;
  };
  status: number;
}

// 스낵바 타입 정의
type severity = 'fail' | 'success' | 'info';
interface SnackBarValues {
  open: boolean;
  severity: severity;
  message: string;
  onClose: (value: boolean) => void;
}

// 제목 글자수 제한
const MAX_TITLE = 30;

// HTML에서 Text만 추출하는 함수
const extractContent = (str: string) => str.replace(/<[^>]*>/g, '').trim();

// 포멧된 날짜 반환하는 함수
const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}. ${month}. ${day}.`;
};

/**
 * 게시글 등록하기 페이지
 */
export default function Addboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [snackBarValues, setSnackBarValues] = useState<SnackBarValues>({
    open: false,
    severity: 'success',
    message: '',
    onClose: () => {},
  });
  const router = useRouter();
  const formData = new FormData();

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
  // 썸네일 이미지 클릭 콜백 함수
  const handleAddThumbnail = () => {
    setIsModalOpen(true);
  };
  // 이미지 모달 닫기
  const handleImageModalClose = () => {
    // console.log('--- handleImageModalClose ---');
    setIsModalOpen(false);
  };
  // 이미지 파일 가져오기
  const getImageFile = (file: File | null) => {
    // console.log('--- getImageUrl:', file);
    setImageFile(file);
  };
  // 내용 에디터 콜백 함수
  const handleContentChange = (value: string) => {
    setContent(value);
  };
  // 스낵바 오픈 함수
  const snackBarOpen = (
    severity: severity,
    message: string,
    done: null | (() => void) = null // 스넥바 사라지고 난 후 실행할 함수
  ) => {
    setSnackBarValues({
      open: true,
      severity: severity,
      message: message,
      onClose: (value: boolean) => {
        setSnackBarValues({ ...snackBarValues, open: value });
        if (done) done();
      },
    });
  };

  // 작성 폼 서브밋 함수
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 썸네일 이미지 주소
    let imageUrl = '';

    if (imageFile) {
      formData.append('image', imageFile);
      try {
        const { data, status }: ImageResponse = await instance.post(
          '/images/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (status === 201) {
          console.log('--- 썸네일 업로드 성공 ---');
          formData.delete('image');
          imageUrl = data.url;
        }
      } catch (error) {
        console.error('--- 썸네일 업로드 에러:', error);
      }
    }

    try {
      const { data, status }: ArticleResponse = await instance.post(
        '/articles',
        {
          image: imageUrl || 'https://ifh.cc/g/V26MYS.png',
          content,
          title,
        }
      );

      if (status === 201) {
        snackBarOpen(
          'success',
          '게시물이 등록되었습니다. 작성된 게시물로 이동 됩니다.',
          async () => {
            await router.push('/boards/' + data.id);
          }
        );
      }
    } catch (error) {
      console.error('--- 게시물 등록 실패:', error);
    }
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
                className="w-[140px] mo:w-auto"
                disabled={submitDisabled}
              >
                등록하기
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
                <Button type="button" size="small" onClick={handleAddThumbnail}>
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
        isOpen={isModalOpen}
        onClose={handleImageModalClose}
        onGetImageFile={getImageFile}
      />

      <SnackBar
        open={snackBarValues.open}
        severity={snackBarValues.severity}
        onClose={() => snackBarValues.onClose(false)}
      >
        {snackBarValues.message}
      </SnackBar>
    </div>
  );
}
