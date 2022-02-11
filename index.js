const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      quantity: 1
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      quantity: 1
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      quantity: 1
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      quantity: 1
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      quantity: 1
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      quantity: 1
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      quantity: 1
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      quantity: 1
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      quantity: 1
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      quantity: 1
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
    console.log(e.target.id)
    if (checkQuantity(e.target.id)) {
      thing.quantity++
    }
    else {
      state.cart.push(thing)
    }
    render()
  })
}

for (let item of state.items) {
  store(item)
}

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


}

function checkQuantity (item) {
  return state.cart.some(x => x.id === item)
}

function decremental (item) {
  const n = state.cart.find(x => x.id === item)
  if (n.quantity > 1) {
    n.quantity--
  }
  else {
    state.cart.splice(state.cart.indexOf(n), 1)
  }
}
function incremental (item) {
  const n = state.cart.find(x => x.id === item)
  n.quantity++
}