// HTML에서 Text만 추출하는 함수
export const extractContent = (str: string) =>
  str.replace(/<[^>]*>/g, '').trim();

// 포멧된 날짜 반환하는 함수
export const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}. ${month}. ${day}.`;
};
