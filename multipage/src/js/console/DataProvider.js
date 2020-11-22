import DataContext from './DataContext'
import React, { PureComponent } from 'react'


export default class DataProvider extends PureComponent {
    constructor(props){
        super(props)
        
        this.state={
            cars: {
                car001: { name: 'Honda', price: 100 },
                car002: { name: 'BMW', price: 150 },
                car003: { name: 'Mercedes', price: 200 }
            },
            carbrand:'toyota',
            FirebaseMJS:this.props.FirebaseMJS,
        };
    }
    
    incrementPrice = selectedID => {
        const cars = Object.assign({}, this.state.cars);
        cars[selectedID].price = cars[selectedID].price + 1;
        this.setState({
            cars
        });
    }
    decrementPrice = selectedID => {
        const cars = Object.assign({}, this.state.cars);
        cars[selectedID].price = cars[selectedID].price - 1;
        this.setState({
            cars
        });
    }
    changeBrand = newName=>{
        this.setState({carbrand:newName})
    }
    
    render() {
        return (
            <DataContext.Provider
                value={this.state}            >
                {this.props.children}
            </DataContext.Provider>
        );
    }
}
