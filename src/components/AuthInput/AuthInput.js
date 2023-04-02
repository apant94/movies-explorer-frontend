import './AuthInput.css';

function AuthInput({ title, type, value, onChange, minLength, maxLength, errors, name }) {
  return(
    <div className='authinput'>
      <label className='authinput__label'>{title}</label>
      <input type={type} className='authinput__element' value={`${value}` || ''} onChange={onChange} name={name} required minLength={minLength} maxLength={maxLength} />
      <span className='authinput__error'>{errors}</span>
    </div>
  )
}

export default AuthInput;