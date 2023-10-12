import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreateListingForm = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    address: props.userAddress,
    housingtype: props.userHousingType,
    price: "",
    rentaltype: "",
    description: "",
    landlord: [props.userId],
  });

  const imageCoverInputRef = useRef(null);
  const imagesInputRef = useRef(null);
  const agreementInputRef = useRef(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    form.append("imageCover", imageCoverInputRef.current.files[0]);
    const selectedImages = Array.from(imagesInputRef.current.files);
    selectedImages.forEach((image, index) => {
      form.append(`images`, image);
    });

    const agreementForm = new FormData();
    agreementForm.append("agreement", agreementInputRef.current.files[0]);
    let newId;

    try {
      const response = await fetch("http://localhost:3001/listings/create", {
        method: "POST",
        headers: {
          authorization: `Bearer ${props.cookies["Rent@SG Cookie"]}`,
        },
        body: form,
      })
        .then((response) => response.json())
        .then((data) => {
          props.setBackendMessage(data.message);
          props.setBackendStatus(data.status.toUpperCase());
          newId = data.newListingId;
          // console.log(newId);
        })
        .then(async () => {
          await fetch(`http://localhost:3001/listings/agreement/${newId}`, {
            method: "POST",
            headers: {
              authorization: `Bearer ${props.cookies["Rent@SG Cookie"]}`,
            },
            body: agreementForm,
          });
          props.setDisplayListings("my listings");
          props.setShowToast(true);
          props.closeListingModalHandler();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const downloadAgreementHandler = () => {
    const filename = "Tenancy-Agreement-Sample.pdf";
    const backendUrl = `http://localhost:3001/listings/download/${filename}`;
    const link = document.createElement("a");
    link.href = backendUrl;
    link.target = "_blank";
    link.download = filename;
    link.click();
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
        <Col>
          <Form.Group className="mb-3" controlId="formFileAgreement">
            <Form.Label>Submit Tenancy Agreement</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="file"
                accept=".pdf"
                name="agreement"
                ref={agreementInputRef}
              ></Form.Control>
              <Button
                onClick={downloadAgreementHandler}
                className="ms-3 btn-sm pt-2 pb-2"
                style={{ minWidth: "20%" }}
              >
                Download Sample
              </Button>
            </div>
            {/* <a download={}></a> */}
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
          <strong>Create Listing</strong>
        </Button>
      </div>
    </Form>
  );
};

export default CreateListingForm;
