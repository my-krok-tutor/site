const MAPMODE = {
    NOVA_POSHTA: "novaposhta",
    ADDRESS: "address"
}
const novaposhtaKey = 'dc3449ee4807d3d33ba9b971f8b09190';
const novaposhtaURL = 'https://api.novaposhta.ua/v2.0/json/'; 

let markers = [];
let mode = MAPMODE.NOVA_POSHTA;


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: {
            lat: 50.00,
            lng: 36.21
        },
    });
    switch(mode){
        case MAPMODE.ADDRESS:
            google.maps.event.addListener(map, 'click', function (event) {
                if(markers.length > 0){
                    markers[0].setMap(null);
                }
                markers = [];
                const infowindow = new google.maps.InfoWindow();
                AddressOnClick(map, infowindow, { lat: event.latLng.lat(), lng: event.latLng.lng() });
            });  
            break;
        case MAPMODE.NOVA_POSHTA:
            map.setZoom(11);
            searchCity("київ");
            break;
    }
      
}

async function searchCity(name){
    const response = await fetch(novaposhtaURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "apiKey": novaposhtaKey,
            "modelName": "Address",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                "CityName": name,
                "Limit": 1
            }
        })
    });
    await response.json()
        .then(async (response)=>{
            if(response.success){
                const response2 = await fetch(novaposhtaURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "modelName": "AddressGeneral",
                        "calledMethod": "getWarehouses",
                        "methodProperties": {
                             "SettlementRef": response.data[0].Addresses[0].Ref
                        },
                        "apiKey": novaposhtaKey
                    })
                });
                await response2.json()
                    .then((response)=>{
                        if(response.success){
                            let centralPoint = Math.round(Math.random() *  response.data.length);
                            for(let i = 0; i < response.data.length; i++){
                                if(response.data[i].CategoryOfWarehouse === "Branch"){
                                    NovaPoshtaWarehouse(map, response.data[i]);
                                }
                            }
                            map.panTo(new google.maps.LatLng(Number(response.data[centralPoint].Latitude), Number(response.data[centralPoint].Longitude)));
                        }
                    });
            }
        });
}

function rounder(num){
    return Math.round((num + Number.EPSILON) * 10000) / 10000
}

async function NovaPoshtaWarehouse(map, warehouse) {
    const marker = new google.maps.Marker({
        position: { lat: Number(warehouse.Latitude), lng: Number(warehouse.Longitude) },
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
        map: map,
    });
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', function(){
        const infowindow = new google.maps.InfoWindow({
            content: "<div><h3>Nova Poshta Warehouse #" + warehouse.Number + "</h3><p>" + warehouse.ShortAddress + "</p></div>"
        });
        PAYPAL_addressFill({
            address_line_1: warehouse.ShortAddress,
            address_line_2: warehouse.Number,
            admin_area_2: warehouse.CityDescription,
            admin_area_1: warehouse.SettlementAreaDescription,
            postal_code: warehouse.SiteKey,
            country_code: 'UA'
        });
        infowindow.open(map, marker);
    });
}

async function AddressOnClick(map, infowindow, latlng) {
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
                markers.push(marker);
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