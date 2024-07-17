'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Types
type Controller = {
  [key: string]: boolean;
};

type ClientSocketTypes = {
  join_room: (roomName: string) => void;
  welcome: () => void;
  offer: (offer: RTCSessionDescriptionInit, roomName: string) => void;
  answer: (answer: RTCSessionDescriptionInit, roomName: string) => void;
  ice: (iceData: any, roomName: string) => void;
};

const Video = () => {
  // states
  const [controller, setController] = useState<Controller>({
    audio: false,
    video: false
  });
  const socket = useRef<Socket<ClientSocketTypes>>();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const peerFaceRef = useRef<HTMLVideoElement | null>(null);
  const myStream = useRef<MediaStream | undefined>(undefined);
  const myPeerConnection = useRef<RTCPeerConnection | undefined>(undefined);
  const [anotherDevices, setAnotherDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | undefined>(undefined);

  // init video
  const getMedia = useCallback(async (deviceId?: string) => {
    const initialConstrains = {
      audio: true,
      video: { facingMode: 'user' }
    };
    const cameraConstrains = {
      audio: true,
      video: { deviceId: { exact: deviceId } }
    };
    myStream.current = await navigator.mediaDevices.getUserMedia(deviceId ? cameraConstrains : initialConstrains);
    if (videoRef && videoRef.current) {
      videoRef.current.srcObject = myStream.current;
    }

    // 최초 한번만 실행되게
    if (!deviceId) {
      await getCameras();
    }
    makeConnection(); // peerConnection 연결부
  }, []);

  // ICE candidate
  const handleIce = (iceData: any) => {
    // A, B 서로 candidate 데이터를 주고 받아야한다.
    if (socket.current !== undefined && iceData.candidate) {
      socket.current.emit('ice', iceData.candidate, roomName);
    }
  };
  const handleAddStream = (data: any) => {
    if (peerFaceRef.current !== null) peerFaceRef.current.srcObject = data.stream;
    // peerFaceRef.current.srcObject = data.streams[0]; // addstream 안됄때
  };

  const makeConnection = () => {
    // RTC 연결문
    myPeerConnection.current = new RTCPeerConnection();
    myPeerConnection.current.addEventListener('addstream', handleAddStream);
    // myPeerConnection.current.addEventListener('icecandidate', handleIce); // 이걸 키면 카메라 안들어오는 오류...

    myStream.current?.getTracks().forEach((track) => {
      myPeerConnection.current?.addTrack(track, myStream.current as MediaStream);
    });
  };

  // find another video inputs
  const getCameras = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const defineVideoDevices = devices.filter((item) => item.kind === 'videoinput');
    setAnotherDevices(defineVideoDevices);

    // select default value
    if (myStream.current?.getVideoTracks()[0].label === defineVideoDevices[0].label) {
      setSelectedDeviceId(defineVideoDevices[0].deviceId);
    }
  };

  // mute audio
  const muteHandler = () => {
    if (myStream && myStream.current) {
      const audioTracks: MediaStreamTrack[] = myStream.current.getAudioTracks();
      audioTracks.forEach((track) => (track.enabled = !track.enabled));
      setController((prev) => ({
        ...prev,
        audio: !prev.audio
      }));
    }
  };

  // turn on/off camera
  const cameraHandler = () => {
    if (myStream && myStream.current) {
      const videoTracks: MediaStreamTrack[] = myStream.current.getVideoTracks();
      videoTracks.forEach((track) => (track.enabled = !track.enabled));
      setController((prev) => ({
        ...prev,
        video: !prev.video
      }));
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  /* socket.io-client */
  let roomName = '테스트방';

  useEffect(() => {
    // 연결
    socket.current = io('http://localhost:4000');
    // 이벤트들
    socket.current.emit('join_room', roomName);

    //////////////////////////////////////////////////
    // 1. A에서 동작
    socket.current.on('welcome', async () => {
      if (myPeerConnection.current !== undefined) {
        const offer = await myPeerConnection.current.createOffer();
        myPeerConnection.current.setLocalDescription(offer);
        socket.current?.emit('offer', offer, roomName);
      }
      console.log('Sent Offer.');
    });

    // 2. B에서 동작
    socket.current.on('offer', async (offer, roomName) => {
      console.log('Receive Offer.');
      if (myPeerConnection.current !== undefined) {
        myPeerConnection.current.setRemoteDescription(offer);
        const answer = await myPeerConnection.current.createAnswer();
        myPeerConnection.current.setLocalDescription(answer);
        if (socket.current !== undefined) {
          socket.current.emit('answer', answer, roomName);
        }
      }
      console.log('Send Answer.');
    });

    // 3. 다시 A에서 동작
    socket.current.on('answer', (answer) => {
      if (myPeerConnection.current !== undefined) {
        return myPeerConnection.current.setRemoteDescription(answer);
      }
    });

    // 4. A, B 모두 iceCandidate 수신
    socket.current.on('ice', (ice) => {
      if (myPeerConnection.current !== undefined) {
        return myPeerConnection.current.addIceCandidate(ice);
      }
    });
    //////////////////////////////////////////////////

    // 연결끊기
    return () => {
      //   if (socket.current !== null && socket.current !== undefined) {
      socket.current?.off();
      //   }
    };
  }, [myPeerConnection.current]);

  return (
    <section>
      <h3 className='text-3xl font-bold mb-4'>Video Room</h3>
      <video ref={videoRef} autoPlay playsInline></video>
      <div className='btnGroup flex gap-2 my-4'>
        <select value={selectedDeviceId}>
          {anotherDevices?.map((item) => {
            return (
              <option key={item.deviceId} value={item.deviceId}>
                {item.label}
              </option>
            );
          })}
        </select>
        <button type='button' className='text-lg font-bold border-2 border-black p-2 box-border hover:bg-red-500' onClick={muteHandler}>
          {controller.audio ? 'UnMute' : 'Mute'}
        </button>
        <button type='button' className='text-lg font-bold border-2 border-black p-2 box-border hover:bg-red-500' onClick={cameraHandler}>
          {controller.video ? 'Camera On' : 'Camera Off'}
        </button>
      </div>
      <video ref={peerFaceRef} autoPlay playsInline></video>
    </section>
  );
};

export default Video;
