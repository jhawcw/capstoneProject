import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const VerifyForm = (props) => {
  const verificationImageInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();

    form.append("photo", verificationImageInputRef.current.files[0]);
    console.log(form);

    try {
      const response = await fetch(`http://localhost:3001/listings/${props.currentListingId}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${props.cookies["Rent@SG Cookie"]}`,
        },
        body: form,
      });
      console.log(response);
      if (response) {
        fetch(`/listings/allunverifiedlistings?landlord=${props.userId}`, {
          headers: {
            authorization: `Bearer ${props.cookies["Rent@SG Cookie"]}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            props.setUnverifiedListingData(data.data);
          });
      }
      props.closeVerifyModalHandler();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicListingID">
        <Form.Label>Listing Id</Form.Label>
        <Form.Control
          type="text"
          name="listingId"
          placeholder="Title for your listing"
          value={props.currentListingId}
          readOnly={true}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Upload Verification Photo</Form.Label>
        <Form.Control
          type="file"
          accept=".png,.jpg,.jpeg"
          name="photo"
          ref={verificationImageInputRef}
          required={true}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        <strong>Verify Listing</strong>
      </Button>
    </Form>
  );
};

export default VerifyForm;
