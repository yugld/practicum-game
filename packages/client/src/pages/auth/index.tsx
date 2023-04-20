import { useLocation } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import RegistryForm from '../../components/RegistryForm';

const AuthRoot = () => {
    const location= useLocation();
    return location.pathname === '/' 
        ? <LoginForm /> 
        : <RegistryForm />;
}

export default AuthRoot;
