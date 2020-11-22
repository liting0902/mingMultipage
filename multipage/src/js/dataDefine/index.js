//@ts-check
/**
 * @class
 * @desc ming1 project ShopItem.jsx
 */
export class ShopItemInfo {
    /**@type {(ProductInfo|null|undefined)} */
    _productInfo;
    /**@type {string} */
    productId = 'XXXXXXXXXXXXX'
    //productInfo={productId:'mmmmmmmmmm'}
    /**@type {number} */
    amount = 0
    /**@type {number} */
    price = 0
    //productInfo
    /**@property {string}*/
    get productName() {
        if (!this._productInfo)
            return ''
        return this._productInfo.name
    }
    /**
     * fill _productInfo - from given product list
     * @param {ProductInfo[]} arrayProducts 
     */
    fill_ProductInfo_ByProductArray(arrayProducts) {
        if (arrayProducts.length === 0) {
            this.productInfo = null
            return;
        }
        // console.log(this.productId)
        //console.log(arrayProducts)
        let findProductInfo = arrayProducts.find((item) => {
            return item.productId === this.productId
        })
        //console.log('find---', findProductInfo)
        //if result not found, force to clear this._productInfo
        this.productInfo = null
        if (findProductInfo)
            this.productInfo = findProductInfo
            
        //console.log(this._productInfo)
    }
    /**@type {ProductInfo} - set this ShopItem's ProductInfo*/
    set productInfo(value) {
        this._productInfo = value
        if (value) {
            this.productId = value.productId
            this.price = value.price
        }

    }
    /**@type {(ProductInfo|null|undefined)} - return this ShopItem's ProductInfo*/
    get productInfo() {
        return this._productInfo
    }
}
/**@enum {string} */
export const ENUM_ProductCategory = {
    // soybean:"soybean",
    // duck:"duck",
    // chicken:"chicken",
    // beef:"beef",
    // pork:"pork",
    // others:"others",

    mainCourse:"mainCourse",
    meats:"meats",
    soups:"soups",
    stirFired:"stirFired",
    coldPlates:"coldPlates"
}
export const Map_ProductCategory = {
    // soybean:"豆類",
    // duck:"鴨肉類",
    // chicken:"雞肉類",
    // beef:"牛肉類",
    // pork:"豬肉類",
    // others:"其他類別",

    mainCourse:"主菜",
    meats:"肉類",
    soups:"湯",
    stirFired:"快炒",
    coldPlates:"冷盤"
}
/**
 * @class
 * @description firestore.Products/ProductList.jsx/ProductCard.jsx
 * */
export class ProductInfo {
    /**@prop {string} */
    productId = "null" //aaaaa-1
    /**@prop {string} */
    name = "null" //"白斬雞"
    /**@prop {number} */
    price = 0 //140
    /**@prop {?Date} */
    addDateTime = null

    /**@prop {string} */
    category = "null"
    /**@prop {string} */
    tag = "#"

    /**@prop {string} */
    imgUrl = "./"
    /**@prop {string} */
    imgFileName = "default.png" //白斬雞.jpg
    /**@prop {?number} */
    autoNum = null
    /**@prop {?boolean} - in use or not */
    isActived = false
}

/**
 * @class
 * @description OrderInfo.OrderStatus
 */
export class OrderStatus {
    /**@type {boolean} */
    isPaid = false;
    /**@type {boolean} */
    isCompleted = false;
    /**@type {boolean} */
    isCanceled = false;
    /**@type {boolean} */
    isDelivery = false;
}
/**
 * @class
 * @description - OrderInfo.OrderLog by LogType
 */
export class OrderLog {
    /**@type {?Date} */
    logDateTime = null
    /**@type {LogType} */
    logType = ''
    /**@type {string} */
    remarks = ''
}

/**
 * @enum {string}
 * @desc firestore.OrderInfo.LogType
 * */
export const LogType = {
    NewOrder: "NewOrder",
    PaidMoney: "PaidMoney",
    CancelOrder: "CancelOrder",
    DeliveryOrder: "DeliveryOrder",
    CompleteOrder: "CompleteOrder"
}

/** 
 * @class
 * @description - from firestore.OrderInfo 
 */
export class OrderInfo {
    /**@type {string} - firestore.Users.uid*/
    userId = "xxxxxxx"
    /**@type {(?Date|object)} - order create datetime from firestore*/
    createDateTime = null
    /**@property {string} */
    get sCreateDateTime() {
        return getDisplayTime(this.createDateTime)
    }
    /**@property {string} */
    get sOrderStatus() {
        let rtnStatus = "訂單成立,尚未付款"
        if (this.orderStatus.isPaid === true)
            rtnStatus = "已付款"
        if (this.orderStatus.isDelivery === true)
            rtnStatus = "已寄出"
        if (this.orderStatus.isCanceled === true)
            rtnStatus = "已取消"
        if (this.orderStatus.isCompleted === true)
            rtnStatus = "訂單完成(已送達)"
        // orderStatus = {
        //     isPaid: false,
        //     isCompleted: false,
        //     isCanceled: false,
        //     isDelivery: false
        // }
        return rtnStatus
    }
    /**@type {string} */
    orderId = "XXXXXXXX" // odke-20200717-0001
    /**@type {ShopItemInfo[]} */
    shopItemList = []
    /**@property {string} - first shop product name with /.... */
    get orderProductName() {
        if (this.shopItemList.length == 0)
            return ''
        let shopItem_0 = this.shopItemList[0]

        if (this.shopItemList.length >= 2)
            return `${shopItem_0.productName} / .....`
        else
            return `${shopItem_0.productName}`

    }
    /**
     * @returns {string[]}
     */
    getShopItems_Id = function () {
        let list_productId = this.shopItemList.map((item) => {
            return item.productId
        })
        return list_productId
        //console.log(arr)
        //console.log(this.shopItemList)
    }
    /**
     * fill shopItem detail information
     * @param {ProductInfo[]} arrayProductInfo - distinct product list
     */
    fillShopItems(arrayProductInfo) {
        //console.log(arrayProductInfo)
        //console.log(this.shopItemList)
        this.totalPrice = 0;
        this.shopItemList = this.shopItemList.map((item) => {
            // convert to ShopItemInfo()
            let shopiteminfo = item
            if (item instanceof ShopItemInfo == false) {
                shopiteminfo = Object.assign(new ShopItemInfo(), item);
            }
            // fill shopiteminfo._productInfo
            shopiteminfo.fill_ProductInfo_ByProductArray(arrayProductInfo)
            // count OrderInfo.totalPrice
            this.totalPrice += (shopiteminfo.amount * shopiteminfo.price)
            //console.log(shopiteminfo)
            return shopiteminfo
        })
        //console.log(this.shopItemList)
    }
    /**@type {number} */
    totalPrice = 0
    /**@type {OrderStatus} */
    orderStatus = {
        isPaid: false,
        isCompleted: false,
        isCanceled: false,
        isDelivery: false
    }
    /**@type {OrderLog[]} */
    orderLog = []
    // {
    //     logDateTime: null,
    //     logType: '',
    //     remarks: ''
    // }

    /**@prop {UserData} */
    userData = new UserData();
    // {
    //     "dispalyName": null,
    //     "emailVerified": true,
    //     "userProfile": {
    //         "name": "HH",
    //         "address": "台北市萬華區寧波街11號XXXXXXXXXX"
    //     },
    //     "phoneNumber": "+886926923281",
    //     "uid": "s5hWIA4pdQN8NGjBmPekJoOodBi2",
    //     "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GgufKuvpe34oq9gzvV9CppvPhWjISRrNeF4wbdOkw=s96-c",
    //     "providerId": "google.com",
    //     "email": "tristan829@gmail.com"
    // }
    /**
     * @type {UserProfile} 
     * @description - from firestore.Users.UserProfile
     */
    // userProfile = {
    //     uid: "XXXXXXX",
    //     sendEmail: "XXXXXXX",
    //     name: "XXXXXXX",
    //     phoneNumber: "XXXXXXX",
    //     address: "XXXXXXX",
    //     // address1: "XXXXXXX",
    //     // address2: "XXXXXXX",
    //     // address3: "XXXXXXX",
    //     // addressSelectNo: 1,
    //     //getSelectedAddress: (e) => {}

    // }
}
/**@class 
 * @desc firestore.Users
*/
export class UserData{
    /**@prop {string} */
    dispalyName= null
    /**@prop {boolean} */
    emailVerified= false
    /**@prop {UserProfile} */
    userProfile= new UserProfile();
    // {
    //     name: "HH",
    //     address: "台北市萬華區寧波街11號XXXXXXXXXX"
    // }
    /**@prop {string} */
    phoneNumber= ""
    /**@prop {string} */
    uid= ""
    /**@prop {string} */
    photoURL= ""
    /**@prop {string} */
    providerId= ""
    /**@prop {string} */
    email= ""
}
/**
 * @class
 * @desc firestore.Users.userProfile
 */
export class UserProfile {
    /**@type {string} */
    uid = "XXXXXXX"
    /**@type {string} */
    sendEmail = "XXXXXXX"
    /**@type {string} */
    name = "XXXXXXX"
    /**@type {string} */
    phoneNumber = "XXXXXXX"
    /**@type {string} */
    address = "XXXXXXX"
    // /**@type {string} */
    // address1 = "XXXXXXX"
    // /**@type {string} */
    // address2 = "XXXXXXX"
    // /**@type {string} */
    // address3 = "XXXXXXX"
    // /**@type {(1|2|3)} */
    // addressSelectNo = 1
    /**@function */
    // getSelectedAddress() {
    //     let propName = `address${this.addressSelectNo}`
    //     return this[propName]
    // }
}

/**
 * @typedef {Object} GlobalFlag
 * @prop {boolean} [__myFlag__]
 * @prop {firebase} [firebase]
 * @prop {import('../firebase/Firebase.js').default} [Firebase]
 * @prop {object} [app]
 * @typedef {Window & GlobalFlag} ExtendedWindow
 */

const fakeProductInfo1 = new ProductInfo()
fakeProductInfo1.productId = "ajnck"
fakeProductInfo1.name = "胖老爹美式炸雞,胖老爹美式炸雞,胖老爹美式炸雞,胖老爹美式炸雞"
fakeProductInfo1.price = 140
fakeProductInfo1.imgFileName = "白斬雞.jpg"
//fakeProductInfo1.imgUrl = "images/四季豆-d83dcdceb072b6cb1e7eb3cff1d5c656.jpg"
const fakeProductInfo2 = new ProductInfo()
fakeProductInfo2.productId = "okdsf"
fakeProductInfo2.name = "蔥爆牛肉"
fakeProductInfo2.price = 550
fakeProductInfo2.imgFileName = "蔥爆牛肉.jpg"
//fakeProductInfo2.imgUrl = "images/四季豆-d83dcdceb072b6cb1e7eb3cff1d5c656.jpg"
const fakeProductInfo3 = new ProductInfo()
fakeProductInfo3.productId = "fdsafe"
fakeProductInfo3.name = "蔥爆牛肉222"
fakeProductInfo3.price = 220
fakeProductInfo3.imgFileName = "四季豆.jpg"
//fakeProductInfo3.imgUrl = "images/蔥爆牛肉-c5015d40ca191cbb33002457f64a7cf7.jpg"
export {
    fakeProductInfo1,
    fakeProductInfo2,
    fakeProductInfo3
}

/**
 * 
 * @param {?Date} inDate 
 * @returns {string}
 */
function getDisplayTime(inDate) {
    if (!inDate)
        return 'noTime'
    else
        return `${inDate.getFullYear()}/${inDate.getMonth()+1}/${inDate.getDate()} ${inDate.getHours()}:${inDate.getMinutes()}:${inDate.getSeconds()}`
}