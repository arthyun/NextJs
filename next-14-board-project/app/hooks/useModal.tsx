export default function useModal() {
  const open = () => {
    console.log('open modal');
  };

  const close = () => {
    console.log('close modal');
  };

  return { open, close };
}
