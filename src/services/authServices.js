import http from "./httpServices";
import jwtDecode from "jwt-decode";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

// eslint-disable-next-line
export default { login, loginWithJwt, logout, getCurrentUser };
