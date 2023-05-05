export type ValidateRuleType = 'login' | 'password' | 'email' | 'name' | 'phone' | 'password-repeat';

type ValidateRule = {
    value: string,
    type: ValidateRuleType,
}

function generalStringValidation(value: string, minLettersCount: number): string {
    if (value.length === 0) {
        return 'Value can not be empty';
    }
    if (value.length < minLettersCount) {
        return `Value should contains more than ${minLettersCount - 1} letters`;
    }

    return '';
}

function validateLogin(value: string): string {
    const error = generalStringValidation(value, 3);

    if (error) {
        return error;
    }

    if (value.length > 20) {
        return 'Login can contain only 20 symbols';
    }

    const loginRegexp = /^[0-9a-zA-Z-_]+$/;
    const onlyNumbersRegexp = /^[0-9]+$/;
    if (onlyNumbersRegexp.test(value)) {
        return "Login shouldn't contain only from numbers";
    }
    if (!loginRegexp.test(value)) {
        return 'Login should contain only latin symbols, "-", "_"';
    }

    return '';
}

function validatePassword(value: string): string {
    const error = generalStringValidation(value, 8);

    if (error) {
        return error;
    }

    if (value.length > 40) {
        return 'Password length should be lower then 40';
    }

    // {8,}                        от 8 символов
    // {8,20}                      от 8 до 20 символов
    // (?=.*\d)                    минимум одна цифра
    // (?=.*[a-z])                 минимум одна буква в нижнем регистре
    // (?=.*[A-Z])                 минимум одна буква в верхнем регистре
    // (?=.*[-#!$@%^&*_+~=:;?\/])  минимум один символ из набора
    const oneDijitRegexp = /\d/;
    const lowerCaseRegexp = /[a-zа-яё]/;
    const upperCaseRegexp = /[A-ZА-ЯёЁ]/;
    // eslint-disable-next-line
    const symbolRegexp = /[-#!$@%^&*_+~=:;?\/]/;

    if (!oneDijitRegexp.test(value)) {
        return 'Password should contain at least 1 number';
    }
    if (!lowerCaseRegexp.test(value)) {
        return 'Password should contain at least 1 letter in lower case';
    }
    if (!upperCaseRegexp.test(value)) {
        return 'Password should contain at least 1 letter in upper case';
    }
    if (!symbolRegexp.test(value)) {
        return 'Pasword should contain at least 1 symbol';
    }

    return '';
}

function validateEmail(value: string): string {
    if (value.length === 0) {
        return 'Value can not be empty';
    }

    const emailRegexp = /^(.+)@(.+)\.(.+)$/;
    const latinAndNumbersRegexp = /^[0-9a-zA-Z-_]+@[a-zA-Z-_]+\.[a-zA-Z]+$/;
    if (!emailRegexp.test(value)) {
        return 'e-mail is incorrect';
    }
    if (!latinAndNumbersRegexp.test(value)) {
        return 'Email should contain only numbers, latin symbols, "-", "_"';
    }

    return '';
}

function validatePhone(value: string): string {
    if (value.length === 0) {
        return 'Value can not be empty';
    }

    const mobilePhoneRegexp = /^(\+?7|8)?9\d{9}$/;
    if (!mobilePhoneRegexp.test(value)) {
        return 'Phone format is +79xxxxxxxxx or 89xxxxxxxxx';
    }

    return '';
}

function validateName(value: string): string {
    if (value.length === 0) {
        return 'Value can not be empty';
    }

    const nameRegexp = /^[а-яА-ЯёЁa-zA-Z-]+$/;
    const upperCaseRegexp = /^[А-ЯЁA-Z]{1}[а-яА-ЯёЁa-zA-Z-]*$/;

    if (!nameRegexp.test(value)) {
        return 'Value should contain only letters and "-" symbol';
    }
    if (!upperCaseRegexp.test(value)) {
        return 'Value should start from a letter in upper case';
    }

    return '';
}

const validatorsMap = new Map<ValidateRuleType, (value: string) => string>([
    ['login', validateLogin],
    ['password', validatePassword],
    ['email', validateEmail],
    ['phone', validatePhone],
    ['name', validateName],
]);

export function validateForm({ type, value }: ValidateRule): string {
    const validator = validatorsMap.get(type);
    return validator ? validator(value) : '';
}
