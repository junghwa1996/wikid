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
const LINK = 'https://www.wikid.kr/codeit';

//TODO API 연동작업

interface ProfileProps {
  profile?: Profile | null;
}

//TODO 다른 사람이 수정 중이면 수정 금지 기능

export default function Contents({ profile }: ProfileProps) {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isUCOpen, setIsUCOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDMOpen, setIsDMOpen] = useState(false);
  const [newContent, setNewContent] = useState<string>(profile?.content || '');
  const [newName, setNewName] = useState<string>(profile?.name || '');

  const previousContent = useRef<string>(newContent);
  const previousName = useRef<string>(newName);

  const isEmpty = newContent === null || newContent === '';

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
    try {
      // PATCH 요청을 보내는 코드
      const updatedProfile = {
        content: newContent, // 새로운 내용
        name: newName, // 새로운 이름
      };

      // 프로필 수정 API 호출 ("/profiles/{code}"에 PATCH 요청)
      await instance.patch(`/profiles/${profile?.code}`, updatedProfile);

      // 수정이 완료되면 상태 업데이트
      previousContent.current = newContent;
      previousName.current = newName;
      setIsEditing(false);
    } catch (error) {
      console.error('프로필을 저장하는 데 실패했습니다.', error);
      // 요청 실패시 오류 처리 추가 (예: 사용자에게 알림)
    }
  };

  //TODO 편집모드에서 수정 중 취소버튼으로 수정 취소하기 (현재 모달을 닫기만 하면 수정이 취소되는 오류있음)
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
          link={LINK}
          onNameChange={handleNameChange}
          isEditing={isEditing}
        />

        <div className="h-[30px]">
          {!isEditing ? (
            !isEmpty && (
              <Button onClick={() => setIsQuizOpen(true)}>위키 수정하기</Button>
            )
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
            <div className="mt-[40px] h-[600px] w-full">
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
