import fetchService from 'src/services/FetchService';

const CONSTANTS = {
  AUTHENTICATE_ENDPOINT: 'api/v1/idm/authenticate',
  PERMISSIONS_ENDPOINT: 'api/v1/idm/permissions',
  VALIDATE_ENDPOINT: 'api/v1/idm/validate',
  FORGET_ENDPOINT: 'api/v1/idm/forget',
  VERIFY_ENDPOINT: 'api/v1/idm/verify',
  CHANGE_PASSWORD_ENDPOINT: 'api/v1/idm/change',
  LOAD_USER_ENDPOINT: 'api/v1/users',
};

export class AuthenticationService {
  async login(username, password) {
    try {
      this.logout();
      const authentication = await fetchService.request(
        CONSTANTS.AUTHENTICATE_ENDPOINT,
        {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        },
        false
      );

      const jwt = authentication.token;
      localStorage.setItem('authToken', jwt);
      localStorage.setItem('username', 'rana');
      localStorage.setItem('authUsername', authentication.username);

      const permissions = await fetchService.request(
        CONSTANTS.PERMISSIONS_ENDPOINT,
        { method: 'GET' },
        true
      );
      localStorage.setItem('permissions', permissions);

      return true;
    } catch (error) {
      if (error instanceof Error && error.message.includes('403')) {
        return false;
      }

      throw error;
    }
  }

  async isAuthenticated() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return false;
    }

    const isValid = await fetchService.request(
      CONSTANTS.VALIDATE_ENDPOINT,
      { method: 'GET' },
      true,
      false,
      this.logout
    );
    if (!isValid) {
      this.logout();
    }

    return isValid;
  }

  async loadAuthenticatedUser() {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('authUsername');
    if (!token || !username) {
      return null;
    }

    const user = await fetchService.request(
      `${CONSTANTS.LOAD_USER_ENDPOINT}/${username}`,
      {
        method: 'GET',
      },
      true
    );

    return user;
  }

  async forgetPassword(username, usingPhone) {
    let endpoint = `${CONSTANTS.FORGET_ENDPOINT}?username=${username}`;
    if (usingPhone) {
      endpoint += '&phone=true';
    }

    await fetchService.request(endpoint, { method: 'GET' }, false, true);
  }

  async verifyOtp(username, otp) {
    let endpoint = `${CONSTANTS.VERIFY_ENDPOINT}?username=${username}&otp=${btoa(otp)}`;
    return await fetchService.request(endpoint, { method: 'GET' }, false);
  }

  async changePassword(username, password) {
    let endpoint = `${CONSTANTS.CHANGE_PASSWORD_ENDPOINT}?username=${username}&password=${password}`;
    return await fetchService.request(endpoint, { method: 'PUT' }, false, true);
  }

  isAdmin() {
    const permissions = localStorage.getItem('permissions');
    if (!permissions) return false;

    let isAdmin = false;
    permissions.split(',').forEach((role) => {
      if (role === 'ADMIN') {
        isAdmin = true;
      }
    });

    return isAdmin;
  }

  isAdminOrSubAdmin() {
    const permissions = localStorage.getItem('permissions');
    if (!permissions) return false;
    return permissions.includes('ADMIN');
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('permissions');
    localStorage.removeItem('authUsername');
    localStorage.removeItem('username');
  }
}

export default new AuthenticationService();
