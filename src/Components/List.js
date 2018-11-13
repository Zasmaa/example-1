import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'

class List extends React.Component {

 

 

    render() {
        return (
          <Menu>
            <div id="List">
                <h2>Locations</h2>
                <input type="text" value={this.props.queryString} onChange={e => this.props.handleChange(e.target.value)} />
                <ol>
                    {this.props.locations.map(loc => {
                        return (
                            <li key={loc.venue.id}>
                                <div>
                                    <p className="title"> 
                                    Name: <a href="#">{loc.venue.name}</a>
                                    </p>
                                    <p> Address: {loc.venue.location.address }</p>

                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
             </Menu>
        );
    }
}

export default List;
