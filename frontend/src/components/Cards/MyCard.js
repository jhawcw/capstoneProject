import Card from "react-bootstrap/Card";
import MyButton from "../Buttons/Button";

const MyCard = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={"http://localhost:3001/public/img/listings/" + props.imageCover}
      />

      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.content}</Card.Text>
        <MyButton displayText="Rent" cssClass="btn btn-secondary" />
      </Card.Body>
    </Card>
  );
};

export default MyCard;
