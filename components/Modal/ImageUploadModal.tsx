import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import Button from '../Button';
import Modal from './Modal';

interface ImageUploadModalProps {
  imageFile?: File | null;
  isOpen: boolean;
  onClose: () => void;
  onGetImageFile: (file: File | null) => void;
}

/**
 * 이미지 업로드 모달 컴포넌트
 * @param isOpen 모달 오픈 여부
 * @param onClose 모달 닫기 함수
 * @returns ImageUploadModal 컴포넌트
 */

const ImageUploadModal = ({
  imageFile: initialImageFile = null,
  isOpen,
  onClose,
  onGetImageFile,
}: ImageUploadModalProps) => {
  // input 요소를 참조하기 위한 ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 선택한 이미지의 미리보기 url
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(initialImageFile);
  const [isDragging, setIsDragging] = useState(false); // 드래그 중인지 여부

  // 파일 선택시
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('--- handleFileChange', e.target.files);
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
      setImageFile(file);
    }
  };

  // 이미지 파일 삭제
  const handleImageDelete = () => {
    // console.log('--- handleImageDelete');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      setPreviewUrl(null);
      setImageFile(null);
    }
  };

  // 드래그 관련 이벤트
  // 드래그 시작
  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation(); // 이벤트 전파 중지
    setIsDragging(true);
  };
  // 드래그가 영역을 벗어날 때
  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  // 드래그 중
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  // 드래그로 파일을 드랍했을 때
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    // length로 파일 존재 여부를 먼저 체크
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
        setImageFile(file);
      }
    }
  };

  // 썸네일로 선택
  const handleImageSelect = () => {
    onGetImageFile(imageFile);
    onClose();
  };

  useEffect(() => {
    // cleanup
    return () => {
      if (previewUrl !== null) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (initialImageFile) {
      const previewUrl = URL.createObjectURL(initialImageFile);
      setPreviewUrl(previewUrl);
    }
  }, [initialImageFile]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <p className="text-center text-18sb">이미지</p>
        <input
          id="image"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {previewUrl === null ? (
          <label
            htmlFor="image"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
              isDragging
                ? 'border-green-400 bg-green-50'
                : 'border-gray-300 bg-gray-100 hover:border-gray-400'
            }`}
          >
            <Image
              src="/icon/icon-camera.svg"
              alt="이미지 업로드"
              width={36}
              height={36}
            />
            <p className="mt-2 text-14 text-gray-400">
              클릭 또는 이미지를 드래그하여 올려주세요.
            </p>
          </label>
        ) : (
          <div className="relative flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed">
            <Image
              src={previewUrl}
              alt="선택된 이미지"
              fill={true}
              className="object-contain"
              sizes="350px"
            />
            <button
              type="button"
              onClick={handleImageDelete}
              className="absolute right-2 top-2 rounded-full bg-gray-100 p-1 transition-colors hover:bg-gray-200"
            >
              <Image
                src="/icon/icon-delete.svg"
                alt="삭제"
                width={20}
                height={20}
              />
            </button>
          </div>
        )}

        <div className="flex justify-end">
          <Button type="button" onClick={handleImageSelect}>
            선택하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageUploadModal;
