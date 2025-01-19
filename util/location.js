const GOOGLE_API_KEY = "AIzaSyCf2J931v0pUUgl8-NZF21axRpp_bMg8uk";

export function getGoogleMapPreview (lat,long){
    console.log(lat, long);
    const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${GOOGLE_API_KEY}
`;

    return mapPreviewUrl;
}

export async function getAddress(lat, lng){
    const uri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
     const response = await fetch(uri)
     if(!response.ok){
        throw new Error("Failed to fetch address");
     }
     const data = response.json();
     console.log("Data is", data)
     const address = data.results[0].formatted_address
     return address
}