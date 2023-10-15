import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";

const RentModal = (props) => {
  const handleClose = () => props.closeRentModalHandler();

  const newApplicationHandler = () => {
    fetch(`/applications/create/${props.applicationListingId}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${props.cookies["Rent@SG Cookie"]}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.setBackendMessage(data.message);
        props.setBackendStatus(data.status);
        fetch("/applications/myapplications", {
          headers: {
            authorization: `Bearer ${props.cookies["Rent@SG Cookie"]}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            props.setApplicationsData(data.data);
            props.setShowToast();
            props.setDisplayListings("my applications");
            handleClose();
          });
      });
  };
  return (
    <>
      <Modal show={props.showRentModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rental Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Are you sure you want to apply for this listing?</p>
          <Button onClick={newApplicationHandler}>Apply Now</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RentModal;
