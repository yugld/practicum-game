import { Form } from '../../modules/form/Form'
import { Input } from '../../components/input/Input'
import { Button } from '../../components/button/Button'

export default function Login() {
    return <div className="page login-page">
        <Form
          title="Авторизация"
          body={
            <div>
                <Input placeholder="Введите логин"/>
                <Input placeholder="Введите пароль"/>
            </div>
          }
          actions={
              <Button text={<span>Войти</span>}/>
          }
        />
    </div>;
}
