const apiKey = process.env.REACT_APP_SONGKICK_API_KEY;

async function makeSongkickRequest(url: string, method: string) {
  const options = {
    method: method,
  };
  return fetch(url, options);
}

export async function getConcertsFromSpotifyArtistList(artistNameList: any) {
  let availableConcertPromises: any = [];
  for (let name of artistNameList) {
    let concerts = getConcertFromSpotifyArtist(name.name); // Promise of concert list
    if (concerts) {
      availableConcertPromises = availableConcertPromises.concat(concerts)
    }
  }
  const availableConcerts: any = [];
    for (let promise of availableConcertPromises) {
      promise.then(((response: any) => {
       if (Array.isArray(response)) {
         for (let concert of response) {
           availableConcerts.push(concert);
         }
       }
      }))
    }
  return availableConcerts
}

export async function getConcertFromSpotifyArtist(artistName: string) {
    const artist = await getSongkickArtistFromSpotifyArtist(artistName);
    if (artist) {
      return await getConcerts(artist.id);
    }
}

async function getConcerts(artistId: number) {
  const response = await makeSongkickRequest(
   `https://api.songkick.com/api/3.0/artists/${artistId}/calendar.json?apikey=${apiKey}`,
    'GET'
  );
  const json = await response.json();
  return json.resultsPage.results.event || []
}

async function getSongkickArtistFromSpotifyArtist(name: string) {
    const artist = await searchArtist(name);
    return artist ? artist[0] : null
}


export async function getLocations(city: string) {
  const locations = await searchMetroId(city);
  return locations.resultsPage.results.location
}

async function searchMetroId(searchQuery: string) {
  const response = await makeSongkickRequest(
    `https://api.songkick.com/api/3.0/search/locations.json?query=${searchQuery}&apikey=${apiKey}`,
      'GET'
  );
  return await response.json();
}

export async function searchArtist(...args: any[]) {
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
  const response = await makeSongkickRequest(
   `https://api.songkick.com/api/3.0/search/artists.json?apikey=${apiKey}&query=${searchTerm}`,
    'GET'
  );
  if (response.status === 401) {
    return []
  }
  const json = await response.json();
  if (!json.resultsPage.results.artist) {
  }
  return json.resultsPage.results.artist
}
