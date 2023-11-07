import toast from "react-hot-toast";

export const errorMassage = (message) => {
  toast.error(message, {
    style: {
      fontSize: "16px",
      background: "#333",
      color: "#fff",
      textAlign: "center",
    },
  });
};

export const successMassage = (message) => {
  toast.success(message, {
    style: {
      fontSize: "16px",
      background: "#333",
      color: "#fff",
      textAlign: "center",
    },
  });
};
