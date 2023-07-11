// ---START---CALL SERVER API - calling server side APIs (token & person) to get the person data for prefilling form
function callServerAPIs() {
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get("code");
  const state = urlParams.get("state");

  console.log("Auth Code:", authCode);
  console.log("State:", state);

  // invoke AJAX call from frontend client side to your backend server side

  fetch("/getPersonData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      authCode: authCode,
      state: state,
    }),
  })
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        throw new Error("Error: " + response.status);
      }
    })
    .then(function (result) {
      console.log("result", result);
    })
    .catch(function (error) {
      alert("ERROR: " + error.message);
    });
}

export default callServerAPIs;
