import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Components/Header';
import Content from './Components/Content';
import List from './Components/List'

class App extends Component {

  state = {
    locations : [],
    markers: [],
    query: "",
     allLocations: [],
     pickId: null,
     vitalMarker: null,
     selectedId: null,
    activeMarker: null

 
  }

 realMarkers = [];
   
 componentDidMount() {
 
    this.getLocations ()
   

    //https://developers.google.com/maps/documentation/javascript/events#auth-errors

window.gm_authFailure = () => {
  // do something for gmaps error
alert('error');

}

    
  }

   saveRealMarker = marker => {
    if (this.realMarkers.indexOf(marker) === -1 && marker !== null) 
      this.realMarkers.push(marker);
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
    locations: response.data.response.groups[0].items,
     allLocations: response.data.response.groups[0].items,
     markers: response.data.response.groups[0].items,
   }, this.loadMap ())
  })
  .catch(error => {
    alert(error);
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
        //

        this.state.locations.forEach(location => {
            let marker = new window.google.maps.Marker({
                title: location.venue.name, 
                //used terinary to check if address is available. if address undefined then it display not available.
               location: location.venue.location.address ? location.venue.location.address : 'Address not available',
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

              if(marker.getAnimation() !== null) {marker.setAnimation(null);}
              else{marker.setAnimation(window.google.maps.Animation.BOUNCE);}
              setTimeout(() => {marker.setAnimation(null)}, 1600);
                populateInfoWindow(this, Infowindow);
            });
        });
        function populateInfoWindow(marker, infowindow) {
            if (infowindow.marker !== marker) {
                infowindow.marker = marker;
                infowindow.setContent(`

                  '<div>'  
                  <p>${marker.title} </p><p> ${marker.location} </p>  '</div'`);
                infowindow.open(map, marker);
                //
                infowindow.addListener('click', function() {
                    infowindow.setMarker(null);
                });
            }
        }

        this.setState({markers})
        
    };






///credit : learned this from   kenjournal walk through: https://www.youtube.com/watch?v=kadSBAsjDXI, Also Dough brown project coach, SallyM and Robert L [FEND] help with the error messages. 
handleClick = location => { 

  
  this.state.markers.forEach(marker => {  


    if ((marker.venue && marker.venue.name === location) || (marker.title === location.venue.name)){ 
      
       window.google.maps.event.trigger(marker, 'click')
      
    } 
  })  
}




 
upateQuery = query =>{
  this.setState({query})
  if (query) {
    this.setState({locations: this.filterLocations(query, this.state.allLocations)})
  }else{
    this.setState({locations:this.state.allLocations})
  }
 }

 filterLocations =(query, locations) => {

  return locations.filter(location => location.venue.name.toLowerCase().includes(query.toLowerCase()))
 }


 


clickMarker = (id) => {
    // Set the state to reflect the selected marker id
    const marker = this.realMarkers.filter(marker => marker.marker.id === id)[0];
    this.setState({
      selectedId: id,
      activeMarker: marker
    })
  }
   




  render() {
    return (

      <div className="App">

      <List locations={this.state.locations}
       showInfoContent={this.handleClick}

      queryString={this.state.query}
      handleChange={this.upateQuery}



     
       />
     
      <Header/>
      <Content/>
      


     
     


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
