async function makeRequest(url: string, method: string) {
  const accessToken = window.localStorage.getItem('spotifyAccessToken');
  let token = null;
  let type = null;
  if (accessToken) {
     token = JSON.parse(accessToken).token;
     type = JSON.parse(accessToken).type
  } else {
    return
  }
  const options = {
    method: method,
    headers: {'Authorization': `${type} ${token}`},
  };
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error && json.error.status === 401) {
    window.localStorage.removeItem('spotifyAccessToken');
    window.location.reload();
  }
  return json
}

export async function getRelatedArtists(artistId: number) {
  const json = await makeRequest(
    `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    'GET'
  );
  return json.artists
}

export async function searchArtist(...args: any) {
  let searchTerm = '';
  // @ts-ignore
  for (var i = 0; i < arguments.length; i++) {
    if (searchTerm === '') {
      // @ts-ignore
      searchTerm += arguments[i];
    } else {
      // @ts-ignore
      searchTerm += `+${arguments[i]}`
    }
  }
  const json = await makeRequest(
    `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`,
    'GET',
    );
  // TODO: Serialize into common class format
  return json.artists.items;
}
