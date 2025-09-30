// Simple API utility for microfrontends
export const postToMockAPI = async (endpoint, data, token = '') => {
  try {
    const response = await fetch(`https://68db5a3c23ebc87faa32af49.mockapi.io/users/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }) // Include token if provided
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        token: token // Include token in body if needed by mock API
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error posting to mock API:', error);
    throw error;
  }
};