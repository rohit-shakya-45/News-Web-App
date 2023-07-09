import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 5,
        category: "general"
    }



    static PropType = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0

        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News AajTak`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7cc7cc2711834b028e810aafa21efd34&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json()
        this.props.setProgress(70);
        console.log(parseData);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        // // console.log("cdm");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7cc7cc2711834b028e810aafa21efd34&page=1&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parseData = await data.json()
        // console.log(parseData);
        // this.setState({articles: parseData.articles, totalResults: parseData.totalResults})
        this.updateNews();
    }

    handlePrevClick = async () => {
        //    console.log("Previous")

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7cc7cc2711834b028e810aafa21efd34&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parseData = await data.json()
        // console.log(parseData);
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parseData.articles
        // })
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        console.log("Next");
        //      if ( this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        //      }
        //      else{

        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7cc7cc2711834b028e810aafa21efd34&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     let data = await fetch(url);
        //     let parseData = await data.json()
        //     console.log(parseData);
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parseData.articles
        //     })
        // }
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    fetchMoreData = async () => {
       this.setState({page: this.state.page + 1})
       const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7cc7cc2711834b028e810aafa21efd34&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
    
        let parseData = await data.json()
       
        console.log(parseData);
        this.setState({ articles: this.state.articles.concat(parseData.articles), totalResults: parseData.totalResults })
        
      };









    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>News - AajTak - Top   {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >          
             <div className="container">

           
                    <div className="row">
                        {this.state.articles.map((elemnent) => {

                            return <div className="col-md-4" key={Element.url}>
                                <NewsItem title={Element.title} description={elemnent.description} imageUrl={elemnent.urlToImage} newsUrl={Element.Url} author={elemnent.author} date={Element.publishedAte} />

                            </div>
                        })}
                    </div>
                    </div>
                
                    </InfiniteScroll>

                
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

            </div>
        )
    }
}

export default News
