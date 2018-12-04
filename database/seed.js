const db = require('./index.js')
const Promise = require('bluebird');
const faker = require('faker')

const generator = () => {
  const result = [];
  for (let i = 0; i < 20; i +=1 ){
    const names = ['Glory', 'Wendy', 'Mindy', 'Rebecca', 'Jenny']
    let random = (max) => {
      return Math.floor(Math.random() * max )
    }
    const details = {
      name: names[random(4)],
      task: faker.hacker.phrase(),
      urgent: random(1),
      complete: random(1),
    }
    result.push(details)
  }
  return result
}

const Gen = Promise.resolve(generator());

Gen.then((seeded)=>{
  const queryString = 'INSERT INTO tasks (name, task, urgent, complete) values (?, ?, ?, ?)'
  const data = seeded
  for (let i = 0; i <20; i +=1){
    let current = data[i]
    const taskData = [
      current.name,
      current.task,
      current.urgent,
      current.complete
    ]

    db.query(queryString, taskData, (error)=> {
      if(error) {
        console.log(error.message)
      } else {
        console.log('data saved in db')
      }
    })
  }
})