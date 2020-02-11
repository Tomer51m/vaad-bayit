let isAuthenticated_ = false

export function isAuthenticated() {
  return isAuthenticated_
}


export function setAuthentication(authenticated) {
  isAuthenticated_ = authenticated
}
