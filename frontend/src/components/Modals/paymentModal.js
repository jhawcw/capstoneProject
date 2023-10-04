import Modal from "react-bootstrap/Modal";
import PaymentForm from "../Forms/PaymentForm";

const PaymentModal = (props) => {
  const handleClose = () => props.setShowPaymentModal(false);

  return (
    <>
      <Modal show={props.showPaymentModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaymentForm></PaymentForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PaymentModal;
