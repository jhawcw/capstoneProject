import { useState, useRef, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";

const Chatbox = (props) => {
  const [formData, setFormData] = useState({
    comment: "",
    id: props.userId,
  });
  const colRef = useRef();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/comments/create/${props.currentListingData._id}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${props.cookies["Rent@SG Cookie"]}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);
      if (response) {
        setFormData((prevData) => ({
          ...prevData,
          comment: "",
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the container when it mounts
    colRef.current.scrollTop = colRef.current.scrollHeight;
  }, [props.currentListingData.comments]);

  return (
    <>
      <Col
        md={12}
        className="rounded pt-2 mb-3"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #ffd4cf",
          maxHeight: "300px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        ref={colRef}
      >
        {props.currentListingData.comments.length > 0 ? (
          props.currentListingData.comments.map((ele, ind) => {
            return (
              <div
                style={{
                  backgroundColor: props.userId === ele.user._id ? "#febab2" : "#ffe8e5",
                  width: "fit-content",
                  alignSelf: props.userId === ele.user._id ? "flex-end" : "flex-start",
                }}
                className="rounded p-2 m-3"
                key={ind}
              >
                <p className="mb-0">
                  {ele.user.fullName}{" "}
                  <i style={{ fontWeight: "lighter", fontSize: "8px", verticalAlign: "middle" }}>
                    {" "}
                    {new Date(ele.createdAt).toLocaleDateString("en-SG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </i>
                  <br />
                  {ele.text}
                </p>
              </div>
            );
          })
        ) : (
          <p>No One has commented yet</p>
        )}
      </Col>

      <Col md={12} className="rounded" style={{ backgroundColor: "#FFFFFF" }}>
        <div style={{ backgroundColor: "", width: "100%" }} className="rounded">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={10}>
                <Form.Group className="mb-3" controlId="formBasicTitle" md={10}>
                  <Form.Label className="d-none">{props.userName}</Form.Label>
                  <Form.Control
                    type="text"
                    name="comment"
                    placeholder={`Comment as ${props.userName}`}
                    value={formData.comment}
                    onChange={handleChange}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button className="fw-bold" type="submit">
                  Comment!
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Col>
    </>
  );
};

export default Chatbox;
