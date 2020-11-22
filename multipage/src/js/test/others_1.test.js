//@ts-check
let chai = require('chai')

describe('others_1.test', () => {
    it('Promise Loop', () => {
        let idx = 0
        let promise1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                idx++
                resolve(idx)
            }, 500);
        })
        async function doLOOP() {
            for (let i = 0; i < 5; i++) {
                await promise1
            }
        }
        return doLOOP()

        // let arry = [];
        // arry.push(new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         idx=1
        //         resolve(idx)
        //     }, 300);
        // }));
        // arry.push(new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         idx=2
        //         resolve(idx)
        //     }, 400);
        // }));
        // arry.push(new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         idx=3
        //         resolve(idx)
        //     }, 200);
        // }));
        // arry.push(new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         idx=4
        //         resolve(idx)
        //     }, 500);
        // }));




        //return Promise.all(arry);

        // let forLOOP = async() => {
        //     for(let i=0;i<5;i++){
        //         await promise1;
        //     }
        // }
        // forLOOP();
        // return promise1.then((e) => {
        // })

    })
    it('Array.reduce 1', () => {
        var sum = [0, 1, 2, 3].reduce(function (a, b) {
            return a + b;
        }, 0);
        // 將所有的元素值加總，最後返回結果 6
        console.log(sum);

        var ary = ['Welcome', ' ', 'fooish', '.', 'com'];
        var concatStr = ary.reduce(function (str, el) {
            return str + el;
        }, '');
        // 輸出 'Welcome fooish.com'
        console.log(concatStr);
    })
    it('Array.reduce + Promise', () => {
        let idx = 0
        let promise1 = function () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    idx++
                    resolve(idx)
                }, 900);
            })
        }
        let promise2 = function () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    idx++
                    resolve(idx)
                }, 200);
            })
        }
        let promise3 = function () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    idx++
                    resolve(idx)
                }, 500);
            });
        }
        let promise4 = function () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    idx++
                    resolve(idx)
                }, 100);
            });
        }
        let arr = [promise1, promise2, promise3, promise4]
        //return new Promise -- arr
        return arr.reduce(function (prePromise, arryFunc_promise, i) {
            //return arryPromise
            return prePromise.then(function () {
                return arryFunc_promise() //saveInDatabase(item).then((myResult) => ... );
            });
        }, Promise.resolve())
        // .then(function() {
        //     // all done here
        // }).catch(function(err) {
        //     // error here
        // });

    })

    it('await async + Proise', () => {
        // (async function loop() {
        //     for (let i = 0; i < 5; i++) {
        //         await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
        //         console.log(i);
        //     }
        // })();
        async function loop2() {
            for (let i = 0; i < 5; i++) {
                await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
                console.log(i);
            }
        }
        return loop2()
    })

    it('Object.Assign/Spreator/lodash', () => {
        let _ = require('lodash')
        let obj = {
            name: "John",
            age: 25,
            home: {
                address: "XXXX"
            }
        }
        let objAssign = Object.assign({}, obj, {
            phone: "09573213"
        });
        let operatorSep = {
            ...obj,
            phone: "09573213"
        }
        let lodashObj = _.cloneDeep(obj)
        let arr1 = [1, 3, 5, 7]
        let arr2 = ['A', ...arr1, 'B']
        console.log(arr2)
    })

    it('use ES6 in nodejs/babel', () => {
        //https://www.jianshu.com/p/ce92a09ad6eb
        require('@babel/register')({
            presets: ['@babel/preset-env']
        })
        let Firebase = require('../firebase/Firebase.js')
        module.exports = Firebase
    })
    it('Mocha ES6', () => {
        //https://note.pcwu.net/2017/04/05/js-mocha-es6/
        // "tset:mochaES6": "mocha --require @babel/register ./mochaES6/add.test.js",
    })
    it('Array Sort', () => {
        const months = ['March', 'Jan', 'Feb', 'Dec'];
        months.sort();
        //console.log(months);
        // arr.sort([compareFunction])
        // function compare(a, b) {
        //     if (在某排序標準下 a 小於 b) {
        //         return -1;
        //     }
        //     if (在某排序標準下 a 大於 b) {
        //         return 1;
        //     }
        //     // a 必須等於 b
        //     return 0;
        // }
        var items = [{
                name: 'Edward',
                value: 21
            },
            {
                name: 'Sharpe',
                value: 37
            },
            {
                name: 'And',
                value: 45
            },
            {
                name: 'The',
                value: -12
            },
            {
                name: 'Magnetic',
                value: 13
            },
            {
                name: 'Zeros',
                value: 37
            }
        ];
        // sort by value
        items.sort(function (a, b) {
            return a.value - b.value;
        });
        console.log(items)
        // sort by name
        items.sort(function (a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
        console.log(items)
    })
    it('Array distinct', () => {
        var myArray = ['a', 'a', 1, 'a', 2, '1'];
        let unique = [...new Set(myArray)];
        console.log(unique) // unique is ['a', 1, 2, '1']
    })
    it('Array group ProductInfo', () => {
        let data = require('../firebase/ProductInfo.json')
        let _ = require('lodash')
        let d2 = _(data).groupBy('category').map((arrayGroupedItems, category) => {
            // return ''
            return {
                category,
                arrayGroupedItems
            }
            // return {
            //     category,
            //     name: _.map(arrayGroupedItems, 'name')
            // }
        }).value()
        console.log(d2)
    })
    it('get datadefine categorys', () => {
        let dataDefine = require('../dataDefine/index.js')
        console.log(dataDefine.ENUM_ProductCategory)
    })
    it('Intl.DateTimeFormat', () => {
        let nn = new Date()
        console.log(nn.toLocaleDateString())

        // const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(nn)
        // console.log(ye)

        const d = new Date('2010-08-05')
        const ye = new Intl.DateTimeFormat('en', {
            year: 'numeric'
        }).format(d)
        const mo = new Intl.DateTimeFormat('en', {
            month: '2-digit'
        }).format(d)
        const da = new Intl.DateTimeFormat('en', {
            day: '2-digit'
        }).format(d)


        let options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }
        console.log(nn.toLocaleDateString('en-US', options));

        console.log(new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }).format(nn))
    })
    it('nodejs load jpg file - 1', () => {
        //https://www.npmjs.com/package/jpeg-js
        //https://stackoverflow.com/questions/9540978/nodejs-how-to-read-and-output-jpg-image
        let http = require('http')
        let fs = require('fs')
        let path = require('path')
        let jpgPath = path.resolve(__dirname, '11.jpg');
        fs.readFile(jpgPath, function (err, data) {
            if (err) throw err // Fail if the file can't be read.
            http.createServer(function (req, res) {
                res.writeHead(200, {
                    'Content-Type': 'image/jpeg'
                })
                res.end(data) // Send the file data to the browser.
                //---You could even embed the image in an HTML page directly by using an <img> with a data URI source
                // res.writeHead(200, {
                //     'Content-Type': 'text/html'
                // });
                // res.write('<html><body><img src="data:image/jpeg;base64,')
                // res.write(Buffer.from(data).toString('base64'));
                // res.end('"/></body></html>');
            }).listen(8124)
        })
    })
    it('nodejs load jpg file (jpeg-js))', () => {
        let jpeg = require('jpeg-js');
        let fs = require('fs')
        let jpgPath = path.resolve(__dirname, '11.jpg');
        let jpegData = fs.readFileSync(jpgPath);
        //let rawImageData = jpeg.decode(jpegData);
        let rawImageData = jpeg.decode(jpegData, {
            useTArray: true
        });
        console.log(rawImageData);
    })
    it('nodejs load jpg file - 3', () => {
        let firebase = require('firebase/app');
        require('firebase/firestore')
        require('firebase/functions')
        require('firebase/storage')
        require('firebase/auth')
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
        firebase.initializeApp(firebaseConfig);
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        let storageRef = firebase.storage().ref();
        let fs = require('fs')
        let path = require('path')
        let jpgPath = path.resolve(__dirname, "11.jpg")
        let cloudFilePath = `Nodejs/11.jpg`
        var childRef = storageRef.child(cloudFilePath);

        //Buffer.alloc(16384)
        //let blob -- HTML -- blob or File
        //let nodejs_Uint8Array -- nodejs
        //let nodejs_base64 -- base64, base64url, or data_url
        let buffer = fs.readFileSync(jpgPath);
        let data
        //data = buffer //buffer == Uint8Array
        //data = buffer.toString('base64')
        data = fs.readFileSync(jpgPath, {
            encoding: 'base64'
        });
        //console.log(data)
        //return childRef.put(buffer)
        function base64_encode(file) {
            // read binary data
            var bitmap = fs.readFileSync(file);
            // convert binary data to base64 encoded string
            return Buffer.from(bitmap).toString('base64');
        }
        data = base64_encode(jpgPath)
        try {
            childRef.putString(data, 'base64')
                .then(function (snapshot) {
                    return snapshot.ref.getDownloadURL()
                })
                .then((url) => {
                    console.log(url)
                    return url
                })
                .catch((e) => {
                });
        } catch (error) {

        }

    })
    it('getRandomId(num)', () => {
        function getRandomId(num) {
            let startIndex = 2 //ignore '0.'
            let endIndex = 2 + num
            //let uuid = Math.random().toString(36).substring(2, 10) // 36 carry bit, ignore '0.', get 8 char
            let uuid = Math.random().toString(36).substring(startIndex, endIndex) // 36 carry bit, ignore '0.', get 8 char
            return uuid
        }
        let uuid = getRandomId(6)
        // let sNowNum = nowNum.toString().padStart(4, "0")
        // uuid = `${uuid}-${sNowNum}`
        console.log(uuid)
    })
    it('getRandomNumber(min,max)', () => {
        //產生min到max之間的亂數
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        let randomNumber = getRandom(1, 6)
        console.log(randomNumber)
        randomNumber = getRandom(1, 6)
        console.log(randomNumber)
        randomNumber = getRandom(1, 6)
        console.log(randomNumber)
    })
    it('getArrayRandomElements(elementCount)', () => {
        //let _ = require('lodash')
        //產生min到max之間的亂數
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        Array.prototype.pickArrayRandomElements = function (elementCount) {
            let arryLength = this.length
            if (arryLength === 0) {
                return;
            } else if (arryLength <= elementCount) {
                return this;
            } else {
                //let elementCount = 3
                let arryThis = this//_.cloneDeep(this)//[1, 3, 6, 8, 9]
                let arrayPicked = []
                // 3 times
                for (let i = 0; i < elementCount; i++) {
                    let idx = getRandom(0, arryThis.length - 1)
                    let pickedItem = arryThis.splice(idx, 1);
                    arrayPicked.push(pickedItem)
                }
                arrayPicked = arrayPicked.flat(1)
                return arrayPicked;
            }
        }
        //--------------
        let arrayTemp = ['Cabbage', 'Turnip', 'Radish', 'Carrot',5,8,9]
        //let isArray = Array.isArray(arrayTemp)
        let newPicked = arrayTemp.pickArrayRandomElements(3)
        

    })
    it('getDateString()', () => {
        /**
         * @param {Date} inDate
         * @param {(1|2)} formatNo
         */
        function getDateString(inDate, formatNo) {
            let yy = inDate.getFullYear();
            let mm = inDate.getMonth() + 1;
            let dd = inDate.getDate();
            let MM = String(mm).padStart(2, '0')
            let DD = String(dd).padStart(2, '0')
            switch (formatNo) {
                case 1:
                    return `${yy}${MM}${DD}`;
                default:
                    return ''
            }
        }
        let date = new Date()
        console.log(getDateString(date, 1))
    })
    it('getTimeString()', () => {
        /**
         * @param {Date} inDate
         * @param {(1|2)} formatNo
         */
        function getTimeString(inDate, formatNo) {
            let HH = inDate.getHours();
            let MM = inDate.getMinutes();
            let SS = inDate.getSeconds();
            let hh = String(HH).padStart(2, '0')
            let mm = String(MM).padStart(2, '0')
            let ss = String(SS).padStart(2, '0')
            switch (formatNo) {
                case 1:
                    return `${hh}${mm}${ss}`;
                default:
                    return ''
            }
        }
        let date = new Date()
        console.log(getTimeString(date, 1))
    })
    it('Check boolean and exist - default=true', () => {
        function get_isUseProdSite(isProductSite) {
            if (isProductSite === undefined || isProductSite === null)
                return true
            else
                return isProductSite
            // if(!isProductSite)
            //     return true
            //return isProductSite
        }
        chai.expect(get_isUseProdSite(undefined)).to.be.equal(true);
        chai.expect(get_isUseProdSite(null)).to.be.equal(true);
        chai.expect(get_isUseProdSite(true)).to.be.equal(true);
        chai.expect(get_isUseProdSite(false)).to.be.equal(false);
    })
    it('Destructuring assignment', () => {
        //https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        let array1 = [10, 20, 30, 40, 50]
        let a, b, rest;
        // [a] = array1
        // console.log(a)
        [a, b, ...rest] = array1
    })
    it('chai assert exist', () => {
        //chai.assert.isAbove(9, 8, '5 is greater or equal to 2')
        let pp
        //pp = null
        chai.expect(pp).to.exist
    })
    it('test1', () => {

    })
})