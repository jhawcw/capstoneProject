import Card from "react-bootstrap/Card";
import MyButton from "../Buttons/Button";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/esm/Button";

const MyCard = (props) => {
  // console.log(props.listingData);

  const buttonHandler = (event) => {
    event.stopPropagation();
    props.showRentModalHandler();
  };

  const cardClickHandler = () => {
    if (props.currentListingId === props.listingData._id) {
      props.setLoadingData(false);
    } else {
      props.setLoadingData(true);
    }
    props.setDisplayListings("single listing");
    props.setCurrentListingId(props.listingData._id);
  };
  return (
    <Card style={{ height: "100%", cursor: "pointer" }} className="" onClick={cardClickHandler}>
      <Stack gap={3} style={{ height: "100%" }}>
        <Card.Img
          variant="top"
          src={"http://localhost:3001/public/img/listings/" + props.imageCover}
          style={{ maxWidth: "100%", maxHeight: "50%", objectFit: "cover" }}
        />

        <Card.Body style={{ height: "50%" }}>
          <Card.Title
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
              height: "100%",
            }}
          >
            {props.title}
          </Card.Title>
          <Card.Text>{props.content}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "#ffd4cf", height: "13%" }}>
          {props.listingData && props.userId !== props.listingData.landlord[0] && (
            // <MyButton
            //   displayText="Rent"
            //   cssClass="me-3 btn btn-secondary"
            //   clickHandler={() => console.log("hello")}
            // />
            <Button className="me-3 btn btn-secondary" onClick={buttonHandler}>
              Rent
            </Button>
          )}

          {props.listingData &&
            !props.listingData.verified &&
            props.userId !== props.listingData.landlord[0] && (
              <MyButton
                displayText="Verify Now"
                cssClass="btn btn-primary"
                clickHandler={props.showVerifyModalHandler}
                listingId={props.listingData._id}
              />
            )}
          {/* {props.listingData.verified ? (
            <MyButton displayText="Verify Now" cssClass="btn btn-primary" />
          ) : null} */}
        </Card.Footer>
      </Stack>
    </Card>
  );
};

export default MyCard;
