import { CustomizedButton } from '../../components/button/Button'
import { ChangeEvent, FormEvent, useState } from 'react';
import Form from '../../modules/form/Form';
import Input from '../../components/input/Input';

import './styles.less';
import Link from '../../components/link';
import { validateForm } from '../../utils/formValidation';
import { login } from '../../services/auth';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setuUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    interface LoginData {
      login: string,
      password: string
    };

    const loginData: LoginData = {
      login: username,
      password: password,
    }

    const loginError = validateForm({ type: 'login', value: username });
    setuUsernameError(loginError);

    const passwordError = validateForm({ type: 'password', value: password });
    setPasswordError(passwordError);

    if (!loginError && !passwordError) {
      login(loginData);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = (e.currentTarget as HTMLInputElement).value
    const fieldName = (e.currentTarget as HTMLInputElement).id

    if (fieldName === 'username') {
      setUsername(value);
      setuUsernameError(validateForm({ type: 'login', value }));
    }
    else if (fieldName === 'password') {
      setPassword(value);
      setPasswordError(validateForm({ type: 'password', value }));
    }
  }

  return (
    <main className="page login-page">
      <Form
        title="Вход"
        onSubmit={handleSubmit}
        body={
          <div>
            <Input
              id="username"
              placeholder="Введите логин"
              onChange={handleChange}
              isError={usernameError ? true : false}
              helperText={usernameError}
              value={username} />
            <Input
              id="password"
              placeholder="Введите пароль"
              onChange={handleChange}
              isError={passwordError ? true : false}
              helperText={passwordError}
              value={password} />
          </div>
        }
        actions={
          <>
            <CustomizedButton text={<span>Авторизация</span>} onClick={handleSubmit} />
            <Link href="/registration" text="Нет аккаунта?" />
          </>
        }
      />
    </main>
  )
}

export default Login
