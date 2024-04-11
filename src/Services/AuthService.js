class AuthService {
  async loginUser(username, password) {
    let loginUrl = `${import.meta.env.VITE_API_URL}login`;
    //env
    let response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=password&username=${username}&password=${password}`,
    });
    return localStorage.setItem(
      'userToken',
      await response.json().then((res) => res.access_token)
    );
  }
}

export default AuthService;
