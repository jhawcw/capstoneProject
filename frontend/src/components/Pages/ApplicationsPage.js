import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

const ApplicationsPage = (props) => {
  return (
    <Table striped className="text-center">
      <thead>
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
                <th>{ele.listing.title}</th>
                <th>{ele.landlord.fullName}</th>
                <th>{ele.tenant.fullName}</th>
                <th>{ele.application.tenantAgreement ? "Submitted" : "Not submitted"}</th>
                <th>{ele.application.landLordAgreement ? "Submitted" : "Not submitted"}</th>
                <th>{ele.application.adminApproval ? "Approved" : "-"}</th>
                <th>
                  {ele.application.tenantAgreement
                    ? ele.application.landLordAgreement
                      ? ele.application.adminApproval
                        ? "Application Approved"
                        : "Pending Admin Approval"
                      : "Pending Landlord Submission"
                    : "Pending Tenant Submission"}
                </th>
                <th>
                  <Button disabled={ele.application.tenantAgreement}>Submit Agreement</Button>
                </th>
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
};

export default ApplicationsPage;
