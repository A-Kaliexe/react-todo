import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function InputWithLabel({ children, value, onChange, id }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default InputWithLabel;
