import { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: FC = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const schema: ZodType<FormData> = z
    .object({
      email: z.string().email(),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
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
        toast.error(error.response?.data?.message);
        console.log(error.response?.data?.message);
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Зареєструйте свій акаунт
        </h2>
      </div>

      <div className="mx-auto w-96">
        <form
          className="space-y-5 flex flex-col  max-w-xs mx-auto"
          onSubmit={handleSubmit(submitData)}
        >
          <div className="form-control w-full flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Введіть вашу пошту</span>
              {errors.email && (
                <span className="label-text-alt text-red-600">
                  {" "}
                  {errors.email.message}
                </span>
              )}
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="yourmail@mail.com"
              className="input input-bordered w-full border-purple-600"
            />
            <label className="label">
              <span className="label-text">Введіть ваш пароль</span>
              {errors.password && (
                <span className="label-text-alt text-red-600">
                  {" "}
                  {errors.password.message}
                </span>
              )}
            </label>
            <input
              type="password"
              placeholder="asd2@21"
              {...register("password")}
              className="input input-bordered w-full border-purple-600"
            />
            <label className="label">
              <span className="label-text">Підтвердіть ваш пароль</span>
              {errors.confirmPassword && (
                <span className="label-text-alt text-red-600">
                  {" "}
                  {errors.confirmPassword.message}
                </span>
              )}
            </label>
            <input
              type="password"
              placeholder="asd2@21"
              {...register("confirmPassword")}
              className="input input-bordered w-full border-purple-600"
            />
            <button
              type="submit"
              className="btn btn-primary mt-2 border-purple-600"
            >
              Зареєструватись
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default observer(RegisterForm);
