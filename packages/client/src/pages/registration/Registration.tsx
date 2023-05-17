import { CustomizedButton } from '../../components/button/Button'
import { ChangeEvent, FormEvent, useState } from 'react';
import Form from '../../modules/form/Form';
import Input from '../../components/input/Input';
import { useNavigate, Navigate } from 'react-router-dom';

import './styles.less';
import Link from '../../components/link';
import { validateForm } from '../../utils/formValidation';
import { isAuth } from '../../utils/isAuthenticated';
import { registration } from '../../services/auth';

const Registration = () => {
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [login, setLogin] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const [firstNameError, setFirstNameError] = useState("");
  const [secondNameError, setSecondNameError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    interface RegisterData {
      first_name: string,
      second_name: string,
      login: string,
      email: string,
      password: string,
      phone: string
    };

    const registrationData: RegisterData = {
      first_name: firstName,
      second_name: secondName,
      login: login,
      email: email,
      password: password,
      phone: phone,
    }

    const loginError = validateForm({ type: 'login', value: login });
    setLoginError(loginError);

    const emailError = validateForm({ type: 'email', value: email });
    setEmailError(emailError);

    const nameError = validateForm({ type: 'name', value: firstName });
    setFirstNameError(nameError);

    const secondNameError = validateForm({ type: 'name', value: secondName });
    setSecondNameError(secondNameError);

    const phoneError = validateForm({ type: 'phone', value: phone });
    setPhoneError(phoneError);

    const passwordError = validateForm({ type: 'password', value: password });
    setPasswordError(passwordError);

    if (!loginError && !emailError && !nameError && !secondNameError && !phoneError && !passwordError) {
      registration(registrationData)
        .then(() => {
          localStorage.setItem('isAuthenticated', String(true));
          navigate('/', { replace: true });
        })
        .catch((reason) => setFormError(reason));
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = (e.currentTarget as HTMLInputElement).value;
    const fieldName = (e.currentTarget as HTMLInputElement).id;

    if (fieldName === 'firstName') {
      setFirstName(value);
      setFirstNameError(validateForm({ type: 'name', value }));
    }
    else if (fieldName === 'secondName') {
      setSecondName(value);
      setSecondNameError(validateForm({ type: 'name', value }));
    }
    else if (fieldName === 'login') {
      setLogin(value);
      setLoginError(validateForm({ type: 'login', value }));
    }
    else if (fieldName === 'phone') {
      setPhone(value);
      setPhoneError(validateForm({ type: 'phone', value }));
    }
    else if (fieldName === 'email') {
      setEmail(value);
      setEmailError(validateForm({ type: 'email', value }));
    }
    else if (fieldName === 'password') {
      setPassword(value);
      setPasswordError(validateForm({ type: 'password', value }));
    }
    else if (fieldName === 'passwordRepeat') {
      setPasswordRepeat(value);
    }
  }

  if (isAuth()) {
    return <Navigate replace to="/game/start" />;
  } else {
    return (
      <main className="page registration-page">
        <Form
          title="Регистрация"
          onSubmit={handleSubmit}
          body={
            <div>
              <Input
                id='firstName'
                placeholder="Имя"
                onChange={handleChange}
                isError={firstNameError ? true : false}
                helperText={firstNameError}
                value={firstName} />
              <Input
                id='secondName'
                placeholder="Фамилия"
                onChange={handleChange}
                isError={secondNameError ? true : false}
                helperText={secondNameError}
                value={secondName} />
              <Input
                id='login'
                placeholder="Логин"
                onChange={handleChange}
                isError={loginError ? true : false}
                helperText={loginError}
                value={login} />
              <Input
                id='phone'
                placeholder="Телефон"
                onChange={handleChange}
                isError={phoneError ? true : false}
                helperText={phoneError}
                value={phone} />
              <Input
                id='email'
                placeholder="Почта"
                onChange={handleChange}
                isError={emailError ? true : false}
                helperText={emailError}
                value={email} />
              <Input
                id='password'
                placeholder="Пароль"
                onChange={handleChange}
                isError={passwordError ? true : false}
                helperText={passwordError}
                value={password} />
              <Input
                id='passwordRepeat'
                placeholder="Пароль (ещё раз)"
                onChange={handleChange}
                isError={false}
                helperText=''
                value={passwordRepeat} />
                {formError && <span className='form-error'>{formError}</span>}
            </div>
          }
          actions={
            <>
              <CustomizedButton text={<span>Зарегистрироваться</span>} onClick={handleSubmit} />
              <Link href="/login" text="Уже есть аккаунт?" />
            </>
          }
        />
      </main >
    )
  }
}

export default Registration
