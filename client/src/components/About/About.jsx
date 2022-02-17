import React from 'react';

import { Header } from '../Header/Header';

import './style.css'

export const About = () => {
  return (
      <div className="about">
        <Header />
        <section>
            <h1>know about us</h1>
            <article>
                <h2>Who we are</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio, quia quis temporibus repellendus nihil maiores, nam eius optio illo recusandae ea ipsum et eaque beatae a facere ducimus dicta? Lorem ipsum dolor sit amet consectetur adipisicing elit. Id saepe necessitatibus illo nulla perferendis eius, similique ad distinctio eligendi, ea neque fugit dolorum nisi architecto enim quisquam assumenda quaerat. Expedita?</p>
            </article>
            <article>
                <h2>Our history</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio, quia quis temporibus repellendus nihil maiores, nam eius optio illo recusandae ea ipsum et eaque beatae a facere ducimus dicta? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ipsum nulla natus fuga inventore dignissimos reiciendis laboriosam! Officiis alias doloremque excepturi, delectus repellat assumenda, reprehenderit incidunt expedita, praesentium quisquam aliquid?</p>
            </article>
            <article>
                <h2>what led us to create this site?</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum odio, quia quis temporibus repellendus nihil maiores, nam eius optio illo recusandae ea ipsum et eaque beatae a facere ducimus dicta?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis delectus, nemo, aperiam minus cumque vel ex eveniet iusto quae provident excepturi corrupti veritatis? Maxime nemo maiores impedit magnam, facilis quibusdam! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt neque aperiam odit autem non repellendus, illum nesciunt eligendi numquam dolores earum repellat asperiores rerum natus doloribus saepe dolor impedit magnam!</p>
            </article>
            <article>contact us <a href="/contact">here</a></article>   
        </section>
      </div>
  )
};


