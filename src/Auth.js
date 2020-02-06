let isAuthenticated_ = false;

export function isAuthenticated() {
  return isAuthenticated;
}

export function setAuthentication(authenticated) {
  isAuthenticated_ = authenticated;
}
