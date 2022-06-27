

function getLongAndLat() {
  return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

async function currLatLng() {
  let pos = await getLongAndLat();
  let latLng = {  }
  latLng.lng = pos.coords.longitude;
  latLng.lat = pos.coords.latitude;
  console.log(latLng);
  console.log(typeof latLng.lat);
  return latLng
}
currLatLng()
// async function sitesWithinRad(){
//   let userLatLng = await currLatLng()
//   console.log(userLatLng);
//   let response = await fetch('/nearest', { 
//     method: 'POST', 
//     headers: { 'Content-Type': 'application/json' }, 
//   body: JSON.stringify(userLatLng), 
//   })
//   let data = await response.json()
//   console.log(data);
//   console.log(results);

// }

.then(latLng => fetch('/api/nearest', { method: 'post', body: JSON.stringify(latLng), 
headers: { 'Content-Type': 'application/json' } }))
.then(response => response.json())
.then(results => console.log(results))

// sitesWithinRad()