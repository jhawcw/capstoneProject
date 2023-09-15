const MyButton = (props) => {
  return (
    <button
      type="button"
      className={props.cssClass}
      onClick={() => {
        props.clickHandler(props.listingId);
      }}
    >
      {props.displayText}
    </button>
  );
};

export default MyButton;
