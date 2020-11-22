//@ts-check
import React, { PureComponent } from "react";

//import { ThemeContext } from './theme-context';
import { UID } from '../uniqueId.js'
import styles from './AddProduct.css'
import ProgressBar from "./ProgressBar.jsx";
import DataContext from '../../DataContext.js'
//import AppContext from './app-context.js'


export default class AddProduct extends PureComponent {
    // STEP 3: 方法一 定義 contextType
    static contextType = DataContext; // 才可以使用 this.context

    constructor() {
        super();

        this.state = {
            init: 1,
            imgBlob: null,
            imgBlobUrl: null,
            fileList: null,
            uploadProgress: 0,
            // textPreviewShow:"inline",
            // imgPreviewShow:"none",
            imgPreviewActive: false,
            iptProdNameValue: "",
            iptProdPriceValue: "",
        };
        //console.log(this)
        this.refFileUploader = React.createRef();
        this.refDivProductName = React.createRef();

        this.UID = UID.bind(this);


        //console.log(firebase)
        //console.log(contextType)
        //console.log(this.context)
    }

    dragFile_onDragOver = (event) => {
        //console.log(event)
        event.stopPropagation();
        event.preventDefault();
        // Style the drag-and-drop as a "copy file" operation.
        event.dataTransfer.dropEffect = 'copy';
    }
    dragFile_onDrop = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const fileList = event.dataTransfer.files;


        //fileInput.files = e.dataTransfer.files;
        //console.log(fileList);
        this.handleImageFile(fileList)
    }
    handleImageFile = (fileList) => {
        //console.log(fileList)
        // this.setState((state) => {
        //     return { imgBlob: fileList[0] }
        // })
        let blob = fileList[0];
        //console.log(blob)
        let bloburl = URL.createObjectURL(blob)
        this.setState({ fileList: fileList, imgBlob: blob, imgBlobUrl: bloburl })
        // let fileUploader = document.querySelector('#file-uploader');
        // fileUploader.files = fileList
    }
    FileUploader_onChange = (e) => {
        const fileList = e.target.files
        this.handleImageFile(fileList)
        //console.log(e.target.files); // get file object
        //console.log('FileUploader_onChange', e.target.)
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     //     return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
    //     // if (type.prototype && type.prototype.isPureReactComponent) {
    //     //     return (
    //     //         !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
    //     //     );
    //     // }
    // }

    try = (e) => {
        // this.setState((state, props) => {
        //     return { uploadProgress: state.uploadProgress + 1 }
        // })

        // this.setState((state, props) => {
        //     return {textPreviewShow:"none"}
        // })
        //root.style.setProperty('--foo-color', "red");

        // let div1 = document.querySelector('#div1');
        // div1.innerHTML = "gfd"

        this.refDivProductName.current.style.setProperty('--foo-color', "orange");
        root.style.setProperty('--foo-color', "red");

        this.setState((state, props) => {
            return { uploadProgress: state.uploadProgress + 5 }
        }
        )



        //styles.blue2 = "red";
        // root.style.setProperty('--blue2', "red");

        //console.log(styles.blue2)
        //styles.blue2 = "red"
        //console.log(styles(styles.blue2))
        //styles(styles.blue2).update('color', '#f00')

        // render(){
        //     var style = { "--my-css-var": 10 } as React.CSSProperties;
        //     return <div style={style}>...</div>
        //   }

        // console.log(styles.faveColor)

        // styles.faveColor = "#F5F";
        console.log(styles)
        // this.render()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.imgBlobUrl !== this.imgBlobUrl) {
            this.refFileUploader
        }

        if (prevState.fileList !== this.state.fileList) {
            this.refFileUploader.current.files = this.state.fileList;
        }

        if (this.state.imgBlobUrl) {
            //text disappear
            this.setState((state, props) => {
                return { imgPreviewActive: true }
            })
        }
        // let ss = this.UID('iptProdName')
        // console.log(this.state[ss])


        //console.log('componentDidUpdate---', this.state)
    }
    handleSubmit = (e) => {
        //console.log(e)
        e.preventDefault();
        //console.log('fdsafds')
        // if (this.validate()) {
        //     // alert('form submitted');
        //     // setEmail('');
        //     // setPwd('');
        //     // setErrMsg(INIT_ERR_STATE);
        //     //console.log(e)
        // }
    }
    validate = () => {
        return true;
        // const form = formRef.current;

        // if (form.checkValidity()) {
        //     return true;
        // } else {
        //     const form = formRef.current;

        //     for (let i = 0; i < form.elements.length; i++) {
        //         const element = form.elements[i];

        //         if (element.tagName !== 'button' && element.willValidate && !element.validity.valid) {
        //             if (element.validity.valueMissing) {
        //                 setErrMsg({ [element.name]: element.validationMessage });
        //             } else {
        //                 setErrMsg({ [element.name]: element.title });
        //             }
        //         }
        //     }

        //     return false;
        // }
    };
    click_getContext = (event) => {
        //console.log(this.context.Firebase.auth().settings)
    }
    fetch = (event) => {
        this.setState({
            iptProdNameValue: "炒青菜1",
            iptProdPriceValue: "150",
        })

        //let fileList = new FileList();
        function FileListItem(a) {
            a = [].slice.call(Array.isArray(a) ? a : arguments)
            for (var c, b = c = a.length, d = !0; b-- && d;) d = a[b] instanceof File
            if (!d) throw new TypeError("expected argument to FileList is File or array of File objects")
            for (b = (new ClipboardEvent("")).clipboardData || new DataTransfer; c--;) b.items.add(a[c])
            return b.files
        }

        fetch("./11.jpg")
            .then((e) => {
                return e.blob();
            })
            .then((blob) => {

                let bloburl = URL.createObjectURL(blob);
                let newFile = new File([blob], "fileFromLocal.jpg");
                //let fileList = new DataTransfer();
                //fileList.items.add(newFile)
                var fileList = new FileListItem([newFile]);
                //-----------------2. DataTransfer()
                // const data = new DataTransfer();
                // data.items.add(newFile);
                // //data.items.add(file2);
                // fileList = data.files;                

                this.setState({ fileList: fileList, imgBlob: blob, imgBlobUrl: bloburl })

            })
    }
    Upload = (e) => {
        //console.log(this.state)
        this.setState({ iptProdNameValue: 55 })
        this.setState({ iptProdPriceValue: 88 })

    }
    // ToFirebase = (blob, filename)=> {
    //     //console.log('ready')
    //     // Create a root reference
    //     var storageRef = firebase.storage().ref();

    //     // Create a reference to 'mountains.jpg'
    //     var mountainsRef = storageRef.child(`MenuImages/${filename}`);

    //     // Create a reference to 'images/mountains.jpg'


    //     // While the file names are the same, the references point to different files


    //     // var file = ... // use the Blob or File API
    //     mountainsRef.put(blob)
    //         .then(function (snapshot) {
    //             console.log('Uploaded a blob or file!');
    //         })
    //         .catch((e) => {
    //             console.log('error--', e)

    //         });
    // }
    // onInputChange = (msg,e) => {

    //     //console.log(e.target.id)
    //     //console.log(e.target)
    //     console.log(msg)
    //     //this.setState({ [e.target.id]: e.target.value })
    //     this.setState({ iptProdName: e.target.value })

    // }
    onInputChange(bindarg1, e) {
        //console.log(bindarg1)
        //console.log(e.target)
        //console.log(e.target.bindstate)
        //console.log(e.target.getAttribute('bindstate'))
        let statePropName = e.target.getAttribute('bindstate')
        console.log(statePropName)
        let value = e.target.value
        //---------- get new prop 1
        // // let iterableObj = new Map([ ['foo', 'bar'] ]);
        // let iterableObj = new Map([ [statePropName, value] ]);
        // let newProp = Object.fromEntries(iterableObj);
        //---------- get new prop 2
        var newProp = {}
        newProp[statePropName] = value

        //console.log(newProp)

        this.setState(newProp)

    }
    ClearProducts = () => {

    }
    Upload4 = () => {
        /**@type {import('../../src/firebase/Firebase').default} */
        let FirebaseMJS = this.context.FirebaseMJS
        //let { FirebaseMJS } = this.context
        
        // if(options && options.beginEvent){
        //     options.beginEvent()
        // }
        let options = {
            beginEvent:() => {
                console.log('beginEvent')
            },
            endEvent:() => {
                console.log('endEvent')
            },
        }
        
        FirebaseMJS.addProduct4(this.state.iptProdNameValue,
            this.state.iptProdPriceValue,
            this.state.imgBlob,
            options,
        );
        //console.log(aa)
    }

    render() {
        //console.log(this.state.imgPreviewActive)
        //console.log(this.context)
        return (
            <DataContext.Consumer>
                {(context) => (
                    <form className="bd-2 addProductForm" onSubmit={this.handleSubmit}>
                        {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
                        <div className={styles.normal} ref={this.refDivProductName}>

                            <label htmlFor={this.UID('iptProdName')} >Product Name:</label>
                            <input type="text" id={this.UID('iptProdName')} className={styles.normal2} value={this.state.iptProdNameValue} bindstate="iptProdNameValue" onChange={this.onInputChange.bind(this, 'iptProdNameValue')} required />
                        </div>
                        <div className={styles.normal2}>
                            <label htmlFor={this.UID('iptProdPrice')}>Product Price $:</label>
                            <input type="number" id={this.UID('iptProdPrice')} value={this.state.iptProdPriceValue} bindstate="iptProdPriceValue" onChange={this.onInputChange.bind(this, '')} required />
                        </div>
                        <div>
                            <input type="file" ref={this.refFileUploader} onChange={this.FileUploader_onChange} accept="image/png, image/jpeg" multiple="multiple" />
                            <div className="dragFile" onDragOver={this.dragFile_onDragOver} onDrop={this.dragFile_onDrop}>
                                <div className={` ${this.state.imgPreviewActive === false ? styles.show : styles.noshow} `}>拖曳圖片至此</div>
                                <img src={this.state.imgBlobUrl} className={`imgPreview ${this.state.imgPreviewActive === true ? styles.show + ' ' + styles.alignCenter : styles.noshow}`} alt="XXXX" />
                            </div>
                        </div>
                        <ProgressBar percent={this.state.uploadProgress}></ProgressBar>
                        <div>
                            <button className="myButton" type="submit">Submit</button>
                            <button className="myButton">ADD Product</button>
                            <button className="myButton" onClick={this.try}>Try</button>
                            <button className="myButton" onClick={this.click_getContext}>Get context</button>
                        </div>
                        <div>
                            <input type="button" className="myButton" value="Fetch Data" onClick={this.fetch} />
                            <button className="myButton" onClick={this.Upload}>Upload</button>
                            <button className="myButton" onClick={this.ClearProducts}>Clear Products</button>
                            <button className="myButton" onClick={this.Upload4}>Upload 4</button>
                        </div>

                        {/* <div id="div1"></div> */}
                    </form>

                )}
            </DataContext.Consumer>

        );
    }
}



// const getColor = ({ color }) => `color: ${color}`;
// const getStyles = ({ color, bg }) => ({
//   color,
//   background: bg,
// });
// const getWidth = ({ width }) => `width: ${width}%`;
// const Box = styled.div`
//   margin: 15px 0;
//   padding: 15px;
//   ${getColor};
//   ${getStyles};
//   background: tomato;
//   border-radius: 10px;
// `;


// const MyBar = styled.div`
// ${getWidth};
//   height: 30px;
//   background-color: green;
//   margin:0px;
//   padding:0px;
// `;

// const MyProgress = styled.div`
//     width: 70%;
//   background-color: grey;
//   margin:0px;
//   padding:0px;

// `;
// const Progress = () => {
//     return (
//         <MyProgress>
//             <MyBar width="70"></MyBar>
//         </MyProgress>
//     )
// }
// //-------------------

// //const keyframes = styled.keyframes;
// //const styled = styled.default

// const ProgressBarWrapper = styled.div`
//   margin: 30px;
//   border: 2px solid lightblue;
//   height: 30vh;
//   width: 50vw;
// `
// // const fill = styled.keyframes`
// //   0% {width: 0%}
// //   100% {width: 100%} 
// // `;

// const ProgressBar = styled.div`
//   background: lightblue;
//   height: 100%; 
//   width:50%;
//    //will animate 20 times
// `
