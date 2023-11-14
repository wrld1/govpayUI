import "../styles/Form.css";
import { FC, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../models/validationSchemas";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../assets/icons/EyeFilledIcon";

type FormData = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const submitData = (data: FormData) => {
    console.log("IT WORKED", data);
    const { email, password } = data;

    store
      .login(email, password)
      .then(() => {
        navigate("/users");
        toast.success("Успішно авторизовано");
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        toast.error(error.response.data.message);
        console.log(error.response?.data?.message);
      });
  };

  return (
    <div className="flex min-h-full  flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mx-auto w-96">
        <form
          className="space-y-5 flex flex-col  max-w-xs mx-auto "
          onSubmit={handleSubmit(submitData)}
        >
          <div className="w-full flex flex-col gap-6">
            <Input
              type="email"
              label="Email"
              {...register("email")}
              variant="bordered"
              isInvalid={errors.email && true}
              errorMessage={errors.email && errors.email.message}
              classNames={{
                inputWrapper: [
                  "focus:border-[#50C878]",
                  "bg-white",
                  "group-data-[focused=true]:border-[#50C878]",
                ],
              }}
            />
            <Input
              label="Пароль"
              {...register("password")}
              variant="bordered"
              className="max-w-xs focus:border-opacity-50"
              isInvalid={errors.password && true}
              errorMessage={errors.password && errors.password.message}
              labelPlacement="inside"
              endContent={
                <button
                  className="focus:outline-none self-center"
                  type="button"
                  onClick={() => setIsPassVisible(!isPassVisible)}
                >
                  {isPassVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isPassVisible ? "text" : "password"}
            />
            <Checkbox size="md" className="checked:bg-[#50C878]">
              Запам'ятати мене
            </Checkbox>
            <Button
              type="submit"
              className="bg-[#50C878] hover:border-[1px] border-green-900 font-semibold uppercase"
              isLoading={store.isLoading}
            >
              Увійти
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default observer(LoginForm);
