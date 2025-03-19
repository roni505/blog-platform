'use client'

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ToastContainer,toast } from "react-toastify";

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    const loadingToast = toast.loading("Logging you out...");

    setTimeout(() => {
      localStorage.removeItem("token");
      toast.update(loadingToast, {
        render: "Logged out successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        onClose: () => router.push("/")
      });
    }, 2000);
  };

  return (
    <div >
      <button>
        <LogOut 
        size={24}
        onClick={handleLogout}
        color="#A10000"
        strokeWidth={2}
        />
        </button>
        <ToastContainer position="bottom-right"/>
    </div>
  );
};

export default Logout;
