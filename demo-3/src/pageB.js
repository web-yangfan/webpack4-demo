function component() {
  
  let button = document.createElement('button')
  button.innerHTML = '点击我查看控制台';
  button.onclick = e => {
    import(/* webpackChunkName: "lodash" */ 'lodash').then(module => {
      console.log(module.join(['1', '2', '3'], '~'))
    })
    
    import(/* webpackChunkName: "child_pageB" */ './child_pageB.js').then(module => {
      console.log(module.default)
    })
  }
  document.body.appendChild(button)
}
component()



