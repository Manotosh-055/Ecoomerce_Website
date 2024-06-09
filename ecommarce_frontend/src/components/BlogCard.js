import React from 'react';
import { Link } from 'react-router-dom';
const BlogCard = (props) => {
  const {id,title,description,date, images} = props;
  return (
    
      <div className="blog-card">
        <div className="card-image">
            <img src={images?.[0]?.url} className='img-fluid w-100' alt="blog" />
        </div>
        <div className="blog-content">
            <p className='date'>{date}</p>
            <h6 className="title">{title}</h6>
            <p className="desc" dangerouslySetInnerHTML={{__html:description?.substr(0,70)+". . ."}}></p>
            <Link to={"/blog/" + id} className='button'>Read More</Link>
        </div>
      </div>
  );
}

export default BlogCard;
