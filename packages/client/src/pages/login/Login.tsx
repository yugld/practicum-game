import { ChangeEvent, FormEvent, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';
import { CustomizedButton } from '../../components/button/Button';
import Input from '../../components/input/Input';
import Link from '../../components/link';
import Form from '../../modules/form/Form';
import { validateForm } from '../../utils/formValidation';
import { useAuthentification } from '../../utils/useAuthentification';
import { useAppDispatch } from '../../store/store';
import { getUser, signinUser } from '../../store/userSlice';
import { getServiceId } from '../../store/oAuthSlice';

import './styles.less';

const Login = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setuUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

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
      dispatch(signinUser(loginData))
        .then(unwrapResult)
        .then(() => dispatch(getUser()))
        .catch((reason) => setFormError(reason));
    }
  }

  function handleYandexLogin(e: FormEvent) {
    e.preventDefault();
    dispatch(getServiceId());
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormError('');
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

  if (useAuthentification()) {
    return <Navigate replace to="/rooms" />;
  } else {
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
              {formError && <span className='form-error'>{formError}</span>}
            </div>
          }
          actions={
            <>
              <CustomizedButton text={<span>Авторизация</span>} onClick={handleSubmit} />
              <CustomizedButton text={<span>Войти через Яндекс ID</span>} onClick={handleYandexLogin} />
              <Link href="/registration" text="Нет аккаунта?" />
            </>
          }
        />
      </main>
    )
  }
}

export default Login
