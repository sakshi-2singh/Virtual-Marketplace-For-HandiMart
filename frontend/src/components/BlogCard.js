import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import ReactMarkdown from 'react-markdown';

const BlogCard = ({ blog }) => {
  const { slug, title, image, description, category, date } = blog;

  const finalDescription =
    description.length > 250 ? description.substring(0, 250) + '...' : description;

  return (
    <div className="blog-card-wrapper">
      <Link to={`/blog/${slug}`} className="blog-card">
        <div className="blog-card-img">
          <img
            src={image?.fields?.file?.url || '/images/default-blog.jpg'}
            alt={title || 'Blog Image'}
          />
        </div>

        <div className="blog-card-content">
          <h4 className="blog-title">{title}</h4>
          <p className="blog-description">
            <ReactMarkdown>{finalDescription}</ReactMarkdown>
          </p>
          <div className="blog-footer">
            <span className="blog-category">{category}</span>
            <span className="blog-date">
              <i className="far fa-calendar"></i> {formatDate(date)}
            </span>
          </div>
        </div>
      </Link>
      <hr />
    </div>
  );
};

export default BlogCard;
