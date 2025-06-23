import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrapper>
      <p>
        &copy; {new Date().getFullYear()} 
        <span> HandiMart</span> — Celebrating Indian Handicrafts
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: auto;
  padding: 1rem 0;
  background: #5d4037; /* Warm brown for a traditional feel */
  text-align: center;
  border-top: 4px double #d7ccc8; /* ornamental border */

  p {
    margin: 0;
    color: #fce4ec; /* soft rose pink */
    font-family: 'Georgia', serif; /* traditional look */
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  span {
    color: #ffcc80; /* warm mustard highlight */
    font-weight: bold;
    font-family: 'Brush Script MT', cursive; /* elegant handcrafted font */
    margin-left: 4px;
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

export default Footer;
