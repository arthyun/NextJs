import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';

type JoinRoomProps = {
  onSubmitJoinRoom: (e: FormEvent<HTMLFormElement>) => void;
  roomName: string;
  setRoomName: Dispatch<SetStateAction<string>>;
};

export default function JoinRoom({ onSubmitJoinRoom, roomName, setRoomName }: JoinRoomProps) {
  return (
    <article className='bg-white rounded-2xl max-w-[500px] min-h-[450px] mx-auto my-10 p-10 box-border text-[#333] relative'>
      <h1 className='font-bold text-2xl mt-4'>참가하기</h1>
      <p className='my-2'>
        <code>참가하고자 하는 방 이름을 입력하거나 상대방이 알려준 방 이름을 입력하세요.</code>
      </p>
      <form onSubmit={onSubmitJoinRoom} className='w-10/12 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
        <input
          className='w-full text-black border-[1px] border-black bg-transparent my-[15px] p-[15px] box-border rounded-xl text-lg'
          type='text'
          placeholder='방 이름을 입력하세요 (Room name).'
          required
          value={roomName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
        />
        <button type='submit' className='w-full bg-blue-600 p-[15px] box-border rounded-xl font-bold text-xl text-white'>
          Send
        </button>
      </form>
    </article>
  );
}
