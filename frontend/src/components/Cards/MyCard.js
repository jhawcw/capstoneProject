import Card from "react-bootstrap/Card";
import MyButton from "../Buttons/Button";
import Stack from "react-bootstrap/Stack";

const MyCard = (props) => {
  console.log(props.listingData);
  return (
    <Card style={{ height: "100%" }}>
      <Stack gap={3}>
        <Card.Img
          variant="top"
          src={"http://localhost:3001/public/img/listings/" + props.imageCover}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
        />

        <Card.Body>
          <Card.Title
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.title}
          </Card.Title>
          <Card.Text>{props.content}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "#ffd4cf" }}>
          <MyButton displayText="Rent" cssClass="me-3 btn btn-secondary" />
          {props.listingData && !props.listingData.verified && (
            <MyButton displayText="Verify Now" cssClass="btn btn-primary" />
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
