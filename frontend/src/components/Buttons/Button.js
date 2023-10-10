const MyButton = (props) => {
  return (
    <button
      type="button"
      className={props.cssClass}
      onClick={(event) => {
        event.stopPropagation();
        props.clickHandler(props.listingId);
      }}
    >
      {props.displayText}
    </button>
  );
};

export default MyButton;
