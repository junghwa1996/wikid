import { useState, useRef, useEffect } from 'react';
import instance from '@/lib/axios-client';
import { AxiosError } from 'axios';

import { useSnackbar } from 'context/SnackBarContext';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const NOT_ALLOWED_TYPE_MESSAGE =
  'JPG, PNG, GIF, WebP 형식의 이미지만 업로드 가능합니다.';
const SIZE_LIMIT_MESSAGE = '파일 크기는 5MB를 초과할 수 없습니다.';

export const useProfileImage = (onImageChange: (url: string) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 파일명 바꿔주기
  const sanitizeFileName = (file: File): File => {
    // 현재 시간을 이용한 유니크한 파일명 생성
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const newFileName = `profile_${timestamp}_${randomString}.${extension}`;

    // 새로운 파일 객체 생성
    return new File([file], newFileName, { type: file.type });
  };

  const validateFile = (file: File): boolean => {
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (!extension || !validExtensions.includes(extension)) {
      showSnackbar(NOT_ALLOWED_TYPE_MESSAGE, 'fail');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      showSnackbar(SIZE_LIMIT_MESSAGE, 'fail');
      return false;
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 유효성 검증
    if (!validateFile(file)) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    const sanitizedFile = sanitizeFileName(file);
    const objectUrl = URL.createObjectURL(sanitizedFile);
    setPreviewImage(objectUrl);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', sanitizedFile);

      const response = await instance.post<{ url: string }>(
        '/images/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      onImageChange(response.data.url);
    } catch (error: unknown) {
      // 서버 에러 상세 처리
      let errorMessage = '이미지 업로드에 실패했습니다.';

      if (error instanceof AxiosError && error.response) {
        // HTTP 에러 상태 코드별 처리
        switch (error.response.status) {
          case 400:
            errorMessage = '잘못된 파일 형식입니다.';
            break;
          case 500:
            errorMessage =
              '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
            break;
        }
      }

      showSnackbar(errorMessage, 'fail');
      setPreviewImage(null);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // 입력 필드 초기화
      }
    }
  };

  return {
    isLoading,
    previewImage,
    fileInputRef,
    handleImageClick,
    handleFileChange,
  };
};
