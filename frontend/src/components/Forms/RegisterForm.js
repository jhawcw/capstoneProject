import { useState } from "react";
import callAuthoriseApi from "../../utils/callAuthoriseApi";

const RegisterForm = (props) => {
  const [NRICInput, setNRICInput] = useState("");
  const [givenName, SetGivenName] = useState("");
  const [surname, SetSurname] = useState("h");
  console.log(props.envData);
  var state = Math.floor(Math.random() * 100000);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    callAuthoriseApi(
      props.envData.authApiUrl,
      props.envData.clientId,
      props.envData.attributes,
      props.envData.purpose,
      state,
      props.envData.redirectUrl
    );
  };

  const NRICChangeHandler = (event) => {
    setNRICInput(event.target.value);
  };

  return (
    <div>
      <form method="GET" onSubmit={formSubmitHandler}>
        <label>NRIC</label>
        <div />
        <input type="text" id="NRIC" onChange={NRICChangeHandler}></input>
        <div />
        <input type="submit" value="Retrieve MyInfo"></input>
      </form>
      <form>
        <label>Name</label>
        <div />
        <input type="text" disabled={true} value={givenName}></input>
        <div />
        <label>Surname</label>
        <div />
        <input type="text" contentEditable={false}></input>
        <div />
      </form>
    </div>
  );
};

export default RegisterForm;
