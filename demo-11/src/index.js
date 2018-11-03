import axios from 'axios'


var btn = document.createElement('button');
btn.innerHTML = '跨域请求'
btn.onclick = function() {
  axios.get('/revision/album/getTracksList', {
    params: {
      albumId: 3268363,
      pageNum: 1
    }
  }).then( (res) => {
    alert(res.data.msg)
  }).catch((error) => {
    alert('失败')
  })
}

document.body.appendChild(btn)


