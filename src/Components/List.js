import React from 'react';
import { slide as Menu } from 'react-burger-menu'

class List extends React.Component {

 

 


 

    render() {
        return (
          <Menu tabIndex="0">
            <div>

                <h2 className= "title" tabIndex="0">Locations</h2>
                <p> {this.props.queryString} </p>
                <input type="text" value={this.props.queryString} onChange={e => this.props.handleChange(e.target.value)} />
                <ol>
                    {this.props.locations.map(loc => {
                        return (
                            <li key={loc.venue.id}
                           >
                                <div>
                                    <p className="title"> 
                                    
                                    <button href="#" onClick={() => this.props.showInfoContent(loc)}> Name: { loc.venue.name}  
                                    <p> Address: {loc.venue.location.address } </p>
                                     </button>

                                    </p>
                                    
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
