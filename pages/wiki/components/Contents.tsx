import { useEffect, useRef, useState } from 'react';

import Button from '@/components/Button';
import DisconnectionModal from '@/components/Modal/DisconnectionModal';
import UnsavedChangesModal from '@/components/Modal/UnsavedChangesModal';
import WikiQuizModal from '@/components/Modal/WikiQuizModal';
import TextEditor from '@/components/TextEditor';
import instance from '@/lib/axios-client';

import { Profile } from '../[code]';
import Blank from './Blank';
import ContentHeader from './ContentHeader';

//TODO API 연동 후 삭제
const ANSWER = '카레';

//TODO API 연동작업
interface ProfileProps {
  profile?: Profile | null;
}

//TODO 다른 사람이 수정 중이면 수정 금지 기능

export default function Contents({ profile }: ProfileProps) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isInfoSnackBarOpen, setIsInfoSnackBarOpen] = useState(false);
  const [isUCOpen, setIsUCOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDMOpen, setIsDMOpen] = useState(false);
  const [newContent, setNewContent] = useState<string>(profile?.content || '');
  const [newName, setNewName] = useState<string>(profile?.name || '');

  const previousContent = useRef<string>(newContent);
  const previousName = useRef<string>(newName);

  const isEmpty = newContent === null || newContent === '';

  const handleQuizOpen = async () => {
    const res = await instance.get(`/profiles/${profile?.code}/ping`);
    if (res.status === 204) {
      setIsInfoSnackBarOpen(false);
      setIsQuizOpen(true);
    } else {
      setIsInfoSnackBarOpen(true);
    }
  };

  //퀴즈 성공 후 위키 편집모드
  const handleQuizSuccess = () => {
    alert('퀴즈를 성공하셨습니다.');
    setIsQuizOpen(false);
    setIsEditing(true);
  };

  //위키 제목과 내용 편집
  const handleContentChange = (value: string) => {
    setNewContent(value);
  };

  const handleNameChange = (value: string) => {
    setNewName(value);
  };

  //편집된 내용 저장 후 편집모드 종료
  const saveContent = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      try {
        // PATCH 요청을 보내는 코드
        const updatedProfile = {
          content: newContent, // 새로운 내용
        };

        // 프로필 수정 API 호출 ("/profiles/{code}"에 PATCH 요청)
        await instance.patch(`/profiles/${profile?.code}`, updatedProfile);

        // 수정이 완료되면 상태 업데이트
        previousContent.current = newContent;
        setIsEditing(false);
      } catch (error) {
        console.error('프로필을 저장하는 데 실패했습니다.', error);
        // 요청 실패시 오류 처리 추가 (예: 사용자에게 알림)
      }
    } else {
      try {
        // refreshToken이 있을떼(로그인 상태일때)
        const updatedProfile = {
          content: newContent, // 새로운 내용
          //TODO 프로필 컴포넌트 상태 업데이트
        };

        // 프로필 수정 API 호출 ("/profiles/{code}"에 PATCH 요청)
        await instance.patch(`/profiles/${profile?.code}`, updatedProfile);

        // 수정이 완료되면 상태 업데이트
        previousContent.current = newContent;
        setIsEditing(false);
      } catch (error) {
        console.error('프로필을 저장하는 데 실패했습니다.', error);
        // 요청 실패시 오류 처리 추가 (예: 사용자에게 알림)
      }
    }
  };

  //TODO 편집모드에서 수정 중 취소버튼으로 수정 취소하기
  const onUCClose = () => {
    setIsUCOpen(false);
  };

  const closeAndNoSave = () => {
    setIsUCOpen(false);
    setIsEditing(false);
    setNewContent(previousContent.current);
    setNewName(previousName.current);
  };

  //5분동안 미기입시 뒤로가기
  const handleInactivityWarning = () => {
    setIsDMOpen(true);
  };

  //연결 끊김 모달 (수정중인 내용 취소, 기존 내용으로 복구)
  const onDMClose = () => {
    setIsDMOpen(false);
    setIsEditing(false);
    setNewContent(previousContent.current);
    setNewName(previousName.current);
  };

  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout;

    if (isEditing) {
      inactivityTimeout = setTimeout(() => {
        handleInactivityWarning();
      }, 300000);

      const resetInactivityTimer = () => {
        clearTimeout(inactivityTimeout);
        setIsDMOpen(false);
        inactivityTimeout = setTimeout(() => {
          handleInactivityWarning();
        }, 300000);
      };
      window.addEventListener('keydown', resetInactivityTimer);

      return () => {
        clearTimeout(inactivityTimeout);
        window.removeEventListener('keydown', resetInactivityTimer);
      };
    }

    return () => {};
  }, [isEditing]);

  return (
    <div>
      <div className="flex justify-between">
        <ContentHeader
          name={newName}
          link={`https://www.wikid.kr/wiki/${profile?.code}`}
          onNameChange={handleNameChange}
          isEditing={isEditing}
          isInfoSnackBarOpen={isInfoSnackBarOpen}
        />

        <div className="h-[30px]">
          {!isEditing ? (
            !isEmpty && <Button onClick={handleQuizOpen}>위키 수정하기</Button>
          ) : (
            <div className="flex gap-[5px]">
              <Button variant="secondary" onClick={() => setIsUCOpen(true)}>
                취소
              </Button>
              <UnsavedChangesModal
                isOpen={isUCOpen}
                closeAndNoSave={closeAndNoSave}
                onClose={onUCClose}
              />
              <Button onClick={saveContent}>저장</Button>
            </div>
          )}
        </div>

        <WikiQuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          securityQuestion={profile?.securityQuestion || ''}
          securityAnswer={ANSWER}
          onQuizComplete={handleQuizSuccess}
        />
      </div>

      {isEmpty && !isEditing && (
        <Blank
          onQuizSuccess={handleQuizSuccess}
          question={profile?.securityQuestion || ''}
          answer={ANSWER}
        />
      )}

      <div>
        {isEditing ? (
          <>
            <div className="mt-[40px] h-[600px] w-full rounded-md border p-[20px] focus:border-gray-300">
              <TextEditor value={newContent} onChange={handleContentChange} />
            </div>
          </>
        ) : (
          <p
            className="mt-[40px] break-words"
            dangerouslySetInnerHTML={{ __html: newContent }}
          ></p>
        )}
      </div>

      <DisconnectionModal
        isOpen={isDMOpen}
        onClose={onDMClose}
        confirmReset={onDMClose}
      />
    </div>
  );
}
