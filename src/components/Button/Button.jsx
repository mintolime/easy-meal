import '../Button/Button.css';

function Button({ btnClass, btnType, btnText, onClick }) {
  return (
    <button className={`button ${btnClass}`} type={btnType} onClick={onClick} role="button">
      {btnText}
    </button>
  );
}

export default Button;
