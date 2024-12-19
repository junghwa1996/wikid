import { useEffect, useRef, useState } from 'react';

import Button from '@/components/Button';
import TextEditor from '@/components/TextEditor';
import UnsavedChangesModal from '@/components/UnsavedChangesModal';
import WikiQuizModal from '@/components/WikiQuizModal';

import Blank from './Blank';
import ContentHeader from './ContentHeader';
import DisconnectionModal from '@/components/DisconnectionModal';

const QUESTION = '특별히 싫어하는 음식은?';
const ANSWER = '카레';
const NAME = '코드잇';
const LINK = 'https://www.wikid.kr/codeit';
const CONTENT: string | null = null;

export default function Contents() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isUCOpen, setIsUCOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState<string>(CONTENT || '');
  const [newName, setNewName] = useState<string>(NAME);

  const previousContent = useRef<string>(newContent);
  const previousName = useRef<string>(newName);

  const isEmpty = newContent === null || newContent === '';

  const [isDMOpen, setIsDMOpen] = useState(false);

  const onDMClose = () => {
    setIsDMOpen(false);
    setIsEditing(false);
    setNewContent(previousContent.current);
    setNewName(previousName.current);
  };

  const handleQuizSuccess = () => {
    alert('퀴즈를 성공하셨습니다.');
    setIsQuizOpen(false);
    setIsEditing(true);
  };

  const handleContentChange = (value: string) => {
    setNewContent(value);
  };

  const handleNameChange = (value: string) => {
    setNewName(value);
  };

  const saveContent = () => {
    previousContent.current = newContent;
    previousName.current = newName;
    setIsEditing(false);
  };

  const onUCClose = () => {
    setIsUCOpen(false);
    setIsEditing(false);
    setNewContent(previousContent.current);
    setNewName(previousName.current);
  };

  const handleInactivityWarning = () => {
    setIsDMOpen(true);
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
              <UnsavedChangesModal isOpen={isUCOpen} onClose={onUCClose} />
              <Button onClick={saveContent}>저장</Button>
            </div>
          )}
        </div>

        <WikiQuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          securityQuestion={QUESTION}
          securityAnswer={ANSWER}
          onQuizComplete={handleQuizSuccess}
        />
      </div>

      {isEmpty && !isEditing && (
        <Blank
          onQuizSuccess={handleQuizSuccess}
          question={QUESTION}
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

      <DisconnectionModal isOpen={isDMOpen} onClose={onDMClose} />
    </div>
  );
}
