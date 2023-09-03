import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import NavBar from "./components/Navbar/NavBar1";
import MyModal from "./components/Modals/Modal";
import RegisterForm from "./components/Forms/RegisterForm";
import MyCard from "./components/Cards/MyCard";
import LoginModal from "./components/Modals/LoginModal";
import MainNavBar from "./components/Navbar/MainNavBar";
import RegisterModal from "./components/Modals/RegisterModal";

function App() {
  const [backendData, setBackendData] = useState("");
  const [listingData, setListingData] = useState([]);
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Login state
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const loginHandler = () => setLoggedIn(true);
  const logoutHandler = () => setLoggedIn(false);

  const closeHandler = () => setShow(false);
  const showHandler = () => setShow(true);
  const showLoginModalHandler = () => {
    setShowLogin(true);
  };
  const closeLoginModalHandler = () => {
    setShowLogin(false);
  };

  // Register state
  const showRegisterModalHandler = () => {
    setShowRegister(true);
  };
  const closeRegisterModalHandler = () => {
    setShowRegister(false);
  };

  // get the env variables for the singpass API
  useEffect(() => {
    fetch("/getEnv")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  // get all the listings on the server
  useEffect(() => {
    fetch("/listings/alllistings?verified=true")
      .then((response) => response.json())
      .then((data) => {
        setListingData(data.data);
      });
  }, []);

  return (
    <div>
      <MainNavBar
        isLoggedIn={loggedIn}
        showLoginModalHandler={showLoginModalHandler}
        showRegisterModalHandler={showRegisterModalHandler}
        removeCookie={removeCookie}
        logoutHandler={logoutHandler}
        envData={backendData}
      ></MainNavBar>

      <LoginModal
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        closeLoginModalHandler={closeLoginModalHandler}
        loginHandler={loginHandler}
        setCookie={setCookie}
        setRole={setRole}
        setUserId={setUserId}
      ></LoginModal>

      <RegisterModal
        showRegister={showRegister}
        closeRegisterModalHandler={closeRegisterModalHandler}
        envData={backendData}
        setRole={setRole}
        setUserId={setUserId}
        setCookie={setCookie}
      ></RegisterModal>

      {show && (
        <MyModal
          closeHandler={closeHandler}
          show={show}
          title={"Login/Register"}
          content={<RegisterForm envData={backendData} />}
        ></MyModal>
      )}

      <div className="bg-primary-subtle d-flex align-items-center justify-content-center">
        {listingData.map((item) => (
          <MyCard key={item._id} title={item.title} imageCover={item.imageCover} />
        ))}
      </div>
    </div>
  );
}

export default App;

/*{/* {typeof listingData === "undefined" ? (
  <p>No listings found</p>
  ) : (
    listingData.map((ele, ind, arr) => {
      return <MyCard key={ind} title={ele.title} />;
    })
  )} }*/
