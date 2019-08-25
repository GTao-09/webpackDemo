import _ from 'lodash' // 使用js中的lodash库
import '../css/index.css' // 引入css
import '../css/index.styl' // 引入css

function createDomElement() {
  let dom = document.createElement('div')
  dom.innerHTML = _.join(['webpack', '练习', 'GongT'], '~')
  dom.classList.add('test') // dom.className = 'test'
  return dom;
}

document.body.appendChild(createDomElement());
console.log('test1')

class demo {
  show () {
    console.log('es6 test')
  }
}

let d = new demo()
d.show()