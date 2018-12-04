/*  global chrome */

import React from 'react';
import ReactDOM from 'react-dom';

import styles from './App.css';

import Todo from './Todo.jsx';
import Settings from './Settings.jsx'
import Clock from './Clock.jsx'
import News from './News.jsx'
import Quote from 'inspirational-quotes';

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
      todo: [
        {
        task: 'Clean Kitchen',
        urgent: false,
        status: false,
        },
        {
          task: 'Purchase Bathroom Shelf',
          urgent: true,
          status: false,
        },
        {
          task: 'Pay Rent',
          urgent: true,
          status: true,
        }
      ],
      news: [],
    } 
    this.getHeadlines = this.getHeadlines.bind(this)
  };

  componentDidMount () {
    this.getHeadlines()
  }

  getHeadlines () {
    newsapi.v2.topHeadlines({
      category: 'politics',
      language: 'en',
      country: 'us'
    }).then(response => {
      const brief = response.articles.slice(0,6)
      this.setState({
        news:brief
      })
      return brief
    }).then (()=> {
      const quote = Quote.getQuote()
      this.setState({
        quote: [quote]
      })
    })
  }


  render () {

    return (
      <div id="main" className={styles.main}>
      <h2>{this.state.quote[0].text} - {this.state.quote[0].author}</h2>
        <Clock />
        <p>Your tasks for today : </p> <br/>
        <div id="container" className={styles.container}>
          <Todo todo={this.state.todo} />
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