import Modal from "react-bootstrap/Modal";
import RegisterForm from "../Forms/RegisterForm";

const RegisterModal = (props) => {
  const handleClose = () => props.closeRegisterModalHandler();

  return (
    <>
      <Modal show={props.showRegister} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm
            setRole={props.setRole}
            envData={props.envData}
            handleClose={handleClose}
            setUserId={props.setUserId}
            setCookie={props.setCookie}
          ></RegisterForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
