import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./App.css";
import NavBar from "./components/Navbar/NavBar1";
import MyModal from "./components/Modals/Modal";
import RegisterForm from "./components/Forms/RegisterForm";
import MyCard from "./components/Cards/MyCard";
import LoginModal from "./components/Modals/LoginModal";
import MainNavBar from "./components/Navbar/MainNavBar";
import RegisterModal from "./components/Modals/RegisterModal";
import ListingModal from "./components/Modals/ListingModal";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

function App() {
  const [backendData, setBackendData] = useState("");
  const [listingData, setListingData] = useState([]);
  const [userListingData, setUserListingData] = useState([]);
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);
  const [showAllListings, setShowAllListings] = useState(true);
  const [showMyListings, setShowMyListings] = useState(false);
  const [displayListings, setDisplayListings] = useState("verified");

  // Login state
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userHousingType, setUserHousingType] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["Rent@SG Cookie"]);
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

  // Register Modal state
  const showRegisterModalHandler = () => {
    setShowRegister(true);
  };
  const closeRegisterModalHandler = () => {
    setShowRegister(false);
  };

  //Listing Modal state
  const showListingModalHandler = async () => {
    try {
      fetch("/users/my-profile")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserAddress(data.address);
          setUserHousingType(data.housingtype);
          setShowListingModal(true);
        });
    } catch (err) {
      console.log(err);
      console.log("Something went wrong while getting user address");
    }
  };

  const closeListingModalHandler = () => {
    setShowListingModal(false);
  };

  // useEffect(() => {
  //   const eventSource = new EventSource("http://localhost:3001/tickets/continuous-updates");

  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     // Handle received updates and update your state
  //     //setListingData(data);
  //     console.log(data);
  //     return () => {
  //       eventSource.close();
  //     };
  //   };
  //   console.log("running");
  // }, []);

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
        console.log(data);
        setListingData(data.data);
      });
  }, []);

  // check if cookie token is present in the browser
  useEffect(() => {
    if (cookies["Rent@SG Cookie"]) {
      fetch("/users/check-cookie")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.isLogin) {
            setLoggedIn(true);
            setUserId(data.id);
          }
        });
    }
  }, [cookies]);

  // get all the currently logged in user's listings on the server
  useEffect(() => {
    if (userId) {
      fetch(`/listings/alllistings?landlord=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserListingData(data.data);
        });
    }
  }, [userId]);

  return (
    <div style={{ backgroundColor: "#fff1ef" }} className="pb-5">
      <MainNavBar
        isLoggedIn={loggedIn}
        showLoginModalHandler={showLoginModalHandler}
        showRegisterModalHandler={showRegisterModalHandler}
        showListingModalHandler={showListingModalHandler}
        removeCookie={removeCookie}
        logoutHandler={logoutHandler}
        envData={backendData}
        setDisplayListings={setDisplayListings}
      ></MainNavBar>

      <ListingModal
        showListingModal={showListingModal}
        setShowListingModal={setShowListingModal}
        closeListingModalHandler={closeListingModalHandler}
        userAddress={userAddress}
        userHousingType={userHousingType}
        userId={userId}
        cookies={cookies}
        setUserListingData={setUserListingData}
      ></ListingModal>

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
      <Container style={{ paddingTop: "10vh" }}>
        <Row>
          {displayListings === "verified" &&
            listingData.map((item, ind) => (
              <Col md={3} style={{ height: "425px" }} key={ind} className="mb-4 mt-4">
                <MyCard key={item._id} title={item.title} imageCover={item.imageCover} />
              </Col>
            ))}
          {displayListings === "my listings" &&
            userListingData.map((item, ind) => (
              <Col md={3} style={{ height: "425px" }} key={ind} className="mb-4  mt-4">
                <MyCard
                  key={item._id}
                  title={item.title}
                  imageCover={item.imageCover}
                  listingData={item}
                />
              </Col>
            ))}
        </Row>
      </Container>
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
