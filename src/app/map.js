class Map {

  constructor(data) {
    this.class = data.class
    this.id = data.id
    this.name = data.name
    this.input = data.input
    this.key = data.key
    this.dom = ""
    this.map = require('google-maps')
    this.zoom = data.zoom
    this.lat = data.lat
    this.lng = data.lng
  }

  create() {
    this.dom = document.createElement("div")
    this.dom.className = this.class
    this.dom.id = this.id
    this.dom.name = this.name
    this.dom.placeholder = this.name
  }

  render() {
    this.create()
  }

  bind() {
    this.initGoogleMaps()
  }

  initGoogleMaps() {

    // Set maps configs and init
    const self = this
    this.map.KEY = this.key
    this.map.LIBRARIES = ['places']

    this.map.load(function(google) {
      
      // Create map
      const map = new google.maps.Map(document.getElementById(self.id), {
        zoom: self.zoom
      })

      // Get Geolocation and set position to map
      var request = new XMLHttpRequest()
      request.open("POST", `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBwYP2yO9AIMaC7wvjqP8pv5QqPapXPNG8`, true)
      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          const response = JSON.parse(this.response)
          self.lat = response.location.lat
          self.lng = response.location.lng

          const pos = {
            lat: self.lat,
            lng: self.lng
          }

          map.setCenter(pos)
        }
      }
      request.send()

      // Get Adress input and set Searchbox
      const inputSearch = document.getElementById(self.input)
      const searchBox = new google.maps.places.SearchBox(inputSearch)

      // Map Searchbox result to Google Maps
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds())
      })

      var markers = []

      // Manipulate maps on user select one place
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces()

        if (places.length == 0) {
          return
        }

        // Clear old markers
        markers.forEach(function(marker) {
          marker.setMap(null)
        })        
        markers = []

        // Loop the places and set properties
        var bounds = new google.maps.LatLngBounds()
        places.forEach(function(place) {
          if (!place.geometry) {
            //console.log("The place not contain geometry")
            return
          }

          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          }

          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }))

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        })
        map.fitBounds(bounds)
      })
    })
  }
}

export default Map