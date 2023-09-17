import Modal from "react-bootstrap/Modal";
import VerifyForm from "../Forms/VerifyForm";

const VerifyModal = (props) => {
  const handleClose = () => props.setShowVerifyModal(false);

  return (
    <>
      <Modal show={props.showVerifyModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Verify Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VerifyForm
            currentListingId={props.currentListingId}
            cookies={props.cookies}
            userId={props.userId}
            setUnverifiedListingData={props.setUnverifiedListingData}
            closeVerifyModalHandler={props.closeVerifyModalHandler}
          ></VerifyForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VerifyModal;
