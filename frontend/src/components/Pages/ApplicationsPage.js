import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

const ApplicationsPage = (props) => {
  const updateApplicationHandler = (applicationId) => {
    props.setApplicationListingId(applicationId);
    props.showApplicationModalHandler();
  };

  const displayListingHandler = (listingId) => {
    props.setCurrentListingId(`${listingId}`);
    props.setDisplayListings("single listing");
  };

  const adminUpdateApplicationHandler = (action, applicationListingId) => {
    props.setApplicationListingId(applicationListingId);

    if (action) {
      fetch(`/applications/updatestatus/${props.applicationListingId}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${props.cookies["Rent@SG Cookie"]}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          decision: "approve",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      fetch(`/applications/updatestatus/${props.applicationListingId}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${props.cookies["Rent@SG Cookie"]}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          decision: "reject",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
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
            <th>Listing Name</th>
            <th>Landlord Name</th>
            <th>Tenant Name</th>
            <th>Tenant Agreement</th>
            <th>Landlord Agreement</th>
            <th>Admin Approval</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.applicationsData.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center">
                You currently have no applications
              </td>
            </tr>
          ) : (
            props.applicationsData.map((ele, ind) => {
              return (
                <tr key={ind}>
                  <td onClick={() => displayListingHandler(ele.listing._id)}>
                    {ele.listing.title}
                  </td>
                  <td>{ele.landlord.fullName}</td>
                  <td>{ele.tenant.fullName}</td>
                  <td>{ele.application.tenantAgreement ? "✅" : "❌"}</td>
                  <td>{ele.application.landLordAgreement ? "✅" : "❌"}</td>
                  <td>{ele.application.adminApproval ? "✅" : "❌"}</td>
                  <td>{ele.application.status}</td>
                  <td>
                    {props.role === "admin" ? (
                      <div>
                        <Button
                          className="mb-2"
                          onClick={() => adminUpdateApplicationHandler(true, ele.application._id)}
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => adminUpdateApplicationHandler(false, ele.application._id)}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : props.role === "user" &&
                      ele.application.tenantAgreement &&
                      ele.application.landLordAgreement &&
                      ele.application.adminApproval ? (
                      <Button className="mx-auto w-100">Deposit 💰</Button>
                    ) : (
                      <Button
                        disabled={
                          props.role === "user"
                            ? ele.application.tenantAgreement
                            : ele.application.landLordAgreement
                        }
                        onClick={() => updateApplicationHandler(ele.application._id)}
                      >
                        Submit Agreement
                      </Button>
                    )}
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

export default ApplicationsPage;
