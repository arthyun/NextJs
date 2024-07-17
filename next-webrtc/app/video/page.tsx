import { Metadata } from 'next';
import Video from './Video';

export const metadata: Metadata = {
  title: 'Video | Next App'
};

export default function Page() {
  return (
    <>
      <Video />
    </>
  );
}
