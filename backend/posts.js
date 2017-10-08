const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'The Night Shift Brewery has the best beer!',
    body: 'Everyone says so after all.',
    author: 'Brew Snob',
    category: 'breweries',
    voteScore: 6,
    deleted: false
  },
  "21657620-9596-11e7-b012-7d616c1bf16f": {
    id: '21657620-9596-11e7-b012-7d616c1bf16f',
    timestamp: 1468479767190,
    title: 'The best hoppy beers',
    body: 'Here are two of the best hoppy beers: Smuttynose Finest Kind, Notch Left of the Dial',
    author: 'Live long and Hoppy',
    category: 'beers',
    voteScore: 9,
    deleted: false
  },
    "ada5a7f0-9595-11e7-b594-bb4ce735fe61": {
    id: "ada5a7f0-9595-11e7-b594-bb4ce735fe61",
    timestamp: 1468479767190,
    title: 'Tomatillo beer',
    body: 'If you brew your own beer, you can put almost anything in there. But that doesn\'t mean you should. Tomatillo beer, for example, sucks!',
    author: 'OddBrew',
    category: 'homebrewing',
    voteScore: -5,
    deleted: false
  },
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts.deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}