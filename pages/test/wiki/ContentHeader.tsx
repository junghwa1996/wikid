import InputField from '@/components/Input';
import LinkBar from '@/components/LinkBar';

interface ContentHeaderProps {
  name: string;
  link: string;
  onNameChange: (value: string) => void;
  isEditing: boolean;
}

/**
 * Content 컴포넌트의 헤더에 해당하는 컴포넌트
 * @param name 위키문서의 이름
 * @param link 위키문서의 링크
 * @param onNameChange 이름이 변경될 때 호출되는 콜백 함수
 * @param isEditing 편집 모드인지 여부
 */

export default function ContentHeader({
  name,
  link,
  onNameChange,
  isEditing,
}: ContentHeaderProps) {
  return (
    <div>
      <div className="mb-[10px] flex items-center justify-between text-40b">
        {isEditing ? (
          <InputField
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        ) : (
          <span>{name}</span>
        )}
      </div>
      {!isEditing && <LinkBar link={link} />}
    </div>
  );
}
