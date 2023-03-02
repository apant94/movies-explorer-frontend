import './AuthInput.css';

function AuthInput({title, type, value, onChange, minLength, maxLength}) {
  return(
    <div className='authinput'>
      <label className='authinput__label'>{title}</label>
      <input type={type} className='authinput__element' value={value || ''} onChange={onChange} required minLength={minLength} maxLength={maxLength} />
      <span className='authinput__error'></span>
    </div>
  )
}

export default AuthInput;