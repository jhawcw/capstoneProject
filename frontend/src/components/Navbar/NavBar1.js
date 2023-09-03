import NavbarBrand from "./NavBarBrand";
import NavBarContent from "./NavBarContent";
import NavBarToggler from "./NavBarToggler";

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-secondary">
      <div className="container-fluid">
        <NavbarBrand />
        <NavBarToggler />
        <NavBarContent
          envData={props.envData}
          btnClickHandler={props.btnClickHandler}
          showLoginModalHandler={props.showLoginModalHandler}
        />
      </div>
    </nav>
  );
};
export default NavBar;
