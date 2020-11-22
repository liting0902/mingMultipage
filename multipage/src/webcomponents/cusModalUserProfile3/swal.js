let formModifyPassword = document.querySelector('#formModifyPassword')
//let btnValid = document.querySelector('#btnValid')
formModifyPassword.addEventListener('submit',(e) => {
    e.preventDefault()
    console.log('formModifyPassword valid check')
})
// btnValid.addEventListener('click',(e) => {
//     // e.preventDefault()
//     console.log('btnValid clicked!...........')
// })

let btnTest1 = document.querySelector('#btnTest1')
let btnTest2 = document.querySelector('#btnTest2')
let btnTest3 = document.querySelector('#btnTest3')
let btnTest4 = document.querySelector('#btnTest4')
btnTest1.addEventListener('click', (e) => {
    Swal.fire('Oops...', 'Something went wrong!', 'error')

})
btnTest2.addEventListener('click', (e) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Deleted!',
                'Your imaginary file has been deleted.',
                'success'
            )
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
})
btnTest3.addEventListener('click', (e) => {
    // const {
    //     value: password
    // } = await Swal.fire({
    //     title: 'Enter your password',
    //     input: 'password',
    //     inputLabel: 'Password',
    //     inputPlaceholder: 'Enter your password',
    //     inputAttributes: {
    //         maxlength: 10,
    //         autocapitalize: 'off',
    //         autocorrect: 'off'
    //     }
    // })
    // Swal.fire(`Entered password: ${password}`)
    // if (password) {
    //     Swal.fire(`Entered password: ${password}`)
    // }
    Swal.fire({
            title: 'Enter your password',
            input: 'password',
            inputLabel: 'Password',
            inputPlaceholder: 'Enter your password',
            inputAttributes: {
                maxlength: 10,
                autocapitalize: 'off',
                autocorrect: 'off'
            },
            showCancelButton: true,
            inputValidator: (value) => {
                return false
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })
        .then((e) => {
            console.log(e)

        })
})
btnTest4.addEventListener('click', (e) => {
    let html = `
    <div class="inputField1">
            <span class="titleWhite">輸入舊密碼</span>
            <input id="swal-input1" type="password" class="swal2-input">
        </div>
        <div class="inputField1">
            <span class="titleWhite">輸入新密碼</span>
            <input id="swal-input2" type="password" class="swal2-input">
        </div>
        <div class="inputField1">
            <span class="titleWhite">再次輸入新密碼</span>
            <input id="swal-input3" type="password" class="swal2-input">
        </div>
        `;

    // html: '<input id="swal-input1" class="swal2-input">' +
    //     '<input id="swal-input2" class="swal2-input">',
    Swal.fire({
            title: '修改密碼',
            html: html,
            customClass: {
                confirmButton: 'swalbtn'
            },
            inputAttributes: {
                maxlength: 10,
                autocapitalize: 'off',
                autocorrect: 'on'
            },
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value
                ]
            }
        })
        .then((e) => {
            console.log(e)
        })

    // if (formValues) {
    //     Swal.fire(JSON.stringify(formValues))
    // }
})