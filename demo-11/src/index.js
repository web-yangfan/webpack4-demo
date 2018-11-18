import printMe from './printMe.js'
import './style.css'
function component() {
	let element = document.createElement('div')
	element.innerHTML = 'webpack devServer 服务，热更新'
  element.classList.add('hello')
  
  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!'
  btn.onclick = printMe
  document.body.appendChild(element)
  document.body.appendChild(btn)
}


component()


