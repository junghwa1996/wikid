export interface Profile {
  updatedAt: string;
  securityQuestion: string;
  teamId: string;
  content: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
}

export interface ProfileAnswer extends Profile {
  securityAnswer: string;
}

export interface UserProfileProps {
  data: Profile;
  isEditing?: boolean;
  onDataChange: (field: keyof Profile, value: string) => void;
}
