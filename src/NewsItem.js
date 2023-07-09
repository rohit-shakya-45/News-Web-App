import React  from 'react'

const NewsItem = (props)=>{


  
    let { title, description, imageUrl, newsUrl, author, date } = props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <img src={!imageUrl ? "https://www.hindustantimes.com/ht-img/img/2023/04/15/1600x900/India-IPL-Cricket-22_1681561069680_1681561069680_1681561123565_1681561123565.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              99+
              <span class="visually-hidden">unread messages</span></span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {date}</small></p>

            <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem
