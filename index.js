const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 1.45,
      quantity: 1,
      isFruite: false
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 5.55,
      quantity: 1,
      isFruite: false
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.95,
      quantity: 1,
      isFruite: true
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.75,
      quantity: 1,
      isFruite: false
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.85,
      quantity: 1,
      isFruite: true
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.99,
      quantity: 1,
      isFruite: true
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 1.35,
      quantity: 1,
      isFruite: false
    },
    {
      id: "008-berry",
      name: "berry",
      price: 2.35,
      quantity: 1,
      isFruite: true
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 4.35,
      quantity: 1,
      isFruite: true
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 4.35,
      quantity: 1,
      isFruite: false
    }
  ],
  cart: []
};


function store (thing) {
  const ul = document.querySelector('.store--item-list')
  ul.classList.add('item-list')

  const li = document.createElement('li')
  const item = document.createElement('div')
  item.className = 'store--item-icon'

  ul.append(li)
  li.append(item)

  const img = document.createElement('img')
  img.setAttribute('src', `assets/icons/${thing.id}.svg`)
  img.setAttribute('alt', thing.name)
  item.append(img)
  const button = document.createElement('button')
  button.innerText = 'Add to cart'
  button.setAttribute('id', thing.id)
  li.append(button)
  button.addEventListener('click', (e) => {
    checkQuantity(e.target.id) ? thing.quantity++ : state.cart.push(thing)
    render()
  })
}
state.items.forEach(item => store(item))

function render () {
  let ul = document.querySelector('.cart--item-list')
  ul.remove()

  ul = document.createElement('ul')
  ul.classList.add('cart--item-list', 'item-list')

  for (const item of state.cart) {
    const li = document.createElement('li')

    const img = document.createElement('img')
    img.classList.add("cart--item-icon")
    img.setAttribute('src', `assets/icons/${item.id}.svg`)
    img.setAttribute('alt', item.name)

    const p = document.createElement('p')
    p.innerText = item.name

    const buttonS = document.createElement('button')
    buttonS.innerText = '-'
    buttonS.classList.add("quantity-btn", "remove-btn", "center")
    buttonS.setAttribute('id', item.id)
    buttonS.addEventListener('click', (e) => {
      decremental(e.target.id)
      render()
    })

    const title = document.createElement('span')
    title.innerText = item.quantity
    title.classList.add("quantity-text", "center")

    const buttonA = document.createElement('button')
    buttonA.innerText = '+'
    buttonA.classList.add("quantity-btn", "add-btn", "center")
    buttonA.setAttribute('id', item.id)
    buttonA.addEventListener('click', (e) => {
      incremental(e.target.id)
      render()
    })

    li.append(img)
    li.append(p)
    li.append(buttonS)
    li.append(title)
    li.append(buttonA)
    ul.append(li)
  }
  const container = document.querySelector('.cart--item-list-container')
  container.append(ul)
  checkout()
}

function checkQuantity (item) {
  return state.cart.some(x => x.id === item)
}

function decremental (item) {
  const n = state.cart.find(x => x.id === item)
  n.quantity > 1 ? n.quantity-- : state.cart.splice(state.cart.indexOf(n), 1)
}

function incremental (item) {
  const n = state.cart.find(x => x.id === item)
  n.quantity++
}

function checkout () {
  let sum = 0

  for (let n of state.cart) {
    sum += n.price * n.quantity
  }
  const total = document.querySelector(".total-number")
  total.innerText = `£${sum.toFixed(2)}`
}

const filter = document.querySelector("#types")
filter.addEventListener("change", (e) => {
  applyFilter(e.target.value)
})

const topUl = document.querySelector('.store--item-list')

function applyFilter (value) {
  while (topUl.hasChildNodes()) {
    topUl.removeChild(topUl.firstChild)
  } if (value === "fruits") {
    const arr = state.items.filter(item => item.isFruite === true)
    arr.forEach(item => store(item))
  } else if (value === "vegetables") {
    const arr = state.items.filter(item => item.isFruite === false)
    arr.forEach(item => store(item))
  } else state.items.forEach(item => store(item))
}

const sortItems = document.querySelector("#sort")
sortItems.addEventListener('change', (e) => {
  sortBy(e.target.value)
})

function sortBy (value) {

  while (topUl.hasChildNodes()) {
    topUl.removeChild(topUl.firstChild)
  }
  if (value === "alphabetically") {
    const arr = state.items.map(item => item.name).sort().map(item => finder(item))
    arr.forEach(item => store(item))
  }
  else if (value === "price(Lowest-First)") {
    const arr = state.items.map(item => item.price)
    const arr2 = mergeSort(arr).map(item => priceFinder(item))
    arr2.forEach(item => store(item))
  }
  else if (value === "price(Highest-First)") {
    const arr = state.items.map(item => item.price)
    const arr2 = mergeSort(arr).reverse().map(item => priceFinder(item))
    arr2.forEach(item => store(item))
  }
  else state.items.forEach(item => store(item))
}

function finder (name) {
  return state.items.find(item => item.name === name)
}
function priceFinder (price) {
  return state.items.find(item => item.price === price)
}

// I know that the .sort() method works perfectly
// however I just wanted to practice algorethms.

function mergeSort (array) {
  if (array.length < 2) return array

  const midIndex = Math.floor(array.length / 2)
  const leftArr = array.slice(0, midIndex)
  const rightArr = array.slice(midIndex, array.length)

  return merge(mergeSort(leftArr), mergeSort(rightArr))
}

function merge (leftArr, rightArr) {
  let resultArr = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
    if (leftArr[leftIndex] < rightArr[rightIndex]) {
      resultArr.push(leftArr[leftIndex])
      leftIndex += 1
    }
    else {
      resultArr.push(rightArr[rightIndex])
      rightIndex += 1
    }
  }
  return resultArr.concat(leftArr.slice(leftIndex)).concat(rightArr.slice(rightIndex))
}

