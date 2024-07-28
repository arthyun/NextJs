import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Detail | Next App',
  description: 'Made by arthyun'
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  return <main className='p-24 box-border'>{children}</main>;
};

export default layout;
