function callAuthoriseApi(authApiUrl, clientId, attributes, purpose, state, redirectUrl) {
  var authoriseUrl =
    authApiUrl +
    "?client_id=" +
    clientId +
    "&attributes=" +
    attributes +
    "&purpose=" +
    purpose +
    "&state=" +
    encodeURIComponent(state) +
    "&redirect_uri=" +
    redirectUrl;

  window.location = authoriseUrl;
}

export default callAuthoriseApi;
