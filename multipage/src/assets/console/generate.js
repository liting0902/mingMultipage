class ProductInfo {
    productId = "xxxxxxxx" //aaaaa-1
    name = "xxxxxx" //"白斬雞"
    price = 0 //140
    addDateTime = null

    category = "beef"
    tag = "#牛肉#青椒"

    imgUrl = "xxxxxx"
    imgFileName = "xxxxxx" //白斬雞.jpg

    autoNum=0
}

let random_id = () => {
    let rtn = Math.random()
    rtn = rtn.toString(36).slice(2, 10)
    return rtn
}
let prodNames = ['煸椒炒牛肉', '酒釀嫩牛豆腐花', '嫩蔥爆鮮牛', '香干牛肉絲', '阿婆紅燒肉', '黃金上湯獅子頭', '京醬肉絲', '蒜泥白肉', '宮保雞丁', '雲耳腐乳雞', '銀芽薑絲炒大腸', '麻油松阪豬', ]
let prodImages = ['196643.jpg', '365459.jpg', '406152.jpg', '434283.jpg', '640777.jpg', '1660030.jpg']
let priceList=[100,120,500,340,220,150,220,240,160,180,120,160,170,190,350]
function getRandomInt(min, max) {
    min = Math.ceil(min); 
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//console.log(getRandomInt(100, 500))
let imageIdx = getRandomInt(1,prodImages.length+1)
//console.log(a.toString(36).slice(2,10))
// console.log(prodNames)
// console.log(prodNames.pop())
// console.log(prodNames)
let listProducts = []
let idx = 0;
for(let itemIdx in prodNames){
    let newProduct = new ProductInfo();
    newProduct.name = prodNames[itemIdx];
    //console.log(item)


    newProduct.productId = random_id() //aaaaa-1
    //newProduct.name = "xxxxxx" //"白斬雞"
    newProduct.price = priceList.pop() //140
    newProduct.addDateTime = new Date(Date.now)

    newProduct.category = "beef"
    newProduct.tag = "#牛肉#青椒"

    imageIdx = getRandomInt(1,prodImages.length+1)
    newProduct.imgFileName = prodImages[imageIdx-1] //白斬雞.jpg
    newProduct.imgUrl = `./images/${newProduct.imgFileName}`    

    idx++
    newProduct.autoNum=idx
    //console.log(item)
    //console.log(imageIdx = getRandomInt(1,prodImages.length+1))
    listProducts.push(newProduct);
}
//console.log(listProducts)


const fs = require('fs')
const path = require('path')
let str = JSON.stringify(listProducts,null,4)
let path2 = path.join(__dirname, 'data.json')
console.log(str)
//fs.writeFileSync(path2, str);