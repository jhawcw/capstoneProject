import React, { useEffect, useState } from "react";
import RegisterForm from "./components/Forms/RegisterForm";
import callServerAPIs from "./utils/callServerAPIs";

function App() {
  const [backendData, setBackendData] = useState("");

  useEffect(() => {
    fetch("/getEnv")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("we are here");
        setBackendData(data);
      });
  }, []);

  return (
    <div>
      {typeof backendData.authApiUrl === "undefined" ? (
        <p>Loading...</p>
      ) : (
        <p value={backendData.authApiUrl}> </p>
        // backendData.authApiUrl.map((user, i) => <p key={i}>{user} </p>)
      )}
      <RegisterForm envData={backendData} />
    </div>
  );
}

export default App;
