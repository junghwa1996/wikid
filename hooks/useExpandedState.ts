import { useState } from 'react';

export const useExpandedState = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return {
    isExpanded,
    toggleExpand,
  };
};
