/* global require */
import cookie from "js-cookie";
const { Config } = require("../ironeko.config.js");
import WPAPI from "wpapi";

const wp = new WPAPI({ endpoint: Config.apiUrl });

export const getuserInfo = async token => {
  var _isLoggedIn;
  var _user;
  var _error;
  if (token) {
    _isLoggedIn = true;
    wp.setHeaders("Authorization", `Bearer ${token}`);

    await wp
      .users()
      .me()
      .then(data => {
        _user = data;
      })
      .catch(err => {
        _error = err;
        logout();
      });
  } else {
    _isLoggedIn = false;
  }
  return {
    user: _user,
    isLoggedIn: _isLoggedIn,
    error: _error
  };
};

export const retrieveToken = () => {
  return cookie.get("token");
};

export const login = async ({ username, password }) => {
  let response;

  await fetch(`${Config.apiUrl}/jwt-auth/v1/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(r => r.json())
    .then(async res => {
      if (res.token) {
        // We set the cookie
        cookie.set("token", res.token, { expires: 7 });
        response = res.token;
      } else {
        response = res;
      }
    });
  return response;
};

export const register = async props => {
  let response = "";
  const { username, password, email } = props;

  await fetch(`${Config.apiUrl}/wp/v2/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email })
  })
    .then(r => r.json())
    .then(res => {
      if (res.code == 200) {
        response = { message: "Your account was created." };
      } else {
        response = res;
      }
    });

  return response;
};

export const logout = () => {
  cookie.remove("token");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  // Config.AUTH_TOKEN = undefined;
  //Router.push('/login')
};
