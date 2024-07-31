let map;
let markers = {
    sura: [],
    nueva_eps: [],
    sanitas: []
};

window.initMap = function() {
    const centerCoord = {lat: 6.231631706284588, lng: -75.60996634687761};
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: centerCoord
    });

    const locations = {
        sura: [
            {lat: 6.244747, lng: -75.581215},
            {lat: 6.242091557840658, lng: -75.5898310759024}
        ],
        nueva_eps: [
            {lat: 6.2002782626259325, lng: -75.58566624097332},
            {lat: 6.259713694929879, lng: -75.58452537607121}
        ],
        sanitas: [
            {lat: 6.235219939894283, lng: -75.5957834317619},
            {lat: 6.23034381626552, lng: -75.57286077532264}
        ]
    };

    const ubication = new google.maps.Marker({
        position: centerCoord,
        map: map
    });

    for (const [type, coords] of Object.entries(locations)) {
        coords.forEach(coord => {
            const marker = new google.maps.Marker({
                position: coord,
                map: map,
                visible: false
            });
            markers[type].push(marker);
        });
    }
};

window.showMarkers = function(type) {
    for (const key in markers) {
        markers[key].forEach(marker => marker.setVisible(false));
    }
    markers[type].forEach(marker => marker.setVisible(true));
};

  document.getElementById('appointments-btn').addEventListener('click', () => {
    window.location.href = 'appointment.html';
  });
  document.getElementById('profile-btn').addEventListener('click', () => {
    window.location.href = 'profile.html';
  });
  document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
  });
