import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./App.css";
import MyCard from "./components/Cards/MyCard";
import LoginModal from "./components/Modals/LoginModal";
import MainNavBar from "./components/Navbar/MainNavBar";
import RegisterModal from "./components/Modals/RegisterModal";
import ListingModal from "./components/Modals/ListingModal";
import VerifyModal from "./components/Modals/VerifyModal";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import EditListingModal from "./components/Modals/EditListingModal";
import Chatbox from "./components/Chatbox/Chatbox";
import SingleListingPage from "./components/Pages/SingleListingPage";
import ProfileModal from "./components/Modals/ProfileModal";
import ApplicationsPage from "./components/Pages/ApplicationsPage";
import RentModal from "./components/Modals/RentModal";
import UpdateApplicationModal from "./components/Modals/UpdateApplicationModal";
import PaymentModal from "./components/Modals/paymentModal";
import RentalsPage from "./components/Pages/RentalsPage";
import BackendToast from "./components/Toasts/BackendToast";

function App() {
  const [backendData, setBackendData] = useState("");
  const [listingData, setListingData] = useState([]);
  const [userListingData, setUserListingData] = useState(null);
  const [unverifiedListingData, setUnverifiedListingData] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [displayListings, setDisplayListings] = useState("verified");
  const [currentListingId, setCurrentListingId] = useState(null);
  const [currentListingData, setCurrentListingData] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  const [showEditListingModal, setShowEditListingModal] = useState(false);
  const [selectedListingPDFUrl, setSelectedListingPDFUrl] = useState("");
  const [applicationsData, setApplicationsData] = useState("");
  const [applicationListingId, setApplicationListingId] = useState(null);
  const [rentingsData, setRentingsData] = useState([]);
  const [backendMessage, setBackendMessage] = useState("");
  const [backendStatus, setBackendStatus] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Login state
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("");
  const [sex, setSex] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userHousingType, setUserHousingType] = useState("");
  const [userName, setUserName] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["Rent@SG Cookie"]);
  const loginHandler = () => setLoggedIn(true);
  const logoutHandler = () => setLoggedIn(false);

  const showLoginModalHandler = () => {
    setShowLogin(true);
  };
  const closeLoginModalHandler = () => {
    setShowLogin(false);
  };

  const showRentModalHandler = () => {
    setShowRentModal(true);
  };

  const closeRentModalHandler = () => {
    setShowRentModal(false);
  };

  const showProfileModalHandler = () => {
    setShowProfileModal(true);
  };

  const closeProfileModalHandler = () => {
    setShowProfileModal(false);
  };

  const showEditListingModalHandler = () => {
    // console.log(currentListingData);
    setShowEditListingModal(true);
    // try {
    //   fetch("/users/my-profile")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //       setUserAddress(data.address);
    //       setUserHousingType(data.housingtype);
    //       setShowEditListingModal(true);
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const closeEditListingModalHandler = () => {
    setShowEditListingModal(false);
  };

  // Register Modal state
  const showPaymentModalHandler = () => {
    setShowPaymentModal(true);
  };
  const closePaymentModalHandler = () => {
    setShowPaymentModal(false);
  };
  // Register Modal state
  const showRegisterModalHandler = () => {
    setShowRegister(true);
  };
  const closeRegisterModalHandler = () => {
    setShowRegister(false);
  };

  const showVerifyModalHandler = (listingId) => {
    setShowVerifyModal(true);
    setCurrentListingId(listingId);
  };

  const closeVerifyModalHandler = (listingId) => {
    setShowVerifyModal(false);
  };

  const closeApplicationModalHandler = () => {
    setShowApplicationModal(false);
  };

  const showApplicationModalHandler = () => {
    setShowApplicationModal(true);
  };

  //Listing Modal state
  const showListingModalHandler = async () => {
    try {
      fetch("/users/my-profile")
        .then((res) => res.json())
        .then((data) => {
          setUserAddress(data.address);
          setUserHousingType(data.housingtype);
          setUserName(data.fullname);
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

  const deleteListingHandler = () => {
    try {
      fetch(`/listings/${currentListingId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data) {
            setShowToast(true);
            setBackendMessage(data.message);
            setBackendStatus(data.status);
            fetch("/listings/alllistings?verified=true")
              .then((response) => response.json())
              .then((data) => {
                setListingData(data.data);
                setDisplayListings("verified");
              });

            fetch(`/listings/alllistings?landlord=${userId}`)
              .then((response) => response.json())
              .then((data) => {
                setUserListingData(data.data);
              });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  //Verify Modal state

  useEffect(() => {
    let eventSource;

    if (currentListingId) {
      eventSource = new EventSource(
        `http://localhost:3001/listings/continuous-update/${currentListingId}`
      );

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // Handle received updates and update your state
        setCurrentListingData(data.data);
        setLoadingData(false);
      };
    }
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [currentListingId]);

  // to show success message when register as a landlord
  useEffect(() => {
    // Capture the query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get("register");

    // Update the state with the message
    if (message) {
      console.log(message);
      setDisplayListings(message);
      setTimeout(function () {
        // Redirect the user to a new URL
        window.location.href = "/"; // Replace with your desired URL
      }, 5000);
    }
  }, []); // Empty dependency array ensures this effect runs once

  // get the env variables for the singpass API
  useEffect(() => {
    fetch("/getEnv")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  useEffect(() => {
    if (userId) {
      fetch("/users/my-profile")
        .then((res) => res.json())
        .then((data) => {
          setUserName(data.fullname);
        });
    }
  }, [userId]);

  // get all the listings on the server
  useEffect(() => {
    fetch("/listings/alllistings?verified=true")
      .then((response) => response.json())
      .then((data) => {
        setListingData(data.data);
      });
  }, []);

  // get all related applications from the server
  useEffect(() => {
    if (loggedIn) {
      fetch("/applications/myapplications", {
        headers: {
          authorization: `Bearer ${cookies["Rent@SG Cookie"]}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setApplicationsData(data.data);
        });
    }
  }, [cookies, loggedIn]);

  //get all rentings from the server
  useEffect(() => {
    if (userId) {
      fetch("/rentings/my-rentings", {
        headers: {
          authorization: `Bearer ${cookies["Rent@SG Cookie"]}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setRentingsData(data.data);
        });
    }
  }, [userId, cookies]);

  // get all the unverified listings on the server
  useEffect(() => {
    if (userId) {
      fetch(`/listings/allunverifiedlistings?landlord=${userId}`, {
        headers: {
          authorization: `Bearer ${cookies["Rent@SG Cookie"]}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUnverifiedListingData(data.data);
        });
    }
  }, [userId, currentListingData]);

  // check if cookie token is present in the browser
  useEffect(() => {
    if (cookies["Rent@SG Cookie"]) {
      fetch("/users/check-cookie")
        .then((res) => res.json())
        .then((data) => {
          if (data.isLogin) {
            setLoggedIn(true);
            setUserId(data.id);
            setRole(data.role);
            setUserName(data.fullname);
            setSex(data.sex);
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
  }, [userId, displayListings]);

  useEffect(() => {
    if (currentListingId && displayListings === "single listing") {
      fetch(`http://localhost:3001/listings/myagreement/${currentListingId}`, {
        method: "GET",
      })
        .then((response) => {
          if (response.status === 200) {
            return response.blob();
          } else {
            throw new Error(`HTTP status ${response.status}`);
          }
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setSelectedListingPDFUrl(url);
        })
        .catch((error) => {
          setSelectedListingPDFUrl("");
        });
    }
  }, [currentListingId, displayListings]);

  // get the listing data of the current listing that is currently selected
  // useEffect(() => {
  //   if (currentListingId) {
  //     fetch(`/listings/${currentListingId}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // console.log(data.data);
  //         // console.log(data.data.data);
  //         setCurrentListingData(data.data.data);
  //         console.log(data.data.data);
  //         setLoadingData(false);
  //       });
  //   }
  // }, [currentListingId]);

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
        showProfileModalHandler={showProfileModalHandler}
        role={role}
        setUserId={setUserId}
        setCurrentListingId={setCurrentListingId}
      ></MainNavBar>

      <PaymentModal
        setShowPaymentModal={setShowPaymentModal}
        showPaymentModal={showPaymentModal}
      ></PaymentModal>

      <ListingModal
        setBackendMessage={setBackendMessage}
        setBackendStatus={setBackendStatus}
        setShowToast={setShowToast}
        setDisplayListings={setDisplayListings}
        showListingModal={showListingModal}
        setShowListingModal={setShowListingModal}
        closeListingModalHandler={closeListingModalHandler}
        userAddress={userAddress}
        userHousingType={userHousingType}
        userId={userId}
        cookies={cookies}
        setUserListingData={setUserListingData}
      ></ListingModal>

      <UpdateApplicationModal
        showApplicationModal={showApplicationModal}
        setShowApplicationModal={setShowApplicationModal}
        applicationListingId={applicationListingId}
        setApplicationListingId={setApplicationListingId}
        closeApplicationModalHandler={closeApplicationModalHandler}
        cookies={cookies}
        setApplicationsData={setApplicationsData}
      ></UpdateApplicationModal>

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

      <RentModal
        showRentModal={showRentModal}
        closeRentModalHandler={closeRentModalHandler}
        cookies={cookies}
        applicationListingId={applicationListingId}
        setApplicationsData={setApplicationsData}
      ></RentModal>

      <VerifyModal
        showVerifyModal={showVerifyModal}
        setShowVerifyModal={setShowVerifyModal}
        currentListingId={currentListingId}
        cookies={cookies}
        userId={userId}
        setUnverifiedListingData={setUnverifiedListingData}
        closeVerifyModalHandler={closeVerifyModalHandler}
      ></VerifyModal>

      <EditListingModal
        showEditListingModal={showEditListingModal}
        setShowEditListingModal={setShowEditListingModal}
        closeEditListingModalHandler={closeEditListingModalHandler}
        currentListingData={currentListingData}
        cookies={cookies}
        userId={userId}
        setCurrentListingData={setCurrentListingData}
        setLoadingData={setLoadingData}
        selectedListingPDFUrl={selectedListingPDFUrl}
      ></EditListingModal>

      <ProfileModal
        showProfileModal={showProfileModal}
        closeProfileModalHandler={closeProfileModalHandler}
        role={role}
        userName={userName}
        sex={sex}
      ></ProfileModal>

      <BackendToast
        backendStatus={backendStatus}
        backendMessage={backendMessage}
        showToast={showToast}
        setShowToast={setShowToast}
      ></BackendToast>

      <Container style={{ paddingTop: "10vh", minHeight: "100vh" }}>
        <Row>
          {displayListings === "verified" &&
            listingData
              .filter((item) => item.active === true)
              .map((item, ind) => (
                <Col md={3} style={{ height: "425px" }} key={ind} className="mb-4 mt-4">
                  <MyCard
                    key={item._id}
                    title={item.title}
                    imageCover={item.imageCover}
                    listingData={item}
                    userId={userId}
                    setDisplayListings={setDisplayListings}
                    setCurrentListingId={setCurrentListingId}
                    currentListingId={currentListingId}
                    setLoadingData={setLoadingData}
                    showRentModalHandler={showRentModalHandler}
                    setApplicationListingId={setApplicationListingId}
                    role={role}
                  />
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
                  userId={userId}
                  setDisplayListings={setDisplayListings}
                  setCurrentListingId={setCurrentListingId}
                  currentListingId={currentListingId}
                  setLoadingData={setLoadingData}
                />
              </Col>
            ))}

          {displayListings === "verify listings" &&
            unverifiedListingData.map((item, ind) => (
              <Col md={3} style={{ height: "425px" }} key={ind} className="mb-4 mt-4">
                <MyCard
                  key={item._id}
                  title={item.title}
                  imageCover={item.imageCover}
                  listingData={item}
                  userId={userId}
                  showVerifyModalHandler={showVerifyModalHandler}
                  setDisplayListings={setDisplayListings}
                  setCurrentListingId={setCurrentListingId}
                  currentListingId={currentListingId}
                  setLoadingData={setLoadingData}
                  role={role}
                />
              </Col>
            ))}

          {displayListings === "single listing" && !loadingData ? (
            <Row md={12} style={{ backgroundColor: "#FFFFFF" }} className="pb-5 pt-5 rounded">
              <SingleListingPage
                userId={userId}
                currentListingData={currentListingData}
                showEditListingModalHandler={showEditListingModalHandler}
                deleteListingHandler={deleteListingHandler}
              ></SingleListingPage>
              <hr></hr>
              {loggedIn ? (
                <Chatbox
                  currentListingData={currentListingData}
                  userName={userName}
                  cookies={cookies}
                  userId={userId}
                ></Chatbox>
              ) : null}
            </Row>
          ) : (
            displayListings === "single listing" && <div>Loading...</div>
          )}

          {displayListings === "success" && (
            <>
              <div>
                Congratulations on registering successfully as a Landlord, you can now login with
                your fullname and password.
              </div>
              <div>You will also be redirected to the homepage in 5 seconds.</div>
            </>
          )}
        </Row>

        {displayListings === "my applications" ? (
          <ApplicationsPage
            applicationsData={applicationsData}
            showApplicationModalHandler={showApplicationModalHandler}
            setApplicationListingId={setApplicationListingId}
            applicationListingId={applicationListingId}
            role={role}
            cookies={cookies}
            setDisplayListings={setDisplayListings}
            setCurrentListingId={setCurrentListingId}
            showPaymentModalHandler={showPaymentModalHandler}
          ></ApplicationsPage>
        ) : null}

        {displayListings === "my rentals" ? (
          <RentalsPage rentingsData={rentingsData}></RentalsPage>
        ) : null}
      </Container>
    </div>
  );
}

export default App;
