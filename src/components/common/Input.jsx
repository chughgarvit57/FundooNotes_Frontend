const Input = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  className,
  onClick,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={className}
      onClick={onClick}
    />
  );
};

export default Input;
