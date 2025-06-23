import React from 'react';
import styled from 'styled-components';
import { services } from '../constants/servicesConstants';

const Services = () => {
  return (
    <Wrapper className="section">
      <div className="section-center">
        <article className="header">
          <h3>why choose us?</h3>
          <p>
          We provide a unique online platform dedicated to showcasing and selling authentic handicraft products, 
          supporting skilled artisans from across the country. Our virtual marketplace is committed to preserving 
          traditional craftsmanship while offering customers a wide range of high-quality, handmade items. By connecting artisans 
          directly with buyers, we not only promote the Indian handicraft industry on a global scale but also empower local communities 
          and encourage sustainable livelihoods.
          
          </p>
        </article>
        <div className="services-center">
          {services.map(({ id, icon, title, text }) => (
            <article key={id} className="service">
              <span className={icon}>{icon}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h3,
  h4 {
    color: var(--clr-primary-1);
  }
  background: var(--clr-primary-10);
  font-family: 'Poppins', sans-serif;

  .header h3 {
    margin-bottom: 0.5rem; /* Reduced space between heading and paragraph */
  }
  p {
    margin-bottom: 0;
    line-height: 1.9;
    color: var(--clr-primary-3);
  }
  .services-center {
    margin-top: 4rem;
    display: grid;
    gap: 2.5rem;
  }
  .service {
    background: var(--clr-primary-8);
    text-align: center;
    padding: 2.5rem 2rem;
    border-radius: var(--radius);
    p {
      color: var(--clr-primary-2);
    }
  }
  span {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 50%;
    background: var(--clr-primary-10);
    color: var(--clr-primary-1);
    svg {
      font-size: 2rem;
    }
  }
  @media (min-width: 992px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 576px) {
    .services-center {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
`;
export default Services;
