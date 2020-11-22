import React from "react";
import {
    //BrowserRouter as Router,
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { createBrowserHistory,createHashHistory } from "history";
//import { browserHistory } from 'react-router'
import { Component } from "react";
//import { push } from 'react-router-redux'
//const customHistory = createBrowserHistory();
const SomeComponent = () => (
    <Route path="/" render={(props) => <ButtonToNavigate {...props} title="Navigate elsewhere" />} />
)
class ButtonToNavigate2 extends Component{
    constructor(props){
        super(props);

    }
    onClickMe=(e) => {
        console.log(this.props)
        this.props.history.push('/dashboard')
        window.clickda = {
            history:this.props.history,
            push:function(){
                //console.log('AAA')
                this.history.push('/dashboard')
            }
        }
        
    }
    
    render(){
        console.log(this.props)
        return(<div>
            <div>FDFD</div>
            <div>FDFD</div>
            <div>FDFD</div>
            <div>FDFD</div>
            <div>FDFD</div>
            <button onClick={this.onClickMe}>Click Me</button>
        </div>)
    }
}
const ButtonToNavigate = ({ title, history }) => (
    <button
        type="button"
        onClick={() => history.push('/dashboard')}
    >
        {title}
    </button>
);
export default class BasicExample extends Component {
    constructor() {
        super()
        //this.state = {history:customHistory}
    }
    OnClickMe = (e) => {
        console.log('AAA');
        //console.log(createBrowserHistory)
        let aa = createHashHistory(this.props)
        aa.push('./dashboard');
        console.log('BBBBBBBBB')
        //console.log(this.props)
        //console.log(browserHistory)
        //browserHistory.push('/About');
        //console.log(this.props)
        //console.log(history)

        //this.state.history.push('/about')
    }
    render() {
        return (
            // history={browserHistory}
            <Router >
                <div>
                    <button onClick={this.OnClickMe}>Click Me</button>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/AA">AA</Link>
                        </li>
                    </ul>

                    <hr />


                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard />
                        </Route>
                        <Route path="/AA" render={(props) =>
                            <ButtonToNavigate2 {...props}
                                title="Navigate elsewhere" />
                        } >

                        </Route>
                    </Switch>
                </div>
            </Router>

        )
    }

}


function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
}
