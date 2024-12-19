import { AuthAPI } from '@/services/api/auth';

function authtest() {
  const handleSignUp = async () => {
    try {
      await AuthAPI.signup({
        email: 'apple3@example.com',
        name: 'apple3',
        password: 'password',
        passwordConfirmation: 'password',
      });
      alert('회원가입 성공');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };
  const handleSignIn = async () => {
    try {
      await AuthAPI.signin({
        email: 'apple3@example.com',
        password: 'password',
      });
      alert('로그인 성공');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('로그인 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <button onClick={handleSignUp}>회원가입</button>
      <button onClick={handleSignIn}>로그인</button>
    </div>
  );
}

export default authtest;
