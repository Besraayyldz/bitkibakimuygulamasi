const BASE_URL = "http://172.20.10.3:7029/api"; // Backend IP ve port bilgisine göre güncel

// ✅ Giriş (Login)
export async function login(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error('Giriş başarısız!');
    return await response.json(); // { token: ... }
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
}

// ✅ Kayıt (Register)
export async function register(username, email, password) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) throw new Error('Kayıt başarısız!');
    return await response.json(); // { mesaj: ... }
  } catch (error) {
    console.error('Register error:', error.message);
    throw error;
  }
}

// ✅ Fotoğraf Yükleme (Upload)
export async function uploadImage(localUri) {
  const formData = new FormData();
  formData.append('file', {
    uri: localUri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  });

  try {
    const response = await fetch(`${BASE_URL}/upload/image`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) throw new Error('Yükleme başarısız!');
    return await response.json(); // { imageUrl: ... }
  } catch (error) {
    console.error('Upload error:', error.message);
    throw error;
  }
}
