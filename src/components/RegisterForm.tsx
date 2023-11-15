import { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../models/validationSchemas";
import { Button, Input, Link } from "@nextui-org/react";
import PasswordInput from "./PasswordInput";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: FC = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });

  const submitData = (data: FormData) => {
    console.log("IT WORKED", data);
    const { email, password } = data;

    store
      .registration(email, password)
      .then(() => {
        navigate("/sign-in");
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        console.log(error.response?.data?.message);
      });
  };

  return (
    <div className="flex min-h-full  flex-col justify-center px-6 py-6 lg:px-8">
      <div className="mx-auto w-96">
        <form
          className="space-y-5 flex flex-col  max-w-xs mx-auto "
          onSubmit={handleSubmit(submitData)}
        >
          <div className="w-full flex flex-col gap-6">
            <Input
              classNames={{ inputWrapper: ["bg-white"] }}
              type="email"
              label="Email"
              {...register("email")}
              variant="bordered"
              isInvalid={errors.email && true}
              errorMessage={errors.email && errors.email.message}
            />
            <PasswordInput
              label="Пароль"
              register={register("password")}
              isInvalid={errors.password && true}
              error={errors.password && errors.password.message}
            />
            <PasswordInput
              label="Підтвердіть пароль"
              register={register("confirmPassword")}
              isInvalid={errors.confirmPassword && true}
              error={errors.confirmPassword && errors.confirmPassword.message}
            />
            <div className="flex justify-start items-center gap-1">
              <span className="inline-block">Вже маєте акаунт?</span>
              <Link
                isBlock
                showAnchorIcon
                href="/sign-in"
                // className="text-links"
                color="primary"
              >
                Увійти
              </Link>
            </div>
            <Button
              type="submit"
              className="bg-[#50C878] hover:border-[1px] border-green-900 font-semibold uppercase shadow-lg text-base"
              isLoading={store.isLoading}
            >
              Зареєструватись
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default observer(RegisterForm);
