import Modal from "react-bootstrap/Modal";

const ProfileModal = (props) => {
  const handleClose = () => props.closeProfileModalHandler();

  return (
    <>
      <Modal show={props.showProfileModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Full Name: {props.userName}</p>
          <p>Sex: {props.sex}</p>
          <p>Role: {props.role}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfileModal;
