import Image from 'next/image';
import { UserProfileProps } from 'types/profile';
import { useProfileImage } from '@/hooks/useProfileImage';
import { useExpandedState } from '@/hooks/useExpandedState';
import InputField from './Input';
import Spinner from './Spinner';

/**
 * UserProfile 컴포넌트
 * 사용자의 프로필 정보를 표시하고 편집하는 컴포넌트
 * PC, 태블릿, 모바일 환경에 따라 레이아웃이 반응형으로 변경
 *
 * @param data - 사용자 프로필 데이터 객체
 * @param isEditing - 편집 모드 여부
 * @param onDataChange - 데이터 변경 시 호출되는 콜백 함수
 */
function UserProfile({
  data,
  isEditing = false,
  onDataChange,
}: UserProfileProps) {
  // 추가 정보 영역의 펼침/접힘 상태 관리 훅
  const { isExpanded, toggleExpand } = useExpandedState();

  // 프로필 이미지 관련 상태와 이벤트 핸들러 훅
  const {
    isLoading,
    previewImage,
    fileInputRef,
    handleImageClick,
    handleFileChange,
  } = useProfileImage((url) => onDataChange('image', url));

  /**
   * 프로필 필드를 렌더링하는 헬퍼 함수
   * 편집 모드에서는 입력 필드로, 조회 모드에서는 텍스트로 표시
   *
   * @param label - 필드 레이블
   * @param field - data 객체의 키값
   * @returns 렌더링된 필드 컴포넌트
   */
  const renderField = (label: string, field: keyof typeof data) => {
    if (isEditing) {
      return (
        <InputField
          value={String(data[field])}
          onChange={(e) => onDataChange(field, e.target.value)}
          label={label}
          layout="horizontal"
        />
      );
    }

    return (
      <p className="flex w-[200px] text-14 mo:h-[18px] mo:w-[180px] mo:text-12 ta:h-[24px] pc:h-[24px]">
        <span className="flex-[1] text-gray-400">{label}</span>
        <span className={`flex-[2] truncate text-gray-500`}>{data[field]}</span>
      </p>
    );
  };

  return (
    <div
      className={`${isEditing ? 'mo:px-[37px] mo:pb-[17px] mo:pl-[34px] mo:pt-[15px] ta:px-[16px] ta:pb-[37px] ta:pt-[20px] pc:h-auto pc:pb-[36px] pc:pl-[40px]' : 'pc:h-[671px]'}flex max-w-4xl flex-col rounded-custom bg-background shadow-custom dark:shadow-custom-dark mo:pl-[20px] mo:pt-[15px] ta:px-[30px] ta:pb-[5px] ta:pt-[20px] pc:w-[320px] pc:px-[30px] pc:pb-[47px] pc:pt-[60px] tamo:w-full`}
    >
      {/* 프로필 이미지와 정보를 포함하는 상단 컨테이너 */}
      <div
        className={`flex ${isEditing ? 'flex-col' : 'flex-col mo:flex-row ta:flex-row pc:flex-col'}`}
      >
        {/* 프로필 이미지 섹션 */}
        <div
          className={`flex items-center justify-center mo:pr-[10px] ta:pr-[20px] ${
            isEditing ? 'mo:p-0 ta:p-0 tamo:justify-center' : 'tamo:self-start'
          }`}
        >
          {/* 이미지 업로드 버튼 */}
          <button
            onClick={handleImageClick}
            className="relative flex size-fit cursor-pointer"
            type="button"
            disabled={isLoading}
          >
            {/* 이미지 컨테이너 */}
            <div
              className={`relative mo:size-[62px] ta:size-[71px] pc:size-[200px] ${
                isEditing ? 'mo:size-[62px] ta:size-[71px] pc:size-[200px]' : ''
              }`}
            >
              {/* 프로필 이미지 */}
              <Image
                src={
                  previewImage !== null
                    ? previewImage
                    : data.image && data.image !== ''
                      ? data.image
                      : '/icon/icon-profile.svg'
                }
                alt="Profile"
                fill
                sizes="(max-width: 768px) 62px, (max-width: 1024px) 71px, 192px"
                priority
                className="rounded-full object-cover"
              />
            </div>
            {isEditing && (
              <div className="absolute left-0 top-0 flex size-full items-center justify-center rounded-full bg-black/50">
                {isLoading ? (
                  <Spinner />
                ) : (
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
          {/* 숨겨진 파일 입력 필드 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload profile image"
            disabled={!isEditing || isLoading}
          />
        </div>

        {/* 프로필 정보 섹션 */}
        <div
          className={`${
            isEditing
              ? 'mo:pt-[24px] ta:pb-[37px] ta:pt-[34px] tamo:justify-center'
              : 'mo:flex-1 mo:pl-[10px] ta:flex-1 ta:pl-[20px]'
          } pc:pt-[60px] mo:pc:w-full`}
        >
          <div
            className={`${isEditing ? 'space-y-[16px]' : 'mo:space-y-[8px] ta:space-y-[4px]'}`}
          >
            {/* 기본 정보 영역 */}
            <div
              className={`${
                isEditing
                  ? 'mo:space-y-[16px] ta:grid ta:grid-cols-2 ta:gap-[16px] ta:space-y-0 pc:space-y-[16px]'
                  : 'mo:space-y-[8px] ta:space-y-[4px] pc:space-y-[16px]'
              }`}
            >
              {renderField('거주 도시', 'city')}
              {renderField('MBTI', 'mbti')}
              {renderField('직업', 'job')}
              {isEditing && renderField('SNS 계정', 'sns')}
            </div>

            {/* PC용 추가 정보 섹션 */}
            {!isEditing && (
              <div className="hidden pc:block pc:space-y-[16px] pc:pt-[16px]">
                {renderField('SNS 계정', 'sns')}
                {renderField('생일', 'birthday')}
                {renderField('별명', 'nickname')}
                {renderField('혈액형', 'bloodType')}
                {renderField('국적', 'nationality')}
              </div>
            )}

            {/* 편집 모드일 때 추가 정보 */}
            {isEditing && (
              <div className="mo:space-y-[16px] ta:grid ta:grid-cols-2 ta:gap-[16px] pc:space-y-[16px]">
                {renderField('생일', 'birthday')}
                {renderField('별명', 'nickname')}
                {renderField('혈액형', 'bloodType')}
                {renderField('국적', 'nationality')}
              </div>
            )}

            {/* 모바일/태블릿용 추가 정보 섹션 */}
            {!isEditing && isExpanded && (
              <div className="mo:space-y-[8px] ta:space-y-[4px] pc:hidden">
                {renderField('SNS 계정', 'sns')}
                {renderField('생일', 'birthday')}
                {renderField('별명', 'nickname')}
                {renderField('혈액형', 'bloodType')}
                {renderField('국적', 'nationality')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 모바일/태블릿용 확장 버튼 */}
      {!isEditing && (
        <div className="flex justify-center pc:hidden tamo:py-[5px]">
          <button
            onClick={toggleExpand}
            className="flex items-center gap-2 text-14md text-green-200 hover:text-green-300"
          >
            <Image
              src={
                isExpanded ? '/icon/icon-collapse.svg' : '/icon/icon-expand.svg'
              }
              alt={isExpanded ? 'Collapse' : 'Expand'}
              width={24}
              height={24}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
