import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("api/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="registerContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <br />
        <span>Журнал путешествий</span>
      </div>
      <span className="containerSpan">Регистрация</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <input autoFocus placeholder="Имя пользователя" ref={usernameRef} />
        <input type="email" placeholder="Адрес электронной почты" ref={emailRef} />
        <input
          type="password"
          min="6"
          placeholder="Пароль"
          ref={passwordRef}
        />
        <button className="registerBtn" type="submit">
          Зарегистрироваться
        </button>
        {success && (
          <span className="success">Успешная регистрация! Войдите в аккаунт.</span>
        )}
        {error && <span className="failure">Что-то пошло не так. Попробуйте снова.</span>}
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}
