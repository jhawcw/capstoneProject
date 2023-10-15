import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

const RentalsPage = (props) => {
  const downloadAgreementHandler = (tenancyAgreement) => {
    const backendUrl = `http://localhost:3001/listings/download/${tenancyAgreement}`;
    const link = document.createElement("a");
    link.href = backendUrl;
    link.target = "_blank";
    link.download = tenancyAgreement;
    link.click();
  };

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
            <th>Listing Address</th>
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
          {props.rentingsData.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center">
                You currently have no on going rentals
              </td>
            </tr>
          ) : (
            props.rentingsData.map((ele, ind) => {
              return (
                <tr key={ele._id}>
                  <td>{ele.listing.address}</td>
                  <td>{ele.landLord.fullName}</td>
                  <td>{ele.tenant.fullName}</td>
                  <td>{ele.tenancyAgreement}</td>
                  <td>
                    {new Date(ele.startDate).toLocaleDateString("en-sg", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    {new Date(ele.endDate).toLocaleDateString("en-sg", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>{ele.status}</td>
                  <td>
                    {/* <Button disabled={ele.status === "On going" ? true : false} className="mb-2">
                      Stop Renting
                    </Button> */}
                    <Button onClick={() => downloadAgreementHandler(ele.tenancyAgreement)}>
                      Download Agreement
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default RentalsPage;
