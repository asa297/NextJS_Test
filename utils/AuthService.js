import cookie from "js-cookie";

export const getToken = () => {
  // Retrieves the user token from localStorage
  return cookie.get("token");
};

export const setToken = token => {
  if (process.browser) {
    cookie.set("token", token, {
      expires: 1,
      path: "/"
    });
  }
};

// {
//   getProfile() {
//     // Retrieves the profile data from localStorage
//     const profile = localStorage.getItem("profile");
//     return profile ? JSON.parse(localStorage.profile) : {};
//   }

//   logout() {
//     // Clear user token and profile data from localStorage
//     localStorage.removeItem("id_token");
//     localStorage.removeItem("profile");
//   }

//   _checkStatus(response) {
//     // raises an error in case response status is not a success
//     if (response.status >= 200 && response.status < 300) {
//       return response;
//     } else {
//       var error = new Error(response.statusText);
//       error.response = response;
//       throw error;
//     }
//   }

//   fetch(url, options) {
//     // performs api calls sending the required authentication headers
//     const headers = {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     };

//     if (this.loggedIn()) {
//       headers["Authorization"] = "Bearer " + this.getToken();
//     }

//     return fetch(url, {
//       headers,
//       ...options
//     })
//       .then(this._checkStatus)
//       .then(response => response.json());
//   }
// }
