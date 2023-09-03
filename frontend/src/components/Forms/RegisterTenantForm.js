import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const RegisterTenantForm = (props) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  // Function to handle radio button clicks
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value); // Update the selectedGender state
  };

  const [formData, setFormData] = useState({
    fullname: "",
    sex: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "sex") {
      handleGenderChange(event);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password" || name === "confirmPassword") {
      if (name === "password" && value !== formData.confirmPassword) {
        setPasswordMatchError(true);
      } else if (name === "confirmPassword" && value !== formData.password) {
        setPasswordMatchError(true);
      } else {
        setPasswordMatchError(false);
      }
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3001/users/tenant/register", {
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
        props.handleClose();
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
          placeholder="Enter Full Name"
          name="fullname"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicSex">
        <Form.Label>Gender</Form.Label>
        <div key="radio-group" className="mb-3">
          <Form.Check
            inline
            type="radio"
            id="Male"
            label="Male"
            value="MALE"
            name="sex"
            checked={selectedGender === "MALE"}
            onChange={handleChange}
            required
          />
          <Form.Check
            inline
            type="radio"
            id="Female"
            label="Female"
            value="FEMALE"
            name="sex"
            checked={selectedGender === "FEMALE"}
            onChange={handleChange}
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Re-enter Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          required
        />
        {passwordMatchError && <div className="text-danger">Passwords do not match.</div>}
      </Form.Group>
      <div className="text-center">
        <Button variant="primary" type="submit">
          <strong>Register As Tenant</strong>
        </Button>
      </div>
    </Form>
  );
};

export default RegisterTenantForm;
