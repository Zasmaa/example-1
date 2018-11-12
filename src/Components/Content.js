import React, { Component } from 'react';
import Map from "./Map";
import List from "./List";
import axios from 'axios';



class Content extends React.Component{

	 state = {
   
  }
   
 componentDidMount() {
 
    this.getLocations ()
    
    
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
  


   render() {
   	console.log(this.state.Locations)
    return (
     <div className="Content">
      <List Locations={this.state.Locations}/>
     <Map/>

     </div>

     ) 
  }

}

export default Content;
