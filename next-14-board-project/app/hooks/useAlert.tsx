import { toast } from 'react-toastify';

const useAlert = () => {
  const alert = (type: string, message: string) => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'info':
        toast.info(message);
        break;
      default:
        toast.error(message);
        break;
    }
  };
  return (type = 'error', message = '입력 메세지가 없습니다.') =>
    alert(type, message);
};

export default useAlert;
