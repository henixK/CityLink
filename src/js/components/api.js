const API_URL = 'https://api.teleport.org/api/cities/';

export async function getCityData(city) {
    const url = `${API_URL}?search=${city}&embed=city%3Asearch-results%2Fcity%3Aitem%2Fcity%3Aurban_area%2Fua%3Ascores`;
    const response = await fetch(url);
    const data = await response.json();
    const { _embedded: { 'city:search-results': [firstResult] } } = data;
    const { _embedded: { 'city:item': { name, _embedded: { 'city:urban_area': urbanArea } = {}, location: { latlon: { latitude, longitude } } } } } = firstResult;
    const cityData = { name, categories: urbanArea ? urbanArea._embedded['ua:scores'] : null, latitude, longitude };
    console.log(cityData)
    return cityData;
}
