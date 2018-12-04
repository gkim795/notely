import React from 'react';
import styles from './News.css';

const News = ({articles}) => {
 
  const news = articles 
  const newsData = news.map(article => {
    return (
      <li> 
        <a href={article.url}>{article.title}</a>
      </li>
    )
  })
  return (
    <div id="news">
    <h4> Top Headlines for today </h4>
    <ol className={styles.articles}> 
    {newsData}
    </ol>
    </div>
  )
}

export default News;