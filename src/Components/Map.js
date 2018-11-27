import React from 'react';



class  Map extends React.Component{






	 render() {

	 	
	 	
    return (

       <main  role="application" aria-label="map">
        <div id="map"

 clickMarker={this.clickMarker}
saveRealMarker={this.saveRealMarker}

        
        ></div>
     </main>
      
    );
  }

}

export default Map
