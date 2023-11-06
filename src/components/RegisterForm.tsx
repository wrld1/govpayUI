import { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { Form, Input, Button } from "antd";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface FormValues {
  email: string;
  password: string;
  confirm: string;
}

const RegisterForm: FC = () => {
  const { store } = useContext(Context);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = (values: FormValues) => {
    console.log("Received values of form: ", values);
    const { email, password } = values;

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

  //   const handleRegistration = () => {
  //     if (!email) {
  //       setEmailError("Email is required");
  //       return;
  //     }
  //     if (!password) {
  //       setPasswordError("Password is required");
  //       return;
  //     }
  //     store.registration(email, password);
  //   };

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

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form
          form={form}
          name="register"
          layout={"vertical"}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          className="w-140"
          //   scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Невірно введений E-mail!",
              },
              {
                required: true,
                message: "Будь ласка, введіть ваш E-mail!",
              },
            ]}
          >
            <Input className="py-1" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Будь ласка, введіть ваш пароль!",
              },
            ]}
            hasFeedback
          >
            <Input.Password className="py-1" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Будь ласка, підтвердіть пароль!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Паролі що ви ввели не співпадають!")
                  );
                },
              }),
            ]}
          >
            <Input.Password className="py-1" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="rounded-md bg-indigo-600 px-3  text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 block my-0"
              style={{ width: "100%" }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default observer(RegisterForm);
