import { useEffect } from 'react';
import React, { useState }from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=> {
  
  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [totalResults, setTotalResults] = useState('');
  const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
  

  const updateNews = async()=>{
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d91e6b4a1526457ea83a9a99cc084ca6&page=${page}&pageSize=${props.pageSize}`;
    // setLoading(true);
    props.setProgress(10);
    let data = await fetch(url);
    let parsedata = await data.json();
    props.setProgress(50);

    // setLoading(false);
    setTotalResults(parsedata.totalResults);
    setArticles(parsedata.articles)
    props.setProgress(100);

    console.log(page);
  }

  useEffect(() => {
    updateNews();
    /* eslint-disable-next-line */ 
  }, [])

  const fetchData= async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d91e6b4a1526457ea83a9a99cc084ca6&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    
    setPage(page+1);
    setArticles(articles.concat(parsedata.articles));
    setTotalResults(parsedata.totalResults);

    console.log(page);
  }

  // Now making an infinite scroll so that's why removing them.

  // const handlePrevClick = async ()=>{
  //   console.log("Previous is clicked");
  //   setPage(page-1);
  //   updateNews();
  // }

  // const handleNextClick = async ()=>{
  //   console.log("Next is clicked");
  //   setPage(page+1);
  //   updateNews();
  // } 

  return (
    <>
      <h1 className= "text-center" style={{margin: '90px 0px 30px 0px'}}>{`COUNTRY NEWS - Top ${capitalizeFirstLetter(props.category)} Headlines`}</h1>
      {/* {this.state.loading && <Spinner />} */}
      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
      <div className="container">
        <div className="row">
          {articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title?element.title:"".slice(0, 45)} description={element.description?element.description:"".slice(0, 88)} imageUrl={element.urlToImage?element.urlToImage:"https://ychef.files.bbci.co.uk/live/624x351/p0gsh29l.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div> 
          })}
        </div>
      </div>
      </InfiniteScroll>


      {/* Now making an infinite scroll so that's why removing them. */}

      {/* <div className="container d-flex justify-content-between">
      <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
      <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
      </div> */}
    </>
  )
}

export default News
