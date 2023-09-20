import Modal from "react-bootstrap/Modal";
import RentForm from "../Forms/RentForm";

const RentModal = (props) => {
  const handleClose = () => props.closeRegisterModalHandler();
  return (
    <>
      <Modal show={props.showRegister} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RentForm></RentForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RentModal;
