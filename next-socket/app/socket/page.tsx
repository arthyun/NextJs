'use client';

import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

/* Types */
interface ClientToServerEvents {
  join_room: (roomName: string, callback: () => void) => void;
  message: (roomName: string, msg: string) => void;
  new_message: (msg: string) => void;
}

/* Component */
const Page = () => {
  const socket = useRef<Socket<ClientToServerEvents>>();
  const [display, setDisplay] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [msgList, setMsgList] = useState<string[]>([]);

  /* Side Effect */
  useEffect(() => {
    /* Socket 연결 */
    socket.current = io('http://localhost:4000');
    /* Socket 이벤트 */
    socket.current.on('message', (roomName, msg) => {
      // console.log('방: ', roomName);
      // console.log('메세지: ', msg);
      setMsgList((prev) => [...prev, `Another: ${msg}`]);
    });

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
  };

  return (
    <section>
      <h1>Chat</h1>

      {!display ? (
        <article>
          <h1>Join Room</h1>
          <form onSubmit={onSubmitJoinRoom}>
            <input
              className='text-red-400'
              type='text'
              placeholder='Room name'
              required
              value={roomName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
            />
            <button type='submit'>Send</button>
          </form>
        </article>
      ) : (
        <article>
          <h1>Send Message</h1>
          <form onSubmit={onSubmitSendMessage}>
            <input
              className='text-red-400'
              type='text'
              placeholder='Send Message'
              required
              value={message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
            />
            <button type='submit'>Send</button>
          </form>
          <ul className='messageArea'>
            {msgList.length > 0
              ? msgList.map((list, index) => {
                  return <li key={index}>{list}</li>;
                })
              : null}
          </ul>
        </article>
      )}
    </section>
  );
};

export default Page;
