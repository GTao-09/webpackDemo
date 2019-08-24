import _ from 'lodash' // 使用js中的lodash库
import '../css/index.css' // 引入css
import '../css/index.styl' // 引入css

function createDomElement() {
  var dom = document.createElement('div')
  dom.innerHTML = _.join(['webpack', '练习', 'GongT'], '~')
  dom.classList.add('test') // dom.className = 'test'
  return dom
}

document.body.appendChild(createDomElement())