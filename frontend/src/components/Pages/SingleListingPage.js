import { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

const SingleListingPage = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  // console.log(props.currentListingData);
  return (
    <>
      <Col md={6}>
        <img
          src={"http://localhost:3001/public/img/listings/" + props.currentListingData.imageCover}
          alt="cover"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
          className="rounded"
        ></img>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {props.currentListingData.images[0] !== null ? (
            props.currentListingData.images.map((ele, ind) => {
              return (
                <Carousel.Item key={ind}>
                  <img
                    src={"http://localhost:3001/public/img/listings/" + ele}
                    alt="cover"
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
                    className="rounded"
                  ></img>
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })
          ) : (
            <Carousel.Item>
              <Carousel.Caption>
                <h3>No other images</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      </Col>
      <Col md={6} className="pb-5">
        <h4>{props.currentListingData.title}</h4>
        <hr></hr>
        <p>
          Created On:{" "}
          {new Date(props.currentListingData.createdAt).toLocaleDateString("en-SG", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
        <p>Address: {props.currentListingData.address}</p>
        <p>Housing Type: {props.currentListingData.housingType}</p>
        <p>LandLord Name: {props.currentListingData.landlord[0].fullName}</p>
        <p>Monthly Rental Fee: SGD${props.currentListingData.price}</p>
        <p>Renting Out: {props.currentListingData.rentalType}</p>
        <hr></hr>
        <p>{props.currentListingData.description}</p>
        {props.currentListingData.landlord[0]._id === props.userId && (
          <Button className="me-3 btn btn-primary" onClick={props.deleteListingHandler}>
            Delete
          </Button>
        )}
        {props.currentListingData.landlord[0]._id === props.userId && (
          <Button className="me-3 btn btn-secondary" onClick={props.showEditListingModalHandler}>
            Edit
          </Button>
        )}
      </Col>
    </>
  );
};

export default SingleListingPage;
