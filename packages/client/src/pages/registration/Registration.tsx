import { CustomizedButton } from '../../components/button/Button'
import { ChangeEvent, FormEvent, useState } from 'react';
import Form from '../../modules/form/Form';
import Input from '../../components/input/Input';

import './styles.less';
import Link from '../../components/link';

const Registration = () => {
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [login, setLogin] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = (e.currentTarget as HTMLInputElement).value;
        const fieldName = (e.currentTarget as HTMLInputElement).id;

        if (fieldName === 'firstName') {
            setFirstName(value);
        }
        else if (fieldName === 'secondName') {
            setSecondName(value);
        }
        else if (fieldName === 'login') {
            setLogin(value);
        }
        else if (fieldName === 'phone') {
            setPhone(value);
        }
        else if (fieldName === 'email') {
            setEmail(value);
        }
        else if (fieldName === 'password') {
            setPassword(value);
        }
        else if (fieldName === 'passwordRepeat') {
            setPasswordRepeat(value);
        }
    }

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
                            value={firstName} />
                        <Input
                            id='secondName'
                            placeholder="Фамилия"
                            onChange={handleChange}
                            value={secondName} />
                        <Input
                            id='login'
                            placeholder="Логин"
                            onChange={handleChange}
                            value={login} />
                        <Input
                            id='phone'
                            placeholder="Телефон"
                            onChange={handleChange}
                            value={phone} />
                        <Input
                            id='email'
                            placeholder="Почта"
                            onChange={handleChange}
                            value={email} />
                        <Input
                            id='password'
                            placeholder="Пароль"
                            onChange={handleChange}
                            value={password} />
                        <Input
                            id='passwordRepeat'
                            placeholder="Пароль (ещё раз)"
                            onChange={handleChange}
                            value={passwordRepeat} />
                    </div>
                }
                actions={
                    <>
                        <CustomizedButton text={<span>Зарегистрироваться</span>} />
                        <Link href="/login" text="Уже есть аккаунт?"/>
                    </>
                }
            />
        </main>
    );
}

export default Registration;
