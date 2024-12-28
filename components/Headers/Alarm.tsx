// import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';
// import NotificationBox from '../Notification/NorificationBox';
// import useOutsideClick from '@/hooks/useOutsideClick';
// import instance from '@/lib/axios-client';
// import { useSnackbar } from 'context/SnackBarContext';

// interface AlarmProps {
//   isLoggedIn: boolean;
// }

// export interface NotificationProps {
//   totalCount: number;
//   list: {
//     createdAt: Date;
//     content: string;
//     id: number;
//   }[];
// }

// /**
//  * 알림 컴포넌트
//  * @param isLoggedIn 로그인 여부 판별
//  */

// export default function Alarm({ isLoggedIn }: AlarmProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [notification, setNotification] = useState<
//     NotificationProps | undefined
//   >();
//   const { showSnackbar } = useSnackbar();
//   const handleAlarmOpen = () => setIsOpen(true);
//   const notificationRef = useRef<HTMLDivElement>(null);

//   useOutsideClick(notificationRef, () => setIsOpen(false));

//   useEffect(() => {
//     const getNotification = async () => {
//       const accessToken = localStorage.getItem('accessToken');
//       try {
//         const noti = await instance.get('/notifications?pages=1&pageSize=99', {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         setNotification(noti.data);
//       } catch {
//         showSnackbar('오류가 발생했습니다', 'fail');
//       }
//     };
//     if (isLoggedIn || isOpen) {
//       getNotification();
//     }
//   }, [isLoggedIn, isOpen, showSnackbar]);

//   if (!isLoggedIn) {
//     return null;
//   }

//   return (
//     <div className="relative" ref={notificationRef}>
//       <button onClick={handleAlarmOpen}>
//         <Image
//           src="/icon/icon-alarm.svg"
//           className="mo:hidden"
//           alt="알림 아이콘"
//           width={32}
//           height={32}
//         />
//       </button>

//       {isOpen && (
//         <NotificationBox
//           onClose={() => setIsOpen(false)}
//           content={notification}
//           setNotification={setNotification}
//         />
//       )}
//     </div>
//   );
// }

import Image from 'next/image';
import { useState } from 'react';
import NotificationWrapper from '@/components/Notification/NotificationWrapper';

interface AlarmProps {
  isLoggedIn: boolean;
}

export default function Alarm({ isLoggedIn }: AlarmProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleAlarmOpen = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  };
  const handleAlarmClose = () => setIsOpen(false);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="relative">
      <button onClick={handleAlarmOpen}>
        <Image
          src="/icon/icon-alarm.svg"
          className="mo:hidden"
          alt="알림 아이콘"
          width={32}
          height={32}
        />
      </button>

      <NotificationWrapper isOpen={isOpen} onClose={handleAlarmClose} />
    </div>
  );
}
