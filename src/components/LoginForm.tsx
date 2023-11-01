import "../App.css";
import { FC, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  return (
    <div className="flex flex-column mr-x-auto w-full login__form">
      <input
        className="input__field"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <input
        className="input__field"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Пароль"
      />
      <button
        className="submit__button"
        onClick={() => store.login(email, password)}
      >
        Увійти
      </button>
      <button
        className="submit__button"
        onClick={() => store.registration(email, password)}
      >
        Реєстрація
      </button>
    </div>
  );
};

export default observer(LoginForm);
