import { toast } from "react-toastify";

export const useNotification = () => {
  const notify = (message: string, type: "success" | "error" = "success") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return { notify };
};
