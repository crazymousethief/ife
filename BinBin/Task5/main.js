let newArray = (function(id, ...args) {
  let _id,
    _bindedElement,
    _cpArgs = args.concat([])

  Object.defineProperties(args, {
    id: {
      get: function() {
        return _id
      },
      set: function(v) {
        _id = v
        _bindedElement = document.getElementById(v)
      },
    },
    bindedElement: {
      get: function() {
        return _bindedElement
      },
    },
  })

  ;['push', 'unshift', 'pop', 'shift'].forEach((name, _) => {
    args[name] = function(...e) {
      Array.prototype[name].call(args, ...e)
      if (_ > 1) e = [0]
      for (let i of typeof e === 'number' ? [e] : e) {
        let newDiv = document.createElement('div')
        newDiv.className = 'box'
        newDiv.setAttribute('style', `height: ${i * 2}px;`)
        newDiv.onclick = function() {
          let i = 0
          for (const e of this.parentNode.childNodes) {
            if (e === this) args.splice(i, 1)
            i++
          }
          this.parentNode.removeChild(this)
        }
        switch (name) {
          case 'push':
            args.bindedElement.appendChild(newDiv)
            break
          case 'unshift':
            args.bindedElement.insertBefore(
              newDiv,
              args.bindedElement.firstChild
            )
            break
          case 'pop':
          case 'shift':
            let delEle =
              args.bindedElement[name == 'shift' ? 'firstChild' : 'lastChild']
            if (delEle === null) break
            alert(delEle.textContent)
            args.bindedElement.removeChild(delEle)
            break
        }
      }
    }
    document.getElementById(name).onclick = function() {
      let value = document.getElementById('input').value
      if (!isNaN(value) && (value >= 10 && value <= 100)) args[name](value)
    }
  })

  args.id = id
  args.length = 0
  args.push(..._cpArgs)

  args.swap = function(x, y) {
    if (x > y) x, (y = y), x
    this[x] = this.splice(y, 1, this[x])[0]
    let eX = _bindedElement.childNodes.item(x),
      eY = _bindedElement.childNodes.item(y)
    _bindedElement.insertBefore(eX, eY)
    _bindedElement.insertBefore(eY, _bindedElement.childNodes.item(x))
  }
  return args
})('list', 100, 90, 80, 20)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function bubbleSort(arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        await sleep(1000)
        arr.swap(j, j + 1)
      }
    }
  }
}
bubbleSort(newArray)
