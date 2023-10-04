import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

const stripePromise = loadStripe(
  "pk_test_51MxWA9LwzK2ZnIKMJfqwM9euD1ubGrXRUsvLUkN02InIsfa25fxK1Gdo5ryK5IvyQYGWmNBQCOp3MtjgKPeLVU9H005Pb1qvft"
);

const ApplicationsPage = (props) => {
  // const stripe = useStripe();
  // const elements = useElements();
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

  const paymentHandler = async (listingId) => {
    console.log("paid");

    // if (!stripe || !elements) {
    //   // Stripe.js has not loaded yet.
    //   return;
    // }

    // // Use stripe and elements to handle payment
    // const result = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement),
    // });
    // console.log(result);

    // if (result.error) {
    //   console.error(result.error.message);
    // } else {
    //   // Payment method created successfully, submit the form to your backend
    //   // Send the payment method ID to your server
    //   const paymentMethodId = result.paymentMethod.id;
    //   // Make a request to your backend to handle the payment
    //   // Example: axios.post('http://localhost:3001/pay', { paymentMethodId });
    // }

    try {
      const response = await fetch(`/rentings/checkout-session/${listingId}`, {
        headers: {
          authorization: `Bearer ${props.cookies["Rent@SG Cookie"]}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
          if (data.status === "success" && data.session) {
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
              sessionId: data.session.id,
            });
            if (error) {
              alert("something went wrong");
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Elements stripe={stripePromise}>
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
                            onClick={() =>
                              adminUpdateApplicationHandler(false, ele.application._id)
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      ) : props.role === "user" &&
                        ele.application.tenantAgreement &&
                        ele.application.landLordAgreement &&
                        ele.application.adminApproval ? (
                        <Button
                          className="mx-auto w-100"
                          onClick={() => paymentHandler(ele.listing._id)}
                        >
                          Deposit 💰
                        </Button>
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
    </Elements>
  );
};

export default ApplicationsPage;
