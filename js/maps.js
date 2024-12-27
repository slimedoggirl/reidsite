// Initialize and load the map with custom styles and marker functionality
async function initMap() {
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

    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Initialize the map with custom styles
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 },
        styles: mapStyles
    });

    // Load existing markers from localStorage
    loadMarkers(map);

    // Add click event listener to the map
    map.addListener('click', (mapsMouseEvent: google.maps.MapMouseEvent) => {
        const position = mapsMouseEvent.latLng;
        if (position) {
            addMarker(map, position);
            saveMarker(position);
        }
    });

    // Save marker position to localStorage
    function saveMarker(position: google.maps.LatLng) {
        const markers = JSON.parse(localStorage.getItem('markers') || '[]');
        markers.push({
            lat: position.lat(),
            lng: position.lng(),
            icon: 'images/flowerMap.png'  // Save the relative path to the icon
        });
        localStorage.setItem('markers', JSON.stringify(markers));
    }

    // Load markers from localStorage
    function loadMarkers(map: google.maps.Map) {
        const markers = JSON.parse(localStorage.getItem('markers') || '[]');
        markers.forEach((markerData: { lat: number, lng: number, icon: string }) => {
            const position = new google.maps.LatLng(markerData.lat, markerData.lng);
            addMarker(map, position, markerData.icon);
        });
    }

    // Add marker to the map
    function addMarker(map: google.maps.Map, position: google.maps.LatLng, icon: string = 'images/flowerMap.png') {
        const flowerImg = document.createElement('img');
        flowerImg.src = icon;
        flowerImg.style.width = '32px';  // Adjust the size of the image if necessary
        flowerImg.style.height = '32px';
        flowerImg.style.transform = 'translate(-50%, -100%)';  // Align the image properly

        // Check if AdvancedMarkerElement is available
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
declare global {
    interface Window {
        initMap: () => void;
    }
}
window.initMap = initMap;