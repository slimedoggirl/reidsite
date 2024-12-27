function initMap() {
    // The styles array from Snazzy Maps
    const mapStyles = [
        { "featureType": "administrative", "elementType": "labels", "stylers": [{ "visibility": "off" }] },
        { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] },
        { "featureType": "administrative.country", "elementType": "labels", "stylers": [{ "visibility": "simplified" }] },
        { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] },
        { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "color": "#e3f439" }, { "gamma": "0.67" }] },
        { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] },
        { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] },
        { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] },
        { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] },
        { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#9abdff" }, { "visibility": "on" }] }
    ];

    // Initialize the map with custom styles
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
        styles: mapStyles
    });

    // Load existing markers from localStorage
    loadMarkers(map);

    // Add click event listener to the map
    map.addListener('click', (mapsMouseEvent) => {
        const position = mapsMouseEvent.latLng;
        addMarker(map, position);
        saveMarker(position);
    });

    // Save marker position to localStorage
    function saveMarker(position) {
        const markers = JSON.parse(localStorage.getItem('markers')) || [];
        markers.push({
            lat: position.lat(),
            lng: position.lng(),
            icon: 'images/flowerMap.png'  // Save the relative path to the icon
        });
        localStorage.setItem('markers', JSON.stringify(markers));
    }

    // Load markers from localStorage
    function loadMarkers(map) {
        const markers = JSON.parse(localStorage.getItem('markers')) || [];
        markers.forEach((markerData) => {
            const position = new google.maps.LatLng(markerData.lat, markerData.lng);
            addMarker(map, position, markerData.icon);
        });
    }

    // Add marker to the map
    function addMarker(map, position, icon = 'images/flowerMap.png') {
        const flowerImg = document.createElement('img');
        flowerImg.src = icon;

        // Check if google.maps.marker is defined and AdvancedMarkerElement is available
        if (google.maps.marker && 'AdvancedMarkerElement' in google.maps.marker) {
            new google.maps.marker.AdvancedMarkerElement({
                map: map,
                position: position,
                content: flowerImg,
                title: 'A marker using flowerMap.png'
            });
        } else {
            // Fallback to a standard marker if AdvancedMarkerElement is not available
            new google.maps.Marker({
                map: map,
                position: position,
                title: 'A marker using flowerMap.png',
                icon: icon
            });
        }
    }
}

// Expose the initMap function globally
window.initMap = initMap;