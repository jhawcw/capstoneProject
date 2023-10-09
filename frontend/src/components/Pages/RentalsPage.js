import Table from "react-bootstrap/Table";

const RentalsPage = (props) => {
  return (
    <div
      style={{
        borderWidth: "2px",
        borderStyle: "solid",
        borderRadius: "10px",
        overflow: "hidden",
        color: "#dee2e6",
      }}
    >
      <Table striped className="text-center mb-0" style={{ verticalAlign: "middle" }}>
        <thead style={{ verticalAlign: "middle" }}>
          <tr>
            <th>Listing Name</th>
            <th>Landlord Name</th>
            <th>Tenant Name</th>
            <th>Tenancy Agreement</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default RentalsPage;
