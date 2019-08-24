import _ from 'lodash'

function createDomElement() {
  var dom = document.createElement('div')
  dom.innerHTML = _.join(['webpack', '练习', 'GongT'], '~')
  return dom
}

document.body.appendChild(createDomElement())