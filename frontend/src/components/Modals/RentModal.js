import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";

const RentModal = (props) => {
  const handleClose = () => props.closeRentModalHandler();
  return (
    <>
      <Modal show={props.showRentModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rental Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Are you sure you want to apply for this listing?</p>
          <Button>Apply Now</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RentModal;
