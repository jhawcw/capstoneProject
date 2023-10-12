import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const BackendToast = (props) => {
  const hideToast = () => {
    props.setShowToast(false);
  };

  return (
    <ToastContainer className="p-3" position="middle-center" style={{ zIndex: 1 }}>
      <Toast show={props.showToast} onClose={hideToast} delay={3000} autohide bg={"secondary"}>
        <Toast.Header>
          <strong className="me-auto">{props.backendStatus}</strong>
        </Toast.Header>
        <Toast.Body>{props.backendMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default BackendToast;
