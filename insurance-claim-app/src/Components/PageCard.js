import React from 'react'

const PageCard = (props) => {
  return (
    <div>
        <a href={props.link}>        
            <div className="card">
                <img src={props.img} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <p className="card-text">{props.text}</p>
                </div>
            </div>
        </a>
    </div>
  )
}

export default PageCard