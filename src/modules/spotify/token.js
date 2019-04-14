const clientId = '40a9eba5a39647bba7524c7225566cad';
const clientSecret = '81686ab75d1344a1926c6f86093373b1';

export async function getAccessToken() {
  const headers = {
    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const options = {
    method: 'POST',
    headers: headers,
    body: "grant_type=client_credentials"
  };

  const response = await fetch('https://accounts.spotify.com/api/token', options);
}