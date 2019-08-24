import _ from 'lodash' // 使用js中的lodash库

function createDomElement() {
  var dom = document.createElement('div')
  dom.innerHTML = _.join(['webpack', '练习', 'GongT'], '~')
  return dom
}

document.body.appendChild(createDomElement())