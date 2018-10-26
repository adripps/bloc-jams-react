import React from 'react';
import './landing.css';


const Landing = () => (
  <section className="landing">

  <h1 className="hero-title">Turn the music up!</h1>
  <video autoplay="autoplay" muted width="900" height="240" loop>
    <source src="/assets/mp4s/turnTable.mp4" type="video/mp4"/>
  </video>
 <section className="selling-points">
   <div className="point">
     <ion-icon name="musical-notes"></ion-icon>
     <h2 className="point-title">Choose your music</h2>
     <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
   </div>
   <div className="point">
     <ion-icon name="logo-rss" ></ion-icon>
     <h2 className="point-title">Unlimited, streaming, ad-free</h2>
     <p className="point-description">No arbitrary limits. No distractions.</p>
   </div>
   <div className="point">
     <ion-icon name="phone-portrait" ></ion-icon>
     <h2 className="point-title">Mobile enabled</h2>
     <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
   </div>
 </section>
  </section>
);

export default Landing;
