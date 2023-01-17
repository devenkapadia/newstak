import React, { Component } from 'react'
import img from './img.gif'

export class Newsitem extends Component {
    render() {
        let { title, desc, imgUrl, url, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{ left: '83%', zIndex: 1 }}>
                        {source}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    <img src={!imgUrl ? img : imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{desc}...</p>
                        <p className='card-text'>
                            <small className="text-muted">By {!author ? "Unknown" : author} at {new Date(date).toGMTString()}</small>
                        </p>
                        <a rel="noreferrer" href={url} target="_blank" className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
