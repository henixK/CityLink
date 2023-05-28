const API_URL = 'https://api.teleport.org/api/cities/';

export async function getCityData(city) {
    // Construct the API URL with the specified city and embed the necessary data
    const url = `${API_URL}?search=${city}&embed=city%3Asearch-results%2Fcity%3Aitem%2Fcity%3Aurban_area%2Fua%3Ascores`;

    // Send a GET request to the API and await the response
    const response = await fetch(url);

    // Parse the response as JSON
    const data = await response.json();

    // Extract the relevant data from the response
    const { _embedded: { 'city:search-results': [firstResult] } } = data;
    const {
        _embedded: {
            'city:item': {
                name,
                _embedded: { 'city:urban_area': urbanArea } = {},
                location: { latlon: { latitude, longitude } }
            }
        }
    } = firstResult;

    // Create a cityData object with the extracted data
    const cityData = { name, categories: urbanArea ? urbanArea._embedded['ua:scores'] : null, latitude, longitude };

    // Log the cityData for debugging purposes
    console.log(cityData);

    // Return the cityData object
    return cityData;
}
