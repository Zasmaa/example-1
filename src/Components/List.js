import React, { Component } from 'react';
import Map from "./Map"
import axios from 'axios';


class  List extends React.Component{
 




	 render() {
    return (

     <div id="List">
     <h2>Locations</h2>
     <input type="text"/>
    <ol>
{
  this.locations.map(loc => {

  	return ( <li key= {loc.venue.id}>
    <div>
    <p> Name: {loc.venue.name}</p>

    </div>
    </li>)
  })
}

     </ol>

     </div>
      
    );
  }

}





export default List;
