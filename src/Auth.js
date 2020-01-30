class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();

// let isAuthenticated_ = false
// export function isAuthenticated() {
//   return isAuthenticated
// }


// export setAuthentication(authenticated) {
//   isAuthenticated_ = authenticated
// }
