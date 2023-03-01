import './AuthInput.css';

function AuthInput({name, type}) {
  return(
    <div className='authinput'>
      <label className='authinput__label'>{name}</label>
      <input type={type} className='authinput__element' />
      <span className='authinput__error'></span>
    </div>
  )
}

export default AuthInput;