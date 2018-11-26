import React from 'react';



class  Map extends React.Component{






	 render() {
	 	
    return (

       <main  role="application" aria-label="map">
        <div id="map"
  saveRealMarker={this.saveRealMarker}
          clickMarker={this.clickMarker}
        
        ></div>
     </main>
      
    );
  }

}

export default Map
