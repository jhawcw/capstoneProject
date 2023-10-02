import { useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UpdateApplicationForm = (props) => {
  const agreementInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();

    form.append("agreement", agreementInputRef.current.files[0]);

    console.log(props.applicationListingId);
    console.log(agreementInputRef.current.files[0]);

    try {
      const response = await fetch(
        `http://localhost:3001/applications/updatestatus/${props.applicationListingId}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${props.cookies["Rent@SG Cookie"]}`,
          },
          body: form,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            fetch("/applications/myapplications", {
              headers: {
                authorization: `Bearer ${props.cookies["Rent@SG Cookie"]}`,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data.data);
                props.setApplicationsData(data.data);
              });
          }
        });
    } catch (err) {
      console.log(err);
    }

    // props.closeApplicationModalHandler();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Upload Agreement File</Form.Label>
            <Form.Control type="file" accept=".pdf" name="agreement" ref={agreementInputRef} />
          </Form.Group>
        </Col>
      </Row>

      <div className="text-center">
        <Button variant="primary" type="submit">
          <strong>Update Application</strong>
        </Button>
      </div>
    </Form>
  );
};

export default UpdateApplicationForm;
