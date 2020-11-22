import FirebaseMJS from '../firebase/Firebase.js'
let firebaseConfig = {
    apiKey: "AIzaSyD4H_AArvgvLf7HEmFBdHS6iUQcG3CTUOM",
    authDomain: "ming1-d8ff5.firebaseapp.com",
    databaseURL: "https://ming1-d8ff5.firebaseio.com",
    projectId: "ming1-d8ff5",
    storageBucket: "ming1-d8ff5.appspot.com",
    messagingSenderId: "504139528822",
    appId: "1:504139528822:web:078db71d75c01af93bfd57",
    measurementId: "G-ENYG95C00T"
};
let app = firebase.initializeApp(firebaseConfig);
let Firebase = new FirebaseMJS(firebase, app)
let db = app.firestore()
let btnFetchImage_Cake = document.querySelector('#btnFetchImageCake');
let btnFetchImage_Vega = document.querySelector('#btnFetchImageVega');
let divPutImage = document.querySelector('#divPutImage');

let imgPutImage = document.querySelector('#imgPutImage');
let iptBlobSize = document.querySelector('#iptBlobSize');
let btnUploadStorage = document.querySelector('#btnUploadStorage')
let iptSelectImage = document.querySelector('#iptSelectImage');

let iptProductId = document.querySelector('#iptProductId');
let iptImgUrl = document.querySelector('#iptImgUrl');
let iptImgFileName = document.querySelector('#iptImgFileName');



let proxyMainUI = {
    blobData: null,
    productInfo: null,
    //selectFile: null,
    previewImgUrl: null
}
proxyMainUI = new Proxy(proxyMainUI, {
    get: function (target, propName) {

        return target[propName]
    },
    set: function (target, propName, value) {
        switch (propName) {
            case 'blobData':
                let blobdata = value
                iptBlobSize.value = blobdata.size
                // let reader = new FileReader();
                // reader.onload = function () {
                //     proxyMainUI.previewImgUrl = reader.result//ArrayBuffer || data:image/jpeg;base64 string
                // }
                // reader.readAsDataURL(blobdata);
                proxyMainUI.previewImgUrl = URL.createObjectURL(blobdata)
                break;
            case 'productInfo':
                let prodInfo = value
                iptProductId.value = prodInfo.productId
                iptImgUrl.value = prodInfo.imgUrl
                iptImgFileName.value = prodInfo.imgFileName
                break;
            case 'previewImgUrl':
                imgPutImage.src = value
                break;
            default:
                break;
        }
        target[propName] = value
        return true;
    }
})

function fetchImage(fileName) {
    fetch('./' + fileName)
        .then((e) => {
            return e.blob()
        })
        .then((blob) => {
            //console.log(blob)
            // imgPutImage.src = URL.createObjectURL(blob);
            proxyMainUI.blobData = blob

            return db.collection("ProductInfo").get()
        })
        .then((snapshot) => {
            let prodInfo = snapshot.docs[1].data()
            proxyMainUI.productInfo = prodInfo
            //console.log(snapshot.docs[1].data())
        })
}
btnFetchImage_Cake.addEventListener('click', (e) => {
    fetchImage('13.jpg')
})
btnFetchImage_Vega.addEventListener('click', (e) => {
    fetchImage('11.jpg')
})
// db.collection("ProductInfo").get()
// .then((snapshot) => {
//     console.log(snapshot.docs[0].data())

// })
btnUploadStorage.addEventListener('click', (e) => {
    if (proxyMainUI.blobData === null) {
        alert('blobData == null')
        return;
    }

    Firebase.updateCloudStorageFile(proxyMainUI.productInfo.productId, proxyMainUI.blobData)
        .then((url) => {
            console.log(url)
        })

    // var file = this.proxyMainUI.blobData // use the Blob or File API
    //     ref.put(file).then(function (snapshot) {
    //         console.log('Uploaded a blob or file!');
    //     });

    // Base64 formatted string
    // var message = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
    // ref.putString(message, 'base64').then(function (snapshot) {
    //     console.log('Uploaded a base64 string!');
    // });
})
iptSelectImage.addEventListener('change', (e) => {
    // console.log('AAAAAA')
    const arrayFiles = e.target.files
    if(arrayFiles.length === 0)
        return
    let [file1] = arrayFiles
    proxyMainUI.blobData = file1
})


window.addEventListener("dragover", function (e) {
    e = e || event;
    e.preventDefault();
}, false);
window.addEventListener("drop", function (e) {
    e = e || event;
    e.preventDefault();
}, false);
//let divPutImage2 = document.querySelector('#divPutImage2');
divPutImage.addEventListener('dragorver', (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'copy';
})

let evtSelectInputChange
if("createEvent" in document){
    evtSelectInputChange = document.createEvent('HTMLEvents');
    evtSelectInputChange.initEvent('change', false, true);// bubble preventDefault
}
let evtClick
if("createEvent" in document){
    evtClick = document.createEvent('HTMLEvents');
    evtClick.initEvent('click', false, true);// bubble preventDefault
}
    
divPutImage.addEventListener('drop', (e) => {
    e.stopPropagation()
    e.preventDefault()
    let dt = e.dataTransfer
    let files = dt.files
    //console.log(files)
    //iptSelectImage.value=files
    iptSelectImage.files = files

    //https://juejin.im/post/6844903833227771917
    if(evtSelectInputChange)
    // var evt = document.createEvent('HTMLEvents');
    // evt.initEvent('change', false, true);
        iptSelectImage.dispatchEvent(evtSelectInputChange);

}, false)

divPutImage.addEventListener('click',(e) => {
    e.stopPropagation()
    e.preventDefault()
    iptSelectImage.click()
    // if(evtClick)
    //     iptSelectImage.dispatchEvent(evtClick);
})