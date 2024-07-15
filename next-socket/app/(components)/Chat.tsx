'use client';

import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import JoinRoom from './JoinRoom';
import SendMessage from './SendMessage';

/* Types */
interface ClientToServerEvents {
  join_room: (roomName: string, callback: () => void) => void;
  message: (roomName: string, msg: string) => void;
  new_message: (msg: string) => void;
  live: (result: any) => void;
  alarm: (alarm: string) => void;
}

/* Component */
const Chat = () => {
  // States
  const socket = useRef<Socket<ClientToServerEvents>>();
  const [display, setDisplay] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [msgList, setMsgList] = useState<string[]>([]);
  const [alarm, setAlarm] = useState<boolean>(false);

  // Ref
  const scrollableRef = useRef<HTMLUListElement | null>(null);

  /* Side Effect */
  useEffect(() => {
    /* Socket 연결 */
    socket.current = io('http://localhost:4000');
    /* Socket 이벤트 */
    socket.current.on('message', (roomName, msg) => {
      setMsgList((prev) => [...prev, `Another: ${msg}`]);
      setAlarm(() => true); // 새 메세지가 도착하여 알림을 띄움
    });
    socket.current.on('alarm', (alarm) => {
      console.log(alarm);
      setMsgList((prev) => [...prev, `All: ${alarm}`]);
    });

    // // 테스트
    // socket.current.on('live', (result) => {
    //   console.log(result);
    // });

    /* 화면 이동 시 Socket 연결 끊기 */
    return () => {
      if (socket.current !== undefined) {
        socket.current.disconnect();
      }
    };
  }, []);

  /* Form Events */
  const onSubmitJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket.current !== null && socket.current !== undefined) {
      socket.current.emit('join_room', roomName, () => {
        setDisplay(!display);
      });
      // setRoomName(''); // 여기서 초기화 해버리면 다른 이벤트에서 roomName을 참조 불가
    }
  };

  const onSubmitSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket.current !== null && socket.current !== undefined) {
      socket.current.emit('message', roomName, message);
      setMsgList((prev) => [...prev, `You: ${message}`]);
      setMessage(''); // 모두 작동 후 초기화
    }
    // 채팅 보낼때마다 스크롤 하단으로..
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  };

  return (
    <section className=''>
      <h1 className='font-bold text-3xl text-center'>
        <code>Welcome to Chat Service!</code>
      </h1>
      {!display ? (
        <JoinRoom onSubmitJoinRoom={onSubmitJoinRoom} roomName={roomName} setRoomName={setRoomName} />
      ) : (
        <SendMessage
          alarm={alarm}
          setAlarm={setAlarm}
          onSubmitSendMessage={onSubmitSendMessage}
          message={message}
          setMessage={setMessage}
          msgList={msgList}
          scrollableRef={scrollableRef}
        />
      )}
    </section>
  );
};

export default Chat;
