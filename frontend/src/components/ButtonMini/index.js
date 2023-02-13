import "./index.css";

//className2: "fav", "like"; linked to css

export const ButtonMini = ({type="button", className2, text, onClickFunction }) => {
  return (
    <button className={`ButtonMini ${className2}`} type={type} onClick={onClickFunction}>
      {text ? text : undefined}
    </button>
  );
};
