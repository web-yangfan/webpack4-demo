export default function(name) {
  console.log('this is a common')
  
  var element = document.createElement('div')
  element.classList.add(name)
  document.body.appendChild(element)
}
