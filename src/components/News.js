import React, { Component } from 'react'
import Spinner from './Loading';
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        pageSize: 12,
        country: 'in',
        category: 'general'
    }
    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    }
    articles = []
    capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    constructor(props) {
        super(props)
        console.log("Hello I am new conts");
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = this.props.category === "general" ? "NewsTak-Home" : `NewsTak-${this.capitalizeFirstLetter(this.props.category)}`
    }
    async updatePage() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(40)
        let parseData = await data.json()
        this.props.setProgress(60)
        console.log(parseData);
        this.props.setProgress(100)
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })

    }
    async componentDidMount() {
        await this.updatePage()
    }
    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading: false
        })

    };
    render() {
        return (
            <>
                <h3 className='text-center' style={{ margin: '30px 0px' }}>
                    {this.props.category === "general" ? "NewsTak - Top Headlines Today" : `NewsTak - Top ${this.capitalizeFirstLetter(this.props.category)} Headlines`}
                </h3>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                ><div className='container my-3'>
                        <div className="row">
                            {this.state.articles.map((elem) => {
                                return <div className="col-md-3" key={elem.url}>
                                    <Newsitem title={elem.title ? elem.title.slice(0, 45) : " "} desc={elem.description ? elem.description.slice(0, 100) : " "} imgUrl={elem.urlToImage} url={elem.url} author={elem.author} date={elem.publishedAt} source={elem.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
