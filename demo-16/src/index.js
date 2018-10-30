let wrapper = document.querySelector('#wrapper')

let element = document.createElement('div')
// G_USER 是express传递过来的参数
element.innerHTML = G_USER
element.classList.add('hello')

wrapper.appendChild(element)

