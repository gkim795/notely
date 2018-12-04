/*  global chrome */

import React from 'react';
import ReactDOM from 'react-dom';

import styles from './App.css';

import Todo from './Todo.jsx';
import Clock from './Clock.jsx'
import News from './News.jsx'
import Quote from 'inspirational-quotes';
import shortid from 'shortid';

const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('394ff56cd171439fa31272c04e0a01cc')
 


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'Glory',
      quote: [{
        text: 'Invest in now',
        author: 'Glory Kim'
      }],
      todo: [],
      news: [],
      count: 0,
    } 
    this.getHeadlines = this.getHeadlines.bind(this)
    this.getNotes = this.getNotes.bind(this)
  };

  componentDidMount () {
    this.getHeadlines()
    this.getNotes()
  }

  getHeadlines () {
    newsapi.v2.topHeadlines({
      category: 'politics',
      language: 'en',
      country: 'us'
    }).then(response => {
      const brief = response.articles.slice(0,6)
      let news = []
      for (let i in brief){
        let blurb = {};
        blurb.url = brief[i].url;
        blurb.title = brief[i].title;
        blurb.id = `${i}${shortid.generate()}`;
        news.push(blurb)
      }
      this.setState({
        news:news
      })
      return brief
    }).then (()=> {
      const quote = Quote.getQuote()
      this.setState({
        quote: [quote]
      })
    })
  }

  getNotes () {
    let storageData = localStorage
    let todo = []
    for (let keys in storageData) {
      if(keys.slice(0,4) == 'task'){
        todo.push(storageData[keys])
      }
    }

    let count = localStorage.length;
    this.setState({todo, count})
  }


  render () {

    return (
      <div id="main" className={styles.main}>
      <h2>{this.state.quote[0].text} - {this.state.quote[0].author}</h2>
        <Clock />
        <div id="container" className={styles.container}>
          <Todo key={this.state.todo} count={this.state.count} todo={this.state.todo} getNotes={this.getNotes} />
          <News articles={this.state.news}/>
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(
  React.createElement(App),
  document.getElementById('app'),
);