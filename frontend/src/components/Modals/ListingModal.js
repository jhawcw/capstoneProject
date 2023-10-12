import Modal from "react-bootstrap/Modal";
import CreateListingForm from "../Forms/CreateListingForm";

const ListingModal = (props) => {
  const handleClose = () => props.setShowListingModal(false);

  return (
    <>
      <Modal
        show={props.showListingModal}
        onHide={handleClose}
        aria-labelledby="example-custom-modal-styling-title"
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Create a listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateListingForm
            setBackendMessage={props.setBackendMessage}
            setBackendStatus={props.setBackendStatus}
            setShowToast={props.setShowToast}
            setDisplayListings={props.setDisplayListings}
            closeListingModalHandler={props.closeListingModalHandler}
            userAddress={props.userAddress}
            userHousingType={props.userHousingType}
            userId={props.userId}
            cookies={props.cookies}
            setUserListingData={props.setUserListingData}
          ></CreateListingForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ListingModal;
