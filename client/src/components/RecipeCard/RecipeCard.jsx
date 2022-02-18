import React from 'react';

import { RatingSystem } from '../RatingSystem/RatingSystem';

import { eyeIcon } from '../../images';

import './style.css'

export const RecipeCard = (props) => {

  return (
    <div className={`recipe-card ${props.empty ? 'empty': ''}`}>

      {
        props.empty ? (<></>) : (
        <>
          <div className="img-box">
            <img src={props.image} alt="" />
          </div>

          <div className="info-box">
            <p>{props.recipeName}</p>
            <div className="feedback">
              
              <div className="views">
                <img src={eyeIcon} alt="eye icon" />
                <span>{props.views}</span>
              </div>

              <div className="rating-box">  
                <div className="rating">
                  <RatingSystem rating={props.rating} nameId={props.nameId} disable />
                </div>
                <span>{props.reviews}</span>
              </div>
            </div>
          </div>
        </>
        )
      }
    </div>
  )
};

 
