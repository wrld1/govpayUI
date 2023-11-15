import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { EyeSlashFilledIcon } from "../assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../assets/icons/EyeFilledIcon";

interface PasswordInputProps {
  label: string;
  isInvalid: boolean | undefined;
  register?: UseFormRegisterReturn;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  register,
  isInvalid,
  error,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      label={label}
      {...register}
      variant="bordered"
      isInvalid={isInvalid}
      errorMessage={error}
      labelPlacement="inside"
      classNames={{ inputWrapper: ["bg-white"] }}
      endContent={
        <button
          className="focus:outline-none self-center"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs focus:border-opacity-50"
    />
  );
};

export default PasswordInput;
