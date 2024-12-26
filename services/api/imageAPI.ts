import instance from '@/lib/axios-client';

// 이미지 업로드 응답 데이터 타입 정의
interface ImageResponse {
  url: string;
}

// 이미지 업로드 요청
export const createImageUpload = async (
  formdata: FormData
): Promise<ImageResponse> => {
  const { data } = await instance.post<ImageResponse>(
    '/images/upload',
    formdata,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
};
