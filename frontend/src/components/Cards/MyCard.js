import Card from "react-bootstrap/Card";
import MyButton from "../Buttons/Button";
import Stack from "react-bootstrap/Stack";

const MyCard = (props) => {
  // console.log(props.listingData);
  return (
    <Card style={{ height: "100%" }} className="">
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
          {!props.listingData && <MyButton displayText="Rent" cssClass="me-3 btn btn-secondary" />}

          {props.listingData && !props.listingData.verified && (
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
