import { ChangeEvent, FormEvent, useState } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = (e.currentTarget as HTMLInputElement).value;
        const fieldName = (e.currentTarget as HTMLInputElement).id;

        if (fieldName === 'username') {
            setUsername(value);
        }
        else if (fieldName === 'password') {
            setPassword(value);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                id='username'
                type='text'
                onChange={handleChange}
                placeholder='Имя'
                value={username} />
            <input
                id='password'
                type='text'
                onChange={handleChange}
                placeholder='Пароль'
                value={password} />
            <button type="submit">Log in</button>
        </form>
    );
}

export default LoginForm;
