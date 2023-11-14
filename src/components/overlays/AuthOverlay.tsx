import React, { ReactNode } from "react";
import { observer } from "mobx-react-lite";

type AuthOverlayProps = {
  children: ReactNode;
  pageType: "login" | "register"; // Assuming pageType can only be "login" or "register"
};

const AuthOverlay: React.FC<AuthOverlayProps> = ({ children, pageType }) => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-filler ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {pageType === "login"
            ? "Увійдіть в акаунт"
            : "Зареєструйте свій акаунт"}
        </h2>
      </div>
      {children}
    </div>
  );
};

export default observer(AuthOverlay);
