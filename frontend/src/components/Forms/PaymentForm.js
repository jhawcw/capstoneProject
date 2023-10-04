import { useState, useRef } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PaymentForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    cardNumber: "",
    name: "",
    expiryDate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Your payment handling logic here
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group>
            <CardElement />
            <Button type="submit" disabled={!stripe}>
              Pay
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default PaymentForm;
