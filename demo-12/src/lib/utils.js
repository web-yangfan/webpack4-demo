(function() {
  
  let utils = function() {}
  utils.prototype.log =  function () {
    alert('我是自定义库！')
  }
  
  let initUtils = function() {
    return new utils
  }
  
  module.exports = initUtils()
})()
