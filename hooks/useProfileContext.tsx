import { useContext } from 'react';

import { ProfileContext } from '../context/ProfileContext';

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('ProfileProvider로 감싸져야 합니다');
  }
  return context;
};
