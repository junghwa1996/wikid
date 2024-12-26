import Image from 'next/image';
import { UserProfileProps } from 'types/profile';
import { useProfileImage } from '@/hooks/useProfileImage';
import { useExpandedState } from '@/hooks/useExpandedState';

import InputField from './Input';

function UserProfile({
  data,
  isEditing = false,
  onDataChange,
}: UserProfileProps) {
  const { isExpanded, toggleExpand } = useExpandedState();
  const {
    isLoading,
    previewImage,
    fileInputRef,
    handleImageClick,
    handleFileChange,
  } = useProfileImage((url) => onDataChange('image', url));

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
    <div className="mx-auto max-w-4xl rounded-custom bg-white shadow-custom dark:bg-gray-600 dark:shadow-custom-dark mo:w-11/12 ta:w-11/12 pc:w-[400px] pc:p-7 tamo:p-5">
      <div
        className={`flex ${isEditing ? 'flex-col' : 'flex-col mo:flex-row ta:flex-row pc:flex-col'} pc:items-center`}
      >
        <div
          className={`flex items-center justify-center tamo:pt-4 ${isEditing ? '' : 'mo:self-start ta:self-start'}`}
        >
          <button
            onClick={handleImageClick}
            className="relative flex size-fit cursor-pointer"
            type="button"
            disabled={isLoading}
          >
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
            {isEditing && (
              <div className="absolute left-0 top-0 flex size-full items-center justify-center rounded-full bg-black/50">
                {isLoading ? (
                  <div className="size-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload profile image"
          />
        </div>

        <div
          className={`${isEditing ? 'mt-4 mo:justify-center' : 'mo:ml-4 mo:flex-1 ta:ml-4 ta:flex-1 pc:mt-4'} mt-6 pc:w-full`}
        >
          <div className="space-y-3">
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

            {isEditing ? (
              <div className="mo:space-y-3 ta:grid ta:grid-cols-2 ta:place-items-center ta:gap-3 pc:space-y-3">
                {renderField('생일', 'birthday')}
                {renderField('별명', 'nickname')}
                {renderField('혈액형', 'bloodType')}
                {renderField('국적', 'nationality')}
                {renderField('가족관계', 'family')}
                {renderField('자기소개', 'content')}
              </div>
            ) : (
              <>
                <div className="pc:hidden">
                  {!isExpanded ? (
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
