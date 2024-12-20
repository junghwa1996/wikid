import instance from '@/lib/axios-client';
import { AuthAPI } from '@/services/api/auth';
import { ProfileAPI } from '@/services/api/profileAPI';

const ApiTest = () => {
  const handleSignUp = async () => {
    try {
      await AuthAPI.signup({
        email: 'apple4@example.com',
        name: 'apple4',
        password: 'password',
        passwordConfirmation: 'password',
      });
      alert('회원가입 성공');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleSignIn = async () => {
    try {
      await AuthAPI.signin({
        email: 'apple4@example.com',
        password: 'password',
      });
      alert('로그인 성공');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    alert('로그아웃 완료');
  };

  const handlePostprofile = async () => {
    try {
      await ProfileAPI.createProfile({
        securityAnswer: 'securityAnswer',
        securityQuestion: 'securityQuestion',
      });
      alert('프로필 생성 성공');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleGetprofiles = async () => {
    try {
      const profiles = await ProfileAPI.getProfiles();
      console.log('프로필 목록:', profiles);
      alert('프로필 목록 조회 성공 - 콘솔 확인');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleGetArticleDetail = async () => {
    try {
      const res = await instance.get('/articles/1325');
      console.log('게시글 상세 조회:', res.data);
      alert('게시글 상세 조회 성공 - 콘솔 확인');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleGetArticleComments = async () => {
    try {
      const res = await instance.get('/articles/1325/comments?limit=1');
      console.log('게시글 댓글 조회:', res.data);
      alert('게시글 댓글 조회 성공 - 콘솔 확인');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 pt-40">
      <button onClick={handleSignUp}>회원가입</button>
      <button onClick={handleSignIn}>로그인</button>
      <button onClick={handleLogout}>로그아웃(토큰 삭제)</button>
      <hr />
      <button onClick={handlePostprofile}>프로필 생성(토큰 필요)</button>
      <button onClick={handleGetprofiles}>프로필 목록 조회(토큰 불필요)</button>
      <button onClick={handleGetArticleDetail}>
        게시글 상세 조회(토큰 불필요)
      </button>
      <button onClick={handleGetArticleComments}>
        게시글 댓글 조회(토큰 불필요)
      </button>
    </div>
  );
};

export default ApiTest;
