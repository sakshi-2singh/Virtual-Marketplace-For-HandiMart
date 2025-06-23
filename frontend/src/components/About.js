import React from 'react';
import styled from 'styled-components';
import aboutImg from '../assets/images/Handicraft.jpg';
import aboutImg2 from '../assets/images/about-img.jpg';
import traditionImg from '../assets/images/clay.jpg';
import lightImg from '../assets/images/handloom.webp';

const About = () => {
  return (
    <Wrapper className="section">
      <div className="section-center">
        <div className="image-gallery">
          <img src={aboutImg} alt="Handicraft" />
          <img src={aboutImg2} alt="About" />
          <img src={traditionImg} alt="Tradition" />
          <img src={lightImg} alt="Light" />
        </div>
        <article>
          <div className="title">
            <h2>About HandiMart</h2>
            <div className="underline"></div>
          </div>
          <p>
            <strong>HandiMart</strong> is a vibrant online marketplace
            celebrating the essence of Indian craftsmanship. Our mission is to uplift
            traditional artisans by giving them a powerful digital platform to showcase
            and sell their unique handmade creations.
            <br /><br />
            From handwoven textiles and clay pottery to wooden carvings and embroidery,
            HandiMarket connects skilled rural craftsmen with conscious buyers seeking
            authenticity and heritage in every purchase.
            <br /><br />
            We believe every handcrafted item holds a story — of dedication, tradition,
            and cultural richness. Through our platform, artisans gain not just income,
            but recognition and pride. Our eco-friendly approach and fair pricing model
            ensure both artisans and customers benefit equally.
            <br /><br />
            Join us in reviving India’s artistic legacy, one product at a time. Discover
            the beauty of handmade — where tradition meets modernity, only at HandiMarket.
          </p>
        </article>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: #fff0f5;
  padding: 4rem 0;

  .section-center {
    display: grid;
    place-items: center;
    gap: 4rem;

    .image-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;

      img {
        width: 100%;
        display: block;
        border-radius: var(--radius);
        height: 200px;
        object-fit: cover;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease-in-out;
      }

      img:hover {
        transform: scale(1.1);
      }
    }

    article {
      text-align: left;
    }

    p {
      line-height: 2;
      max-width: 45em;
      margin: 0 auto;
      margin-top: 2rem;
      color: var(--clr-grey-5);
      font-size: 1.1rem;
    }

    .title {
      text-align: left;

      h2 {
        font-family: 'Georgia', serif;
        font-weight: bold;
        color: var(--clr-primary-5);
      }
    }

    .underline {
      margin-left: 0;
      height: 4px;
      width: 6rem;
      background: var(--clr-primary-5);
      border-radius: 4px;
    }

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }

  @media (min-width: 1280px) {
    padding-top: 8rem;
  }
`;

export default About;
