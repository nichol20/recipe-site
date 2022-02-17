import React from 'react';
import './style.css'
export const RatingSystem = (props) => {
    const ratingArray = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, .5]
    const rating = Math.abs(Math.round((props.rating * 2)) - 10)
    
    return (
        <div className="rating">
            {
                ratingArray.map((rate, i) => {
                    return (
                    <input 
                        key={i}
                        {...(rating === i ? { defaultChecked: 'defaultChecked' } : '')}
                        {...(props.disable ? { disabled: 'disabled' } : '')}
                        className={ props.disable ? '' : 'active'}
                        type="radio" 
                        name={props.nameId}
                    />
                    )
                })
            }
        </div>
    )
}


