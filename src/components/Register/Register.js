import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';


function Register({onUpdateRegister}) {
  // const { values, isValid, errors, handleChange, resetValidation } = useFormAndValidation();

  // function handleSubmit(e) {
  //   // Запрещаем браузеру переходить по адресу формы
  //   e.preventDefault();
  
  //   // Передаём значения управляемых компонентов во внешний обработчик
  //   onUpdateRegister({
  //     name: values["name"],
  //     about: values["about"],
  //   });
  // };

  return(
    <AuthForm greetings={'Добро пожаловать!'}>
      <AuthInput name = {'Имя'} type={'text'} />
      <AuthInput />
      <AuthInput />
    </AuthForm>
  )
}

export default Register;