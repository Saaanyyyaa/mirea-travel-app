import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";

export default function Login({ setShowLogin, setCurrentUsername,myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/api/users/login", user);
      setCurrentUsername(res.data.username);
      myStorage.setItem('user', res.data.username);
      setShowLogin(false)
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <br />
        <span>Журнал путешествий</span>
      </div>
      <span className="containerSpan">Вход в систему</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <input autoFocus placeholder="Имя пользователя" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="Пароль"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Войти
        </button>
        {error && <span className="failure">Что-то пошло не так. Попробуйте снова.</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
