import { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const { store } = useContext(Context);

  const navigate = useNavigate();

  const onFinish = (values: FormValues) => {
    console.log("Received values of form: ", values);
    const { email, password } = values;

    store
      .login(email, password)
      .then(() => {
        navigate("/users");
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        toast.error(error.response?.data?.message);
      });
  };

  // const handleLogin = () => {
  //   if (!email) {
  //     setEmailError("Email is required");
  //     return;
  //   }
  //   if (!password) {
  //     setPasswordError("Password is required");
  //     return;
  //   }
  // };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Увійти в акаунт
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon py-2" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon py-2" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <div className="flex gap-2  items-center">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button rounded-md bg-indigo-600 px-3  text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 block my-0"
              >
                Log in
              </Button>
              Або <a href="/sign-up">зареєструватися зараз!</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default observer(LoginForm);
