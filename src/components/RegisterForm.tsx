import { FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { Form, Input, Button } from "antd";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";

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
    store.registration(email, password);
    navigate("/sign-in");
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
    <Form
      form={form}
      name="register"
      layout={"vertical"}
      onFinish={onFinish}
      initialValues={{ remember: true }}
      style={{ maxWidth: 600 }}
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
        <Input />
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
        <Input.Password />
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
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(RegisterForm);
