import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EditListingForm = (props) => {
  const [formData, setFormData] = useState({
    title: props.currentListingData.title,
    address: props.currentListingData.address,
    housingtype: props.currentListingData.housingType,
    price: props.currentListingData.price,
    rentaltype: props.currentListingData.rentalType,
    description: props.currentListingData.description,
    landlord: [props.userId],
  });

  const imageCoverInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    if (imageCoverInputRef.current.files[0]) {
      form.append("imageCover", imageCoverInputRef.current.files[0]);
    }

    if (imagesInputRef.current.files[0]) {
      const selectedImages = Array.from(imagesInputRef.current.files);
      selectedImages.forEach((image, index) => {
        form.append(`images`, image);
      });
    }
    // form.forEach((value, key) => {
    //   if (key === "imageCover") {
    //     console.log(`Key: ${key}, Value: ${value}`);
    //   }
    // });

    try {
      const response = await fetch(
        `http://localhost:3001/listings/${props.currentListingData._id}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${props.cookies["Rent@SG Cookie"]}`,
          },
          body: form,
        }
      );
      if (response) {
        props.setLoadingData(true);
        fetch(`/listings/${props.currentListingData._id}`)
          .then((response) => response.json())
          .then((data) => {
            props.setCurrentListingData(data.data.data);
            props.setLoadingData(false);
          });
      }
    } catch (err) {
      console.log(err);
    }

    props.closeEditListingModalHandler();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePriceChange = (event) => {
    let { name, value } = event.target;

    value = parseFloat(value.replace(/[^\d.]/g, "")).toFixed(2);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Title for your listing"
              value={formData.title}
              onChange={handleChange}
              required={true}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Rental Fee/Month (SGD)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              placeholder="SGD$700.00"
              onChange={handleChange}
              onBlur={handlePriceChange}
              required={true}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicHousingType">
            <Form.Label>Housing Type</Form.Label>
            <Form.Control
              plaintext
              name="housingtype"
              value={formData.housingtype}
              readOnly={true}
              required={true}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group className="mb-3" controlId="formBasicDropdown">
            <Form.Label>I am renting out...</Form.Label>
            <Form.Select
              name="rentaltype"
              value={formData.rentaltype}
              onChange={handleChange}
              required
            >
              <option value="">Choose...</option>
              <option value="Room">Room</option>
              <option value="Masterbed Room">Masterbed Room</option>
              <option value="Unit">Entire Unit</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              plaintext
              name="address"
              value={formData.address}
              readOnly={true}
              required={true}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formFileSingle">
            <Form.Label>Listing Display Picture</Form.Label>
            <Form.Control
              type="file"
              name="imageCover"
              accept=".png,.jpg,.jpeg"
              ref={imageCoverInputRef}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formFileMultiple">
            <Form.Label>Other Listing Pictures</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept=".png,.jpg,.jpeg"
              name="images"
              ref={imagesInputRef}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={formData.description}
            placeholder="Free wifi/Split utilities"
            onChange={handleChange}
            required={true}
          />
        </Form.Group>
      </Row>

      <div className="text-center">
        <Button variant="primary" type="submit">
          <strong>Update Listing</strong>
        </Button>
      </div>
    </Form>
  );
};

export default EditListingForm;