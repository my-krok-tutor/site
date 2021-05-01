function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: {
            lat: 50.00,
            lng: 36.21
        },
    });
    google.maps.event.addListener(map, 'click', function (event) {
        const myLatlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
        const infowindow = new google.maps.InfoWindow();
        geocodeLatLng(map, infowindow, { lat: event.latLng.lat(), lng: event.latLng.lng() });
    });    
}

function rounder(num){
    return Math.round((num + Number.EPSILON) * 10000) / 10000
}

async function geocodeLatLng(map, infowindow, latlng) {
    const request = await fetch('https://api.opencagedata.com/geocode/v1/json?q=' + rounder(latlng.lat) + '+' + rounder(latlng.lng) + '&key=9b3ec12ba05f4e7d8759e788cc9a8595');
    await request.json()
        .then((response)=>{
            const obj = JSON.parse(JSON.stringify(response));
            if(obj.results.length > 0){
                map.setZoom(18);
                const marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                });
                infowindow.setContent(obj.results[0].formatted);
                infowindow.open(map, marker);
                if(obj.results[0].components.country_code == "ua"){
                    PAYPAL_addressFill({
                        address_line_1: obj.results[0].components.house_number + " " + obj.results[0].components.road,
                        address_line_2: "",
                        admin_area_2: obj.results[0].components.city,
                        admin_area_1: obj.results[0].components.state,
                        postal_code: obj.results[0].components.postcode,
                        country_code: obj.results[0].components["ISO_3166-1_alpha-2"]
                    })
                }
                else{
                    alert("Not ukraine!");
                }
            }
        });
}