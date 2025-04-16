import React, { useState } from 'react';
import './Content.css';

const Content = ({ Title, Author, Image, Link, Story }) => {
  const [showStory, setShowStory] = useState(false);

  const handleOnClick = () => {
    setShowStory((prev) => !prev);
  };

  return (
    <div className='container'>
      <div className='Info'>
        <h3>{Title}</h3>
        <h4>By: {Author}</h4>
        <button onClick={handleOnClick}>
          {showStory ? 'Hide Story' : 'Read More'}
        </button>

        <div className={`story-box ${showStory ? 'slide-down' : 'slide-up'}`}>
          <p>{Story}</p>
        </div>
      </div>
      <img src={Image} alt="Content"/>
    </div>
  );
};

export default Content;
