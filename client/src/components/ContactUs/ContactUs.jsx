import React from 'react';

import { mailIcon, locationIcon, callIcon, facebookIcon, twitterIcon, instagramIcon, youtubeIcon } from '../../images';

import './style.css'

export const ContactUs = () => {
  return (
    <div className="contact-us">
        <div className="container">
          
          {/* Form */}
          <div className="contact-form">
            <h3>Send a Message</h3>
            <form>
              
              <div className="row50">
                <div className="input-box">
                  <span>First Name</span>
                  <input type="text" placeholder='Emma' />
                </div>

                <div className="input-box">
                  <span>Last Name</span>
                  <input type="text" placeholder='Smith' />
                </div>
              </div>

              <div className="row100">
                <div className="input-box">
                  <span>Email</span>
                  <input type="text" placeholder='email@example.com' />
                </div>
              </div>

              <div className="row100">
                <div className="input-box">
                  <span>Subject</span>
                  <input type="text" placeholder='subject' />
                </div>
              </div>

              <div className="row100">
                <div className="input-box">
                  <span>Message</span>
                  <textarea placeholder='write your text here...'></textarea>
                </div>
              </div>

              <div className="row100">
                <div className="input-box">
                  <input type="submit" value='Send' />
                </div>
              </div>

            </form>
          </div>
          
          {/* Info */}
          <div className="contact-info">
            
            <h3>Contact Info</h3>
            
            <div className="info-box-container">
              <div className="info-box">
                <span><img src={locationIcon} alt="location icon" /></span>
                <p>Lorem ipsum, lorem IPSUM</p>
              </div>

              <div className="info-box">
                <span><img src={mailIcon} alt="mail icon" /></span>
                <a href='mailto:lorem@ipsum.com'>lorem@ipsum.com</a>
              </div>

              <div className="info-box">
                <span><img src={callIcon} alt="phone icon" /></span>
                <a href='tel:+91987654321'>+91 987 654 321</a>
              </div>
            </div>
            
            {/* Social Media Links */}
            <ul className="sci">
              <li>
                <a 
                  href="https://www.facebook.com" 
                  target='_blank' 
                  rel='noreferrer'
                ><img src={facebookIcon} alt="facebook icon" /></a>
              </li>
              <li>
                <a 
                  href="https://www.twitter.com" 
                  target='_blank' 
                  rel='noreferrer'
                ><img src={twitterIcon} alt="twitter icon" /></a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com" 
                  target='_blank' 
                  rel='noreferrer'
                ><img src={instagramIcon} alt="instagram icon" /></a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com" 
                  target='_blank' 
                  rel='noreferrer'
                ><img src={youtubeIcon} alt="youtube icon" /></a>
              </li>
            </ul>
          </div>
        </div>
    </div>
  )
};
