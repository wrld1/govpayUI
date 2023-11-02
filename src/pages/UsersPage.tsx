import { useContext, useEffect, useState } from "react";
import { IUser } from "../models/IUser";
import { Context } from "../main";
import UserService from "../service/UserService";

function UsersPage() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <h1>
        {store.isAuth
          ? `Пользователь авторизован ${store.user.email}`
          : "АВТОРИЗУЙТЕСЬ"}
      </h1>
      <h1>
        {store.user.isActivated
          ? "Аккаунт подтвержден по почте"
          : "ПОДТВЕРДИТЕ АККАУНТ!!!!"}
      </h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button className="submit__button" onClick={getUsers}>
          Получить пользователей
        </button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
}

export default UsersPage;
