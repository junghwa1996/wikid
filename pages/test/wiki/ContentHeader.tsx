import InputField from '@/components/Input';
import LinkBar from '@/components/LinkBar';

interface ContentHeaderProps {
  name: string;
  link: string;
  onNameChange: (value: string) => void;
  isEditing: boolean;
}

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
