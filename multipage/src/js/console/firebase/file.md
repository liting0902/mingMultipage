https://developer.mozilla.org/zh-TW/docs/Web/API/File/Using_files_from_web_applications  
https://pjchender.blogspot.com/2019/01/js-javascript-input-file-upload-file.html  
https://web.dev/read-files/  

# 限制可上傳的檔案類型 Accept Attribute
```js
accept="image/png"
accept=".png"


accept="image/png, image/jpeg"
accept=".png, .jpg, .jpeg"

accept="image/*"
accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
```
# 取得上傳檔案的基本資訊
keywords: fileInput.files
透過 e.target.files 屬性可以取得該檔案的 Blob 物件：
```js
const fileUploader = document.querySelector('#file-uploader');

fileUploader.addEventListener('change', (e) => {
  console.log(e.target.files); // get file object
});
```

# 透過 AJAX 上傳檔案
keywords: FormData()
```js
let form = new FormData();
form.append("product[photos][]", e.target.files[i])
```
接著透過 fetch API 或其他方式把檔案送到後端：
```js
// fetchAPI
fetch('https://api.endpoint.io', {
  method: 'POST',
  body: form,
})

// jQuery
$.ajax({
  processData: false,
  data: form,
})
```
# 另一種方式是透過 JSON 來上傳檔案
```js
// STEP 1: select element and register change event
const imagePreview = document.querySelector('[data-target="image-preview"]');
const spinner = document.querySelector('[data-target="spinner"]');
const fileUploader = document.querySelector('[data-target="file-uploader"]');
fileUploader.addEventListener("change", handleFileUpload);

async function handleFileUpload(e) {
  try {
    const file = e.target.files[0];
    setUploading(true);
    if (!file) return;

    const beforeUploadCheck = await beforeUpload(file);
    if (!beforeUploadCheck.isValid) throw beforeUploadCheck.errorMessages;

    const arrayBuffer = await getArrayBuffer(file);
    const response = await uploadFileAJAX(arrayBuffer);
    
    alert("File Uploaded Success");
    showPreviewImage(file);
  } catch (error) {
    alert(error);
    console.log("Catch Error: ", error);
  } finally {
    e.target.value = '';  // reset input file
    setUploading(false);
  }
}

// STEP 2: showPreviewImage with createObjectURL
// If you prefer Base64 image, use "FileReader.readAsDataURL"
function showPreviewImage(fileObj) {
  const image = URL.createObjectURL(fileObj);
  imagePreview.src = image;
}

// STEP 3: change file object into ArrayBuffer
function getArrayBuffer(fileObj) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // Get ArrayBuffer when FileReader on load
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });

    // Get Error when FileReader on error
    reader.addEventListener("error", () => {
      reject("error occurred in getArrayBuffer");
    });

    // read the blob object as ArrayBuffer
    // if you nedd Base64, use reader.readAsDataURL
    reader.readAsArrayBuffer(fileObj);
  });
}

// STEP 4: upload file throguth AJAX
// - use "new Uint8Array()"" to change ArrayBuffer into TypedArray
// - TypedArray is not a truely Array,
//   use "Array.from()" to change it into Array
function uploadFileAJAX(arrayBuffer) {
  // correct it to your own API endpoint
  return fetch("https://jsonplaceholder.typicode.com/posts/", {
    headers: {
      version: 1,
      "content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      imageId: 1,
      icon: Array.from(new Uint8Array(arrayBuffer))
    })
  })
    .then(res => {
      if (!res.ok) {
        throw res.statusText;
      }
      return res.json();
    })
    .then(data => data)
    .catch(err => console.log("err", err));
}

// STEP 5: Create before upload checker if needed
function beforeUpload(fileObject) {
  return new Promise(resolve => {
    const validFileTypes = ["image/jpeg", "image/png"];
    const isValidFileType = validFileTypes.includes(fileObject.type);
    let errorMessages = [];

    if (!isValidFileType) {
      errorMessages.push("You can only upload JPG or PNG file!");
    }

    const isValidFileSize = fileObject.size / 1024 / 1024 < 2;
    if (!isValidFileSize) {
      errorMessages.push("Image must smaller than 2MB!");
    }

    resolve({
      isValid: isValidFileType && isValidFileSize,
      errorMessages: errorMessages.join("\n")
    });
  });
}

function setUploading(isUploading) {
  if (isUploading === true) {
    spinner.classList.add("opacity-1");
  } else {
    spinner.classList.remove("opacity-1");
  }
}
```
# JSX
```js
// FileUploader.js
import React from 'react';

async function handleUpload(e) {

  // STEP 2: 得到該檔案的 Blob, i.e., e.target.files
  const arrayBuffer = await getArrayBuffer(e.target.files[0]);
  console.log('arrayBuffer', arrayBuffer);

  const response = await uploadFile(arrayBuffer);
  console.log('response', response);
}

function getArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    // STEP 3: 轉成 ArrayBuffer, i.e., reader.result
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.readAsArrayBuffer(file);
  })
}

function uploadFile(arrayBuffer) {
  return fetch(`https://api.foobar.io`, {
    method: 'POST',

    // STEP 6：使用 JSON.stringify() 包起來送出
    body: JSON.stringify({
      appId: 3,
      format: 'png',

      // STEP 4：轉成 Uint8Array（這是 TypedArray）
      // STEP 5：透過 Array.from 轉成真正的陣列
      icon: Array.from(new Uint8Array(arrayBuffer)),
    }),
  }).then((res)=> {
    if (!res.ok) {
      throw res.statusText;
    }
    return res.json()
  })
  .then(({ data }) => console.log('data', data))
  .catch(err => console.log('err', err))
}

const FileUploader = () => {

  // STEP 1: 建立上傳表單
  return (
    <input type="file" onChange={handleUpload}/>
  )
}

export default FileUploader;
```

# 顯示預覽圖
取得欲覽圖的方式可以透過 fileReader 或 createObjectURL：
方法一： 使用 fileReader
在 onload 中的 callback，可以透過 e.target.result 取得該檔案。
```js
const curFile = curFiles[0]; // 透過 input 取得的 file object
const reader = new FileReader();
reader.onload = function (e) {
  console.log('file:', e.target.result);
};

// 使用 readAsDataURL 將圖片轉成 Base64
reader.readAsDataURL(curFile);
```
方法二：使用 createObjectURL
```js
const curFile = curFiles[0]; // 透過 input 取得的 file object
const objectURL = URL.createObjectURL(curFile);
console.log('objectURL', objectURL);
```
# 常用函式
returnFileSize
```js
function returnFileSize(number) {
  if (number < 1024) {
    return `${number}bytes`;
  } if (number > 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)}KB`;
  } if (number > 1048576) {
    return `${(number / 1048576).toFixed(1)}MB`;
  }
}
```
validFileType
```js
function validFileType(file) {
  const acceptFileTypes = ["image/jpeg", "image/png"];
  const isValidFileType = acceptFileTypes.includes(fileObject.type);
  return isValidFileType;
}
```
表單清空
```js
e.target.value = '';
```