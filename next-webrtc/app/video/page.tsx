'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

// Types
type Controller = {
  [key: string]: boolean;
};

const Video = () => {
  // states
  const [controller, setController] = useState<Controller>({
    audio: false,
    video: false
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const myStream = useRef<MediaStream | undefined>(undefined);

  // init video
  const getMedia = useCallback(async () => {
    const constraints = {
      audio: true,
      video: {
        deviceId: '55c6cc49-d922-4b9c-aa9f-72813d6ec288'
      }
    };
    myStream.current = await navigator.mediaDevices.getUserMedia(constraints);
    if (videoRef && videoRef.current) {
      videoRef.current.srcObject = myStream.current;
    }
  }, [myStream]);

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
  }, [getMedia]);

  return (
    <section>
      <h3 className='text-3xl font-bold mb-4'>Video Room</h3>
      <video ref={videoRef} autoPlay playsInline></video>
      <div className='btnGroup flex gap-2 my-4'>
        <button type='button' className='text-lg font-bold border-2 border-black p-2 box-border hover:bg-red-500' onClick={muteHandler}>
          {controller.audio ? 'UnMute' : 'Mute'}
        </button>
        <button type='button' className='text-lg font-bold border-2 border-black p-2 box-border hover:bg-red-500' onClick={cameraHandler}>
          {controller.video ? 'Camera On' : 'Camera Off'}
        </button>
      </div>
    </section>
  );
};

export default Video;
