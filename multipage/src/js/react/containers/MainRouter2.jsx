import React, { PureComponent } from 'react'
import {Route,HashRouter as Router} from 'react-router-dom'
//import {Route,BrowserRouter as Router} from 'react-router-dom'

function Home(){
    return(
        <div>
            HOME
        </div>
    )
}

function About(){
    return(
        <div>
            About
        </div>
    )
}
export default class MainRouter2 extends PureComponent {
    render() {
        return (
            <Router>
                <div>
                    <p>Let's add routing</p>
                </div>
                <Route path="/" component={Home}/>
                <Route path="/About" component={About}/>
            </Router>
        )
    }
}
