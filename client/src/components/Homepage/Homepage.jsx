import React from 'react';

import { Header } from '..';

import { chocolateCupcakeImg } from '../../images';

import './style.css'

export const HomePage = () => {

    return(
      <div className="home-page">
        <img src={chocolateCupcakeImg} alt="chocolate cupcake" className="chocolate_cupcake" />
        <Header position="absolute" />
        <main>
            <div className="textBox">
                <h1>Wonderful recipes</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto corrupti maxime adipisci dolores! Ullam, optio illum natus facilis perferendis nostrum, dignissimos est sunt fugit a odio commodi quis, quos beatae.</p>
                <a href="/menu">Learn more</a>
            </div>
        </main>
      </div>
  )
};

