
const fetch = require('node-fetch')

const baseURL = 'http://localhost'
const url = './a1.txt'
const newURL = new URL(url, baseURL)

fetch(newURL)
.then((res) => {
    console.log(res.text())
})