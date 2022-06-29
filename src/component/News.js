import React, {useEffect , useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const news =(props)=> {

 

 const [articles, setarticles] = useState([])
 const [loading, setloading] = useState(true)
 const [page, setpage] = useState(1)
 const [totalResults, settotalResults] = useState(0)


 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 

  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5f2ba704503c4a08b393f1129539a7d4
      &page=${page}&pageSize=${props.pageSize}`;
    
    setloading(true)
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json()
    props.setProgress(75);

    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)
     props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - Newsmonkey`;
    updateNews();
  }, [])
  
  const handlePrevClick = async () => {
    setpage(page-1)
    updateNews();
  }

  const handleNextClick = async () => {
    setpage(page + 1)
    updateNews();
  }

  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5f2ba704503c4a08b393f1129539a7d4
      &page=${page + 1}&pageSize=${props.pageSize}`;
      setpage(page + 1)
    
    let data = await fetch(url);
    let parsedData = await data.json()
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
   };

   return (
      
    <> 

      <div className='conatainer my-3 mx-4'>
        <h1 className="text-center"  style={{ margin: "60px 0px", marginTop: '75px' }}> NewsMonkey - top {capitalizeFirstLetter(props.category)} headlines</h1>

        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
            <div className="container">
            <div className="row">
            {articles.map((elements) => {
              return <div className="col-md-3" key={elements.url}>
                <Newsitem title={elements.title.slice(0, 26)} description={elements.title.slice(0, 62)} imageUrl={elements.urlToImage} newsUrl={elements.url}
                  author={elements.author} date={elements.publishedAt} source={elements.source.name} />
              </div>
            })}

          </div>
          </div>
        </InfiniteScroll>


      </div>
      </>
    )
 };       
  


news.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: 'general'
}

news.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default news
