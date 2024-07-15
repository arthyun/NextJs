import React, { ChangeEvent, Dispatch, FormEvent, RefObject, SetStateAction } from 'react';

type SendMessageProps = {
  alarm: boolean;
  setAlarm: Dispatch<SetStateAction<boolean>>;
  onSubmitSendMessage: (e: FormEvent<HTMLFormElement>) => void;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  msgList: string[];
  scrollableRef: RefObject<HTMLUListElement>;
};

export default function SendMessage({ alarm, setAlarm, onSubmitSendMessage, message, setMessage, msgList, scrollableRef }: SendMessageProps) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setAlarm(() => false); // 새 메세지가 도착하여 알림을 띄움
  };

  return (
    <article className='bg-white rounded-2xl max-w-[500px] min-h-[450px] mx-auto my-10 p-10 box-border text-[#333] relative'>
      <h1 className='font-bold text-2xl'>채팅방</h1>
      <ul
        ref={scrollableRef}
        className={`messageArea ${
          alarm ? 'border-2 border-red-500 animate-pulse' : ''
        } flex flex-col gap-2 w-full h-[200px] max-h-[200px] rounded-xl mt-4 p-[18px] box-border overflow-y-scroll bg-gray-300`}
      >
        {msgList.length > 0
          ? msgList.map((list, index) => {
              return (
                <li key={index} className={`flex ${list.includes('You') ? 'justify-end' : 'justify-start'} `}>
                  <p
                    className={`${list.includes('All') ? 'w-full text-center' : 'max-w-[180px]'} px-[10px] py-[7px] rounded-2xl break-words ${
                      list.includes('You') ? 'bg-blue-600 text-[#fff]' : 'bg-white text-[#333]'
                    }`}
                  >
                    {list.includes('You') ? list.substring(5) : list.includes('All') ? list.substring(5) : list.substring(9)}
                  </p>
                </li>
              );
            })
          : null}
      </ul>
      <form onSubmit={onSubmitSendMessage} className='w-10/12 absolute bottom-8 left-1/2 translate-x-[-50%]'>
        <input
          className='w-full text-black border-[1px] border-black bg-transparent my-[12px] p-[10px] box-border rounded-xl text-lg'
          type='text'
          placeholder='Send Message'
          required
          value={message}
          onChange={onChange}
        />
        <button type='submit' className='w-full bg-blue-600 text-white p-[10px] box-border rounded-xl font-bold text-xl'>
          Send
        </button>
      </form>
    </article>
  );
}
