import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../../contexts/Auth'
import { api } from '../../services/api';

import './style.css'

export const RatingSystem = (props) => {
    const { user } = useContext(AuthContext)
    const { recipeId } = useParams()
    const ratingArray = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, .5]
    const rating = Math.abs(Math.round((props.rating * 2)) - 10)

    const sendFeedback = async value => {
        if(user) {
            await api.put(`recipes/${recipeId}/update-rating`, { 
                rating: value,
                user_id: user.id 
            })
        }
    }
    
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
                            onClick={() => sendFeedback(rate)}
                        />
                    )
                })
            }
        </div>
    )
}
