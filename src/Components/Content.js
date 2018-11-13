import React, { Component } from 'react';
import Map from './Map';

class Content extends React.Component {
    state = {};

    render() {
        console.log(this.state.Locations);
        return (
            <div className="Content">
                <Map />
            </div>
        );
    }
}

export default Content;
