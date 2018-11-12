import React, { Component } from 'react';
import Map from "./Map"
import axios from 'axios';



class List extends React.Component{
	state = {
   locations: [],

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
   	const locations = this.props.locations
    return (
<div id="list">
<h2>Locations</h2>
<input type="text"/>
<ol>
{this.props.Locations.map(Loc =>(
<li key= {Loc.id}>
<div>
<h2>{Loc.venue.name}</h2>


</div>

</li>
	))}

</ol>

</div>
    	)


  }

}

export default List;
