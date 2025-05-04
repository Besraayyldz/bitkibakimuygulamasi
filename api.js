const BASE_URL = 'http://10.57.105.1:7029/api/Auth';

export async function login(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function register(username, email, password) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}
