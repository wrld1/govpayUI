import { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";

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
    store.login(email, password);
    navigate("/users");
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
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default observer(LoginForm);
