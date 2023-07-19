import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar/NavBar";
import MyModal from "./components/Modals/Modal";
import RegisterForm from "./components/Forms/RegisterForm";
import MyCard from "./components/Cards/MyCard";

function App() {
  const [backendData, setBackendData] = useState("");
  const [listingData, setListingData] = useState([]);
  const [show, setShow] = useState(false);

  const closeHandler = () => setShow(false);
  const showHandler = () => setShow(true);

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
      <NavBar envData={backendData} btnClickHandler={showHandler}></NavBar>
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
