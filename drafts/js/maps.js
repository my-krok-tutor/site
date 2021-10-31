const MAPMODE = {
    NOVA_POSHTA: "novaposhta",
    ADDRESS: "address"
}
const novaposhtaKey = 'dc3449ee4807d3d33ba9b971f8b09190';
const novaposhtaURL = 'https://api.novaposhta.ua/v2.0/json/'; 
const cities = [
    { selector: "Kyiv", ukr: "Київ", coords: { lat: 50.2700, lng: 30.3124 } },
    { selector: "Kharkiv", ukr: "Харків", coords: { lat: 50.0160, lng: 36.1353 } },
    { selector: "Odesa", ukr: "Одеса", coords: { lat: 46.2986, lng: 30.4436 } },
    { selector: "Dnipro", ukr: "Дніпро", coords: { lat: 48.2700, lng: 35.0200 } },
    { selector: "Donetsk", ukr: "Донецьк", coords: { lat: 48.0100, lng: 37.4819 } },
    { selector: "Zaporizhzhia", ukr: "Запоріжжя", coords: { lat: 47.5000, lng: 35.1000 } },
    { selector: "Lviv", ukr: "Львів", coords: { lat: 49.4949, lng: 24.0051 } },
    /*Lviv	Львів	
    Kryvyi Rih	Кривий Ріг	
    Mykolaiv	Миколаїв	
    Mariupol	Маріуполь	
    Luhansk	Луганськ	
    Sevastopol	Севастополь	
    Vinnytsia	Вінниця	
    Makiivka	Макіївка
    Kherson	Херсон
    Poltava	Полтава
    Chernihiv	Чернігів
    Cherkasy	Черкаси
    Khmelnytskyi	Хмельницький
    Chernivtsi	Чернівці
    Zhytomyr	Житомир
    Sumy	Суми
    Rivne	Рівне
    Ivano-Frankivsk	Івано-Франківськ
    Kropyvnytskyi	Кропивницький	Kirovohrad Oblast	O	227,413	254,103	−10.50%	Kropyvnytskyi
    Ternopil	Тернопіль	Ternopil Oblast	O	221,820	227,755	−2.61%	Ternopil
    Kremenchuk	Кременчук	Poltava Oblast	O	220,065	234,073	−5.98%	Kremenchuk
    Lutsk	Луцьк	Volyn Oblast	O	216,887	208,816	+3.87%	Lutsk
    Bila Tserkva	Біла Церква	Kyiv Oblast	O	208,944	200,131	+4.40%	Bila Tserkva
    Kramatorsk	Краматорськ	Donetsk Oblast	O	153,911	181,025	−14.98%	Kramatorsk
    Melitopol	Мелітополь	Zaporizhzhia Oblast	O	153,112	160,657	−4.70%	Melitopol
    Kerch	Керч	Crimea	O	151,025	157,007	−3.81%	Kerch
    Uzhhorod	Ужгород	Zakarpattia Oblast	O	114,897	117,317	−2.06%	Uzhhorod
    Nikopol	Нікополь	Dnipropetrovsk Oblast	O	110,669	136,280	−18.79%	Nikopol
    Berdiansk	Бердянськ	Zaporizhzhia Oblast	O	110,455	121,692	−9.23%	Berdiansk
    Sloviansk	Слов'янськ	Donetsk Oblast	O	109,812	124,829	−12.03%	Sloviansk
    Yevpatoria	Євпаторія	Crimea	O	107,650	105,915	+1.64%	Yevpatoria
    Alchevsk	Алчевськ	Luhansk Oblast	O	107,438	119,193	−9.86%	Alchevsk
    Brovary	Бровари	Kyiv Oblast	O	106,346	86,839	+22.46%	Brovary
    Pavlohrad	Павлоград	Dnipropetrovsk Oblast	O	105,238	118,816	−11.43%	Pavlohrad
    Sieverodonetsk	Сєверодонецьк	Luhansk Oblast	O	103,479	119,940	−13.72%	Syevyerodonetsk
    Kamianets-Podilskyi	Кам'янець-Подільський	Khmelnytskyi Oblast	O	99,755	99,610	+0.15%	Kamianets-Podilskyi
    Lysychansk	Лисичанськ	Luhansk Oblast	O	97,251	115,229	−15.60%	Lysychansk
    Konotop	Конотоп	Sumy Oblast	O	86,267	92,657	−6.90%	Konotop
    Mukachevo	Мукачево	Zakarpattia Oblast	O	85,881	82,346	+4.29%	Mukachevo
    Uman	Умань	Cherkasy Oblast	O	83,162	88,735	−6.28%	Uman
    Khrustalnyi	Хрустальний	Luhansk Oblast	O	80,287	94,875	−15.38%	Khrustalnyi
    Oleksandriia	Олександрія	Kirovohrad Oblast	O	79,289	93,357	−15.07%	Oleksandriia
    Yalta	Ялта	Crimea	O	79,272	81,654	−2.92%	Yalta
    Yenakiieve	Єнакієве	Donetsk Oblast	O	77,968	103,997	−25.03%	Yenakiieve
    Drohobych	Дрогобич	Lviv Oblast	O	76,044	79,119	−3.89%	Drohobych
    Berdychiv	Бердичів	Zhytomyr Oblast	O	75,439	87,575	−13.86%	Berdychiv
    Shostka	Шостка	Sumy Oblast	O	75,024	87,130	−13.89%	Shostka
    Kadiyivka	Кадіївка	Luhansk Oblast	O	74,546	90,152	−17.31%	Stakhanov
    Bakhmut	Бахмут	Donetsk Oblast	O	74,072	82,916	−10.67%	Bakhmut
    Izmail	Ізмаїл	Odessa Oblast	O	71,780	84,815	−15.37%	Izmail
    Kostiantynivka	Костянтинівка	Donetsk Oblast	O	70,841	95,111	−25.52%	Kostiantynivka
    Novomoskovsk	Новомосковськ	Dnipropetrovsk Oblast	O	70,550	72,439	−2.61%	Novomoskovsk
    Nizhyn	Ніжин	Chernihiv Oblast	O	69,046	76,625	−9.89%	`*/
]

let markers = [];
let mode = MAPMODE.NOVA_POSHTA;

function fillSelect(select){
    select.addEventListener('change', (event) => {
        map.setZoom(11);
        searchCity(event.target.value);
    })
    for(let i = 0; i < cities.length; i++){
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = cities[i].selector;
        select.appendChild(opt);
    }
}

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
            searchCity(0);
            break;
    }
      
}

async function searchCity(selectedIndex){
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
                "CityName": cities[selectedIndex].ukr.toLowerCase(),
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
                            for(let i = 0; i < markers.length; i++){
                                markers[i].setMap(null);
                            }
                            markers = [];
                            //let centralPoint = Math.round(Math.random() *  response.data.length);
                            for(let i = 0; i < response.data.length; i++){
                                if(response.data[i].CategoryOfWarehouse === "Branch"){
                                    NovaPoshtaWarehouse(map, response.data[i]);
                                }
                            }
                            map.panTo(new google.maps.LatLng(cities[selectedIndex].coords.lat, cities[selectedIndex].coords.lng));
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