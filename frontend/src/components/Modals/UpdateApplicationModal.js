import Modal from "react-bootstrap/Modal";
import UpdateApplicationForm from "../Forms/UpdateApplicationForm";

const UpdateApplicationModal = (props) => {
  const handleClose = () => props.setShowApplicationModal(false);

  return (
    <>
      <Modal
        show={props.showApplicationModal}
        onHide={handleClose}
        aria-labelledby="example-custom-modal-styling-title"
        dialogClassName="modal-md"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Submit agreement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateApplicationForm
            applicationListingId={props.applicationListingId}
            setApplicationListingId={props.setApplicationListingId}
            closeApplicationModalHandler={props.closeApplicationModalHandler}
            cookies={props.cookies}
            setApplicationsData={props.setApplicationsData}
          ></UpdateApplicationForm>
          {/* <CreateListingForm
            closeListingModalHandler={props.closeListingModalHandler}
            userAddress={props.userAddress}
            userHousingType={props.userHousingType}
            userId={props.userId}
            cookies={props.cookies}
            setUserListingData={props.setUserListingData}
          ></CreateListingForm> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateApplicationModal;
