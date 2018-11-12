import React, { Component } from 'react';
import Map from "./Map"
import axios from 'axios';
import { slide as Menu } from 'react-burger-menu'


class  List extends React.Component{
	




  

	



	 render() {
    return (
    	 <div className="List">
    	 <Menu name={ 'Locations' }/>

    	 <Menu width={ '20%' }/>
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
