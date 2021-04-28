import Link from 'next/link';
import React from 'react';

import styled from 'styled-components';
import Nav from './Nav';
import Search from '../components/Search';

const Logo = styled.h1`

  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-30deg);

  a {

    padding: 0.5rem 1rem;
    background: yellowgreen;
    color: white;
    text-transform: uppercase;
    text-decoration: none;

  }

  @media (max-width: 1300px) {

    margin: 1rem;
    font-size: 1rem;
    text-align: center;

  }
`;

const StyledHeader = styled.header`

  .bar {

    border-bottom: 10px solid lightgreen;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;

    @media (max-width: 1300px) {

      grid-template-columns: 1fr;
      justify-content: center;
      border-bottom: 1px solid lightgreen;

    }
  }

  .sub-bar {

    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 10px solid lightgreen;

    @media (max-width: 1300px) {

      border-bottom: 1px solid lightgreen;

    }

  }
`;

export default function Header() {

  return(

    <StyledHeader>

      <div className="bar">

        <Logo>

          <Link href="/">My Shop</Link>

        </Logo>

        <Nav />

      </div>

      <div className="sub-bar">

        <Search />

      </div>

    </StyledHeader>

)

};