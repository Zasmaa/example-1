import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Header from './Components/Header';
import Content from './Components/Content';
//import Map from './Components/Map';
import List from './Components/List'

class App extends Component {

  state = {
    Locations : [],
    marker: []
  }
   
 componentDidMount() {
 
    this.getLocations ()
    this.loadMap()
    


    
  }

loadMap = () =>{
  loadScript ("https://maps.googleapis.com/maps/api/js?key=AIzaSyDnrGYtkdccFXqQGTNEfousldIW7TdltQM&callback=initMap")
  window.initMap = this.initMap
}

getLocations =() =>{
  let endPoint = "https://api.foursquare.com/v2/venues/explore?"
  let parameters ={
    client_id : "3DEZHRZWRFFGS3PQ1JRIL2Q00CUEVRXQO4Q2NXU2JQKJI1NF",
    client_secret:"2V3CBVWDXWDIW4HBIO5SFBZQDF0544F04I40CIBU5ZYQLMSY",
    query:"shops",
    near: "Mauna Kea",
    v: 20181105

  }
  //https://www.npmjs.com/package/axios
axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
   this.setState({
    Locations: response.data.response.groups[0].items
   }, this.loadMap ())
  })
  .catch(error => {
    console.log(error);
  });
}


 
//https://developers.google.com/maps/documentation/javascript/tutorial

initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 19.8968, lng: -155.5828 },
            zoom: 10.5
        });
        //https://developers.google.com/maps/documentation/javascript/markers

        const Infowindow = new window.google.maps.InfoWindow();

        let markers = [];

        this.state.Locations.forEach(location => {
            let marker = new window.google.maps.Marker({
                title: location.venue.name, 
                position: {
                    lat: location.venue.location.lat,
                    lng: location.venue.location.lng
                },
                map: map,
                animation: window.google.maps.Animation.DROP,
            });
            //push the marker to our array of markers
            markers.push(marker);
            // create an onclick event to open an infowindow at each marker.
            marker.addListener('click', function() {
                populateInfoWindow(this, Infowindow);
            });
        });
        function populateInfoWindow(marker, infowindow) {
            if (infowindow.marker !== marker) {
                infowindow.marker = marker;
                infowindow.setContent('<div>' + marker.title + '</div');
                infowindow.open(map, marker);
                //
                infowindow.addListener('click', function() {
                    infowindow.setMarker(null);
                });
            }
        }
    };




  render() {
    return (

      <div className="App">
      <Header/>
      <Content/>
      <List locations={this.state.Locations} />


     
     


      </div>

   
      
    );
  }
}

export default App;


///credit : learned this from Yahya Elharony walk through : https://www.youtube.com/watch?v=W5LhLZqj76s&t=615s and this also helped: https://stackoverflow.com/questions/7718935/load-scripts-asynchronously
function loadScript(url){
      var index = window.document.getElementsByTagName("script")[0];
      var script = window.document.createElement("script");
     script.src = url;
     script.async = true;
     script.defer = true; 
     index.parentNode.insertBefore(script, index)
    };
