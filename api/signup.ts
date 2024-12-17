interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

interface SignupResponse {
  success: boolean;
  message?: string;
}

export const getSignupData = async (
  data: SignupRequest
): Promise<SignupResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          passwordConfirmation: data.password, // 비밀번호 확인 필드 추가
        }),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: '서버 오류가 발생했습니다.',
    };
  }
};
