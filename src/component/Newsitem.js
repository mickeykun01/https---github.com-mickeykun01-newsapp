import React from 'react'

const Newsitem =(props)=> {


        let { title, description, imageUrl, newsUrl, author, date, source } = props
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0',
                    }
                    }>
                        <span className="badge rounded-pill bg-danger">{source}</span>

                    </div>
                    <img src={!imageUrl ? "https:english.cdn.zeenews.com/sites/default/files/2022/05/04/1038815-covid-infection.gif" : imageUrl} className="card-img-top" alt="..." />

                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : 'unknown'} on {new Date(date).toGMTString()}</small></p>

                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>

                    </div>
                </div>
            </div>

        )
    
}
export default Newsitem