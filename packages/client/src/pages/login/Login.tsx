import { Button } from '../../components/button/Button'
import { ChangeEvent, FormEvent, useState } from 'react'
import Form from '../../modules/form/Form'
import Input from '../../components/input/Input'

import './styles.less'
import Link from '../../components/link'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = (e.currentTarget as HTMLInputElement).value
    const fieldName = (e.currentTarget as HTMLInputElement).id

    if (fieldName === 'username') {
      setUsername(value)
    } else if (fieldName === 'password') {
      setPassword(value)
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
              value={username}
            />
            <Input
              id="password"
              placeholder="Введите пароль"
              onChange={handleChange}
              value={password}
            />
          </div>
        }
        actions={
          <>
            <Button text={<span>Авторизация</span>} />
            <Link href="/registration" text="Нет аккаунта?" />
          </>
        }
      />
    </main>
  )
}

export default Login
