import Modal from "react-bootstrap/Modal";
import LoginForm from "../Forms/LoginForm";

const LoginModal = (props) => {
  const handleClose = () => props.setShowLogin(false);

  return (
    <>
      <Modal show={props.showLogin} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm
            closeLoginModalHandler={props.closeLoginModalHandler}
            loginHandler={props.loginHandler}
            setCookie={props.setCookie}
            setRole={props.setRole}
            setUserId={props.setUserId}
            setBackendMessage={props.setBackendMessage}
            setBackendStatus={props.setBackendStatus}
            setShowToast={props.setShowToast}
          ></LoginForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
