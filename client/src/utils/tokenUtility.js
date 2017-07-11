export function setAuthToken(token) {
  window.localStorage.setItem('token', token);
}
export function getAuthToken() {
  return window.localStorage.getItem('token');
}
export function removeAuthToken() {
  window.localStorage.removeItem('token');
}

export function setUserDetails(user) {
  window.localStorage.setItem('userId', user);
}
export function getUserDetails() {
  return window.localStorage.getItem('userId');
}
export function removeUserDetails() {
  window.localStorage.removeItem('userId');
}
