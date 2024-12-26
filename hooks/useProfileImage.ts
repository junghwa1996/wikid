import { useState, useRef, useEffect } from 'react';
import instance from '@/lib/axios-client';

export const useProfileImage = (onImageChange: (url: string) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.toLowerCase().split('.').pop();
    if (fileExtension === 'svg') {
      alert('SVG 파일은 업로드할 수 없습니다.');
      e.target.value = '';
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

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
    } catch (error) {
      alert('이미지 업로드에 실패했습니다.');
      setPreviewImage(null);
    } finally {
      setIsLoading(false);
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
