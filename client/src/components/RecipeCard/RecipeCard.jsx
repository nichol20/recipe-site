import React from 'react';

import { RatingSystem } from '../RatingSystem/RatingSystem';

import { eyeIcon } from '../../images';

import './style.css'

export const RecipeCard = (props) => {
  const { 
    nameId,
    image,
    views,
    rating,
    recipeName,
    reviews,
  } = props

  return (
    <div className={`recipe-card ${props.empty ? 'empty': ''}`}>

      {
        props.empty ? (<></>) : (
        <>
          <div className="img-box">
            <img src={image} alt="" />
          </div>

          <div className="info-box">
            <p>{recipeName}</p>
            <div className="feedback">
              
              <div className="views">
                <img src={eyeIcon} alt="eye icon" />
                <span>{views ? views.length : 0}</span>
              </div>

              <div className="rating-box">  
                <div className="rating">
                  <RatingSystem rating={rating} nameId={nameId} disable />
                </div>
                <span>{reviews ? reviews.length : 0}</span>
              </div>
            </div>
          </div>
        </>
        )
      }
    </div>
  )
};

 
