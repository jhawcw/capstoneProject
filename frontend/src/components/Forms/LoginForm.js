import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({
    fullname: "",
    password: "",
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
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        props.setUserId(data.userID);
        props.setRole(data.role);
        props.setCookie("Rent@SG Cookie", data.token);
        props.loginHandler();
        props.closeLoginModalHandler();
      } else {
        console.log("Wrong credentials lol");
      }
    } catch (error) {
      console.log(error, "this is the error");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicFullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="fullname"
          placeholder="Enter Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required={true}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={true}
        />
      </Form.Group>
      <div className="text-center">
        <Button variant="primary" type="submit">
          <strong>Login</strong>
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
