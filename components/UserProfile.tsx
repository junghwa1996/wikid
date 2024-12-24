import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import instance from '@/lib/axios-client';

import InputField from './Input';

// 프로필 데이터의 타입 정의
interface ProfileData {
  updatedAt: string; // 프로필 업데이트 시간
  securityQuestion: string; // 보안 질문
  securityAnswer: string; // 보안 답변
  teamId: string; // 팀 ID
  content: string; // 자기소개
  nationality: string; // 국적
  family: string; // 가족관계
  bloodType: string; // 혈액형
  nickname: string; // 별명
  birthday: string; // 생일
  sns: string; // SNS 계정
  job: string; // 직업
  mbti: string; // MBTI
  city: string; // 거주 도시
  image: string; // 프로필 이미지 URL
  code: string; // 사용자 코드
  name: string; // 이름
  id: number; // 사용자 ID
}

// 컴포넌트 props 타입 정의
interface UserProfileProps {
  data: ProfileData; // 프로필 데이터
  isEditing?: boolean; // 수정 모드 여부
  onDataChange: (field: keyof ProfileData, value: string) => void; // 데이터 변경 핸들러
}

function UserProfile({
  data,
  isEditing = false,
  onDataChange,
}: UserProfileProps) {
  // 상태 관리
  const [isExpanded, setIsExpanded] = useState(false); // 추가 정보 펼침/접힘 상태
  const [isLoading, setIsLoading] = useState(false); // 이미지 업로드 로딩 상태
  const [previewImage, setPreviewImage] = useState<string | null>(null); // 이미지 미리보기 URL
  const fileInputRef = useRef<HTMLInputElement>(null); // 파일 입력 요소 참조

  // 추가 정보 토글 함수
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // 컴포넌트 언마운트 시 미리보기 이미지 URL 정리
  useEffect(() => {
    return () => {
      if (previewImage !== null && previewImage !== '') {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // 입력값 변경 핸들러
  const handleInputChange = (field: keyof ProfileData, value: string) => {
    onDataChange(field, value);
  };

  // 이미지 클릭 핸들러 - 파일 선택 다이얼로그 표시
  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  // 파일 선택 시 처리 함수
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 선택한 이미지 미리보기 생성
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);

    setIsLoading(true);
    try {
      // FormData 생성 및 이미지 파일 추가
      const formData = new FormData();
      formData.append('image', file);

      // 이미지 업로드 API 호출
      const response = await instance.post<{ url: string }>(
        '/images/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // 업로드 성공 시 이미지 URL 업데이트
      onDataChange('image', response.data.url);
    } catch (error) {
      // 업로드 실패 시 미리보기 제거
      console.error('Error uploading image:', error);
      setPreviewImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 필드 렌더링 함수
  const renderField = (label: string, field: keyof ProfileData) => {
    if (isEditing) {
      // 수정 모드: 입력 필드 표시
      return (
        <InputField
          value={String(data[field])}
          onChange={(e) => handleInputChange(field, e.target.value)}
          label={label}
          layout="horizontal"
        />
      );
    }

    // 조회 모드: 레이블과 값 표시
    return (
      <p className="flex h-[18px] w-[200px] text-14 mo:text-12">
        <span className="flex-[1] text-gray-400">{label}</span>
        <span className="flex-[2] text-gray-500">{data[field]}</span>
      </p>
    );
  };

  return (
    <div className="mx-auto max-w-4xl rounded-custom bg-white shadow-custom dark:bg-gray-600 dark:shadow-custom-dark mo:w-11/12 ta:w-11/12 pc:w-[400px] pc:p-7 tamo:p-5">
      {/* 메인 컨테이너 */}
      <div
        className={`flex ${isEditing ? 'flex-col' : 'flex-col mo:flex-row ta:flex-row pc:flex-col'} pc:items-center`}
      >
        {/* 프로필 이미지 섹션 */}
        <div
          className={`flex items-center justify-center tamo:pt-4 ${isEditing ? '' : 'mo:self-start ta:self-start'}`}
        >
          {/* 이미지 클릭 버튼 */}
          <button
            onClick={handleImageClick}
            className="relative flex size-fit cursor-pointer"
            type="button"
            disabled={isLoading}
          >
            {/* 프로필 이미지 */}
            <Image
              src={previewImage !== null ? previewImage : data.image}
              alt="Profile"
              width={100}
              height={100}
              className={`rounded-full object-cover ${
                isEditing
                  ? 'mo:size-[62px] ta:size-[71px] pc:size-48'
                  : 'mo:size-[62px] ta:size-[71px] pc:size-48'
              }`}
            />
            {/* 수정 모드일 때 오버레이 표시 */}
            {isEditing && (
              <div className="absolute left-0 top-0 flex size-full items-center justify-center rounded-full bg-black/50">
                {isLoading ? (
                  // 로딩 스피너
                  <div className="size-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  // 카메라 아이콘
                  <Image
                    src="/icon/icon-camera.svg"
                    alt="Edit photo"
                    width={24}
                    height={24}
                    className={`text-white mo:size-6 ta:size-6 pc:size-12`}
                  />
                )}
              </div>
            )}
          </button>
          {/* 숨겨진 파일 입력 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload profile image"
          />
        </div>

        {/* 프로필 정보 섹션 */}
        <div
          className={`${isEditing ? 'mt-4 mo:justify-center' : 'mo:ml-4 mo:flex-1 ta:ml-4 ta:flex-1 pc:mt-4'} mt-6 pc:w-full`}
        >
          <div className="space-y-3">
            {/* 기본 정보 영역 */}
            <div
              className={`${
                isEditing
                  ? 'mo:space-y-3 ta:grid ta:grid-cols-2 ta:place-items-center ta:gap-3 ta:space-y-0 pc:space-y-3'
                  : ''
              } space-y-3`}
            >
              {renderField('거주 도시', 'city')}
              {renderField('MBTI', 'mbti')}
              {renderField('직업', 'job')}
              {isEditing && renderField('SNS 계정', 'sns')}
            </div>

            {/* 추가 정보 영역 */}
            {isEditing ? (
              // 수정 모드: 모든 필드 표시
              <div className="mo:space-y-3 ta:grid ta:grid-cols-2 ta:place-items-center ta:gap-3 pc:space-y-3">
                {renderField('생일', 'birthday')}
                {renderField('별명', 'nickname')}
                {renderField('혈액형', 'bloodType')}
                {renderField('국적', 'nationality')}
                {renderField('가족관계', 'family')}
                {renderField('보안 질문', 'securityQuestion')}
                {renderField('보안 답변', 'securityAnswer')}
                {renderField('자기소개', 'content')}
              </div>
            ) : (
              // 조회 모드: 접힘/펼침 가능한 추가 정보
              <>
                {/* 모바일/태블릿용 접힘/펼침 섹션 */}
                <div className="pc:hidden">
                  {!isExpanded ? (
                    // 접힌 상태: 더보기 버튼 (가운데 정렬)
                    <div className="flex justify-center">
                      <button
                        onClick={toggleExpand}
                        className="flex items-center gap-2 text-14md text-green-200 hover:text-green-300"
                      >
                        <Image
                          src="/icon/icon-expand.svg"
                          alt="Expand"
                          width={16}
                          height={16}
                        />
                      </button>
                    </div>
                  ) : (
                    // 펼친 상태: 추가 정보 표시
                    <div>
                      <div className="space-y-3">
                        {renderField('SNS 계정', 'sns')}
                        {renderField('생일', 'birthday')}
                        {renderField('별명', 'nickname')}
                        {renderField('혈액형', 'bloodType')}
                        {renderField('국적', 'nationality')}
                      </div>
                      {/* 접기 버튼 */}
                      <div className="mt-3 flex justify-center">
                        <button
                          onClick={toggleExpand}
                          className="flex items-center gap-2 text-14md text-green-200 hover:text-green-300"
                        >
                          <Image
                            src="/icon/icon-collapse.svg"
                            alt="Collapse"
                            width={16}
                            height={16}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* PC용 추가 정보 섹션 - 항상 표시 */}
                <div className="hidden space-y-3 pc:block">
                  {renderField('SNS 계정', 'sns')}
                  {renderField('생일', 'birthday')}
                  {renderField('별명', 'nickname')}
                  {renderField('혈액형', 'bloodType')}
                  {renderField('국적', 'nationality')}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
