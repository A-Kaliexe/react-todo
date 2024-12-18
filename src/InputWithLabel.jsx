import { useRef, useEffect } from 'react'

function InputWithLabel({ children, value, onChange, id }) {
    const inputRef = useRef(null);
  
    useEffect(() => {
      inputRef.current.focus();
    }, []);
  
    return (
      <>
        <label htmlFor={id}>{children}</label>
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={id}
          value={value}
          onChange={onChange}/>
</>
)
}
export default InputWithLabel