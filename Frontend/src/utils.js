import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
  toast.success(msg, {
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false, // 🔥 FIX
    theme: 'colored',
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false, // 🔥 FIX
    theme: 'colored',
  });
};
