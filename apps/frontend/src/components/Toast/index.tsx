import { useEffect } from "react";

export const Toast = ({
  message = "Something went wrong.",
  statusCode = 500,
  showToast = false,
}: {
  message?: string;
  statusCode?: number;
  showToast?: boolean;
}) => {
  useEffect(() => {
    showToast = false;
  }, [showToast]);
  if (!showToast) return null;
  return (
    <div className="w-screen flex justify-center fixed bottom-6 z-50">
      <div
        data-testid="toast"
        className={`${
          statusCode >= 300 ? "bg-red-500" : "bg-green-500"
        } text-white border w-fit px-10 py-2 `}>
        {message}
      </div>
    </div>
  );
};
