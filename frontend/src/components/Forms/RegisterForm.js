import callAuthoriseApi from "../../utils/callAuthoriseApi";

const RegisterForm = (props) => {
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

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <h3 className="text-center">Register as a Landlord</h3>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <form method="GET" onSubmit={formSubmitHandler}>
          <input type="submit" value="Retrieve MyInfo" className="btn btn-primary fw-bold"></input>
        </form>
      </div>
      <hr />
      <div className="d-flex align-items-center justify-content-center">
        <h3 className="text-center">Register as a Tenant</h3>
      </div>
      <div className="form-group">
        <input className="form-control" type="text" name="fullname" placeholder="Full Name" />
      </div>
      <div className="form-group">
        <input className="form-control" type="password" name="password" placeholder="Password" />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="password"
          name="password-repeat"
          placeholder="Password (repeat)"
        />
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <input type="submit" value="Register" className="btn btn-primary fw-bold"></input>
      </div>
      <hr />
      <h3 className="text-center">Login here</h3>
      <form>
        <div className="form-group">
          <input className="form-control" type="text" name="fullname" placeholder="Full Name" />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" name="password" placeholder="Password" />
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <input type="submit" value="Login" className="btn btn-primary fw-bold"></input>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
