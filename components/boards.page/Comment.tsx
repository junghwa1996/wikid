import Image from 'next/image';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { CommentType, Writer } from 'types/board';

import dateConversion from '@/utils/dateConversion';

import CommentForm from './CommentForm';

interface CommentProps extends CommentType {
  name: Writer['name'];
  updatedAt: string;
  onclick: { update: (value: string) => void; delete: () => void };
  isOwner: boolean;
  profile: Writer['image'];
}

/**
 * 댓글 컴포넌트
 * @param {string} name - 유저이름
 * @param {string} props.content - 코멘트
 * @param {string} props.date - 날짜
 * @param {object} props.onclick - 수정, 삭제 함수
 * @param {boolean} props.isOwner - 댓글 작성자와 로그인한 사용자가 일치하는지 여부
 */
export default function Comment({
  name = '유저이름',
  content = '코멘트',
  createdAt = '2024-12-19T05:26:36.719Z',
  updatedAt = '2024-12-19T05:26:36.719Z',
  profile = '/icon/icon-profile.svg',
  onclick = { update: () => {}, delete: () => {} },
  isOwner = false,
}: CommentProps) {
  const [value, setValue] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleCancel = () => {
    setValue(content);
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onclick.update(value);
    setIsEditing(false);
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (createdAt !== updatedAt) {
      setIsUpdate(true);
    }
  }, [createdAt, updatedAt]);

  return (
    <div className="bgCard flex items-start gap-5 rounded-custom px-[30px] py-[22px] shadow-custom dark:shadow-custom-dark mo:gap-[15px] mo:px-5 mo:py-4">
      <div className="size-[50px] overflow-hidden rounded-full mo:size-10">
        <Image
          src={profile ? profile : '/icon/icon-profile.svg'}
          alt="user profile"
          width={50}
          height={50}
          className="size-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="mb-[6px] flex items-center justify-between">
          <span className="text-18sb mo:text-16sb">{name}</span>

          {!isEditing && isOwner && (
            <div className="flex items-center gap-5 mo:gap-[15px]">
              <button onClick={handleUpdateClick}>
                <Image
                  src="/icon/icon-write.svg"
                  alt="수정하기"
                  className="mo:size-5"
                  width={20}
                  height={20}
                />
              </button>
              <button onClick={onclick.delete}>
                <Image
                  src="/icon/icon-delete.svg"
                  alt="삭제하기"
                  className="mo:size-5"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          )}
        </div>

        {!isEditing ? (
          <div>
            <p className="mb-[10px] w-full break-all text-16 mo:mb-1 mo:text-14">
              {content}
            </p>
            <span className="mr-2 text-14 text-gray-400 mo:text-12">
              {dateConversion(createdAt)}
            </span>
            {isUpdate && (
              <span className="text-14 text-gray-400 mo:text-12">
                (수정된 댓글)
              </span>
            )}
          </div>
        ) : (
          <CommentForm
            value={value}
            onChange={handleChange}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            update
          />
        )}
      </div>
    </div>
  );
}
