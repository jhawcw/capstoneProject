import Modal from "react-bootstrap/Modal";
import EditListingForm from "../Forms/EditListingForm";

const EditListingModal = (props) => {
  const handleClose = () => props.setShowEditListingModal(false);
  return (
    <>
      <Modal
        show={props.showEditListingModal}
        onHide={handleClose}
        aria-labelledby="example-custom-modal-styling-title"
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Edit Your Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditListingForm
            setCurrentListingData={props.setCurrentListingData}
            currentListingData={props.currentListingData}
            closeEditListingModalHandler={props.closeEditListingModalHandler}
            userId={props.userId}
            cookies={props.cookies}
            setLoadingData={props.setLoadingData}
            selectedListingPDFUrl={props.selectedListingPDFUrl}
          ></EditListingForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditListingModal;
