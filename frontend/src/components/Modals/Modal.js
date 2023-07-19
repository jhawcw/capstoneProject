import Modal from "react-bootstrap/Modal";
import MyButton from "../Buttons/Button";

const MyModal = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.closeHandler} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title w-100 text-center">{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{props.content}</Modal.Body>
        <Modal.Footer>
          <MyButton
            clickHandler={props.closeHandler}
            cssClass={"btn btn-secondary"}
            displayText={"Close"}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyModal;
