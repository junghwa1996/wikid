import Image from 'next/image';
import { UserProfileProps } from 'types/profile';
import { useProfileImage } from '@/hooks/useProfileImage';
import { useExpandedState } from '@/hooks/useExpandedState';
import InputField from './Input';
import Spinner from './Spinner';

/**
 * UserProfile 컴포넌트
 * 사용자의 프로필 정보를 표시하고 편집하는 컴포넌트
 * PC와 모바일/태블릿 환경에서 각각 다른 레이아웃으로 표시됨
 *
 * @param data - 사용자 프로필 데이터
 * @param isEditing - 편집 모드 여부 (기본값: false)
 * @param onDataChange - 데이터 변경 시 호출되는 콜백 함수
 */
function UserProfile({
  data,
  isEditing = false,
  onDataChange,
}: UserProfileProps) {
  // 추가 정보 영역의 펼침/접힘 상태 관리
  const { isExpanded, toggleExpand } = useExpandedState();

  // 프로필 이미지 관련 상태와 핸들러
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
   * @param field - 데이터 객체의 키
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
      <p className="flex h-[18px] w-[200px] text-14 mo:text-12">
        <span className="flex-[1] text-gray-400">{label}</span>
        <span className="flex-[2] text-gray-500">{data[field]}</span>
      </p>
    );
  };

  return (
    // 메인 컨테이너
    <div className="mx-auto max-w-4xl rounded-custom bg-white shadow-custom dark:bg-gray-600 dark:shadow-custom-dark mo:w-11/12 ta:w-11/12 pc:w-[400px] pc:p-7 tamo:p-5">
      {/* 레이아웃 컨테이너: PC에서는 세로, 모바일/태블릿에서는 가로 배치 */}
      <div
        className={`flex ${isEditing ? 'flex-col' : 'flex-col mo:flex-row ta:flex-row pc:flex-col'} pc:items-center`}
      >
        {/* 프로필 이미지 섹션 */}
        <div
          className={`flex items-center justify-center tamo:pt-4 ${isEditing ? '' : 'mo:self-start ta:self-start'}`}
        >
          {/* 이미지 업로드 버튼 */}
          <button
            onClick={handleImageClick}
            className="relative flex size-fit cursor-pointer"
            type="button"
            disabled={isLoading}
          >
            {/* 프로필 이미지 표시 */}
            <Image
              src={
                previewImage !== null
                  ? previewImage
                  : data.image && data.image !== ''
                    ? data.image
                    : '/icon/icon-profile.svg'
              }
              alt="Profile"
              width={100}
              height={100}
              priority
              className={`rounded-full object-cover ${
                isEditing
                  ? 'mo:size-[62px] ta:size-[71px] pc:size-48'
                  : 'mo:size-[62px] ta:size-[71px] pc:size-48'
              }`}
            />
            {/* 편집 모드일 때 이미지 위에 오버레이 표시 */}
            {isEditing && (
              <div className="absolute left-0 top-0 flex size-full items-center justify-center rounded-full bg-black/50">
                {isLoading ? (
                  <Spinner />
                ) : (
                  // 카메라 아이콘 표시
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

            {/* 추가 정보 영역 - 편집 모드와 조회 모드에서 다르게 표시 */}
            {isEditing ? (
              // 편집 모드: 모든 필드를 그리드로 표시
              <div className="mo:space-y-3 ta:grid ta:grid-cols-2 ta:place-items-center ta:gap-3 pc:space-y-3">
                {renderField('생일', 'birthday')}
                {renderField('별명', 'nickname')}
                {renderField('혈액형', 'bloodType')}
                {renderField('국적', 'nationality')}
                {renderField('가족관계', 'family')}
                {renderField('자기소개', 'content')}
              </div>
            ) : (
              // 조회 모드: PC와 모바일/태블릿에서 다르게 표시
              <>
                {/* 모바일/태블릿용 펼침/접힘 섹션 */}
                <div className="pc:hidden">
                  {!isExpanded ? (
                    // 접힌 상태: 펼치기 버튼
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
                    // 펼친 상태: 추가 정보와 접기 버튼
                    <div>
                      <div className="space-y-3">
                        {renderField('SNS 계정', 'sns')}
                        {renderField('생일', 'birthday')}
                        {renderField('별명', 'nickname')}
                        {renderField('혈액형', 'bloodType')}
                        {renderField('국적', 'nationality')}
                      </div>
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
