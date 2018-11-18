
let wrapper = document.querySelector('#wrapper')

let element = document.createElement('div')

// 调用koa2传过来的数据
element.innerHTML = G_USER
element.classList.add('hello')

wrapper.appendChild(element)
