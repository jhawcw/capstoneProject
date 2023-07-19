import MyButton from "../Buttons/Button";

const NavBarContent = (props) => {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            Link
          </a>
        </li>
      </ul>
      <MyButton
        displayText={"Login/Register"}
        cssClass={"btn btn-primary fw-bold"}
        clickHandler={props.btnClickHandler}
      />
    </div>
  );
};

export default NavBarContent;
