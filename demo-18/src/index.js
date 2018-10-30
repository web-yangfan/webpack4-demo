import { log, sex } from './libs/lib.js'

let add = (a, b) => {
    return a + b
}

add(10, 10)

$('#app').html('<p>Eslint</p>')
log()
sex()

// 屏蔽一样
let test=()=>{console.log('正确的代码格式')} // eslint-disable-line

/* eslint-disable */

let test2=()=>{
  console.log('区块屏蔽')
}

/* eslint-enable */






