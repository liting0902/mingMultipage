import React, { PureComponent } from 'react'
import AddProduct from '../AddProduct/AddProduct.jsx'
import style from './ProductManagement.css'
//import { ThemeContext, themes } from './theme-context.js';
import AppContext, { themes } from '../app-context.js'
import DataContext from '../../DataContext.js'

//import BootstrapTable2 from './BootstrapTable2.jsx'
import TableProduct from '../TableProduct/TableProduct.jsx'
import loadingSpinner from './loadingSpinner.css'



export default class App extends PureComponent {
    static contextType = DataContext; // 才可以使用 this.context

    constructor() {
        super()

        // this.toggleTheme = () => {
        //     this.setState(state => ({
        //         theme:
        //             state.theme === themes.dark
        //                 ? themes.light
        //                 : themes.dark,
        //     }));
        //     //console.log('App toggle theme')
        // };
        this.state = {
            theme: themes.light,
            toggleTheme: this.toggleTheme,
            app1: 555
            //auth:this.context.auth,
        }

        // this.FirebaseContext = FirebaseContext;
        // console.log(FirebaseContext.displayName)

        //const user = useContext(UserContext)
    }
    // componentDidMount() {
    //     let value = this.context;
    //     console.log(value)
    //     /* perform a side-effect at mount using the value of MyContext */
    // }
    toggleTheme = (e) => {
        // let theme = this.context;
        // theme.foreground="#345678"
        this.setState(state => ({
            theme:
                state.theme === themes.dark
                    ? themes.light
                    : themes.dark,
        }));

        // this.setState((state, props) => {
        //     let newState = { ...state }
        //     newState.theme = {
        //         foreground: "666",
        //         background: "777"
        //     }
        //     return newState;
        // })
    }
    GetUser_onClick = (e) => {
        //console.log(this.context.auth.currentUser)
        console.log(this.context.auth)

    }
    getContext = (e) => {
        //console.log(this.context)
    }
    componentDidMount = (e) => {
        //console.log(this.context)
    }

    render() {
        //console.log(this.context)
        //let theme = this.context;
        //FirebaseContext.displayName = 'AAAA'
        //console.log(theme)
        // let Firebase = useContext(FirebaseContext)
        // console.log(Firebase)
        //console.log('this context-->', this.context)
        return (
            <AppContext.Provider value={this.state}>
                <DataContext.Consumer>
                    {context => {
                        //console.log('context-->', context)
                        return (
                            <div className="bd-primary">
                            {context.carbrand}
                            <div>
                                <button onClick={this.getContext}>Get context</button>
                                <button onClick={() => { context.changeBrand('pppp') }
                                }>change Brand</button>
                                <button onClick={this.toggleTheme}>Change context</button>
                                <button onClick={this.GetUser_onClick}>Get current user</button>
                            </div>
                            <br></br>
                            <TableProduct />
                            <AddProduct></AddProduct>
                        </div>
                        )
                    }}

                </DataContext.Consumer>
            </AppContext.Provider>

            // <div className="bd-primary">
            //     <AddProduct></AddProduct>
            // </div>
        )
    }
}
//ThemedButton.contextType = ThemeContext;