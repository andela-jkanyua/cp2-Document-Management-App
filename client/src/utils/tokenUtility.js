export function setAuthToken(token) {
  window.localStorage.setItem('token', token);
}
export function getAuthToken() {
  return window.localStorage.getItem('token');
}
export function removeAuthToken() {
  window.localStorage.removeItem('token');
}
