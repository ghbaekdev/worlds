import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import logo from '../../public/image/logo.png';

const Nav_Links = [
  {
    title: 'Stage',
    url: '/',
  },
  {
    title: 'Country/Reward',
    url: '/reward',
  },

  {
    title: 'Ranking',
    url: '/ranking',
  },
];

const Nav = () => {
  return (
    <NavWrap>
      <Link href="/" style={{ color: 'black' }} passHref>
        <NavTitle>
          <Image
            src={logo}
            alt="logo"
            width={40}
            height={40}
            style={{ marginBottom: '5px' }}
          />
          <span>World Log</span>
        </NavTitle>
      </Link>
      <CategoriesWrap>
        {Nav_Links.map((category) => {
          return (
            <Link
              href={category.url}
              key={category.title}
              passHref
              style={{ color: 'black' }}>
              <NavCategories>{category.title}</NavCategories>
            </Link>
          );
        })}
      </CategoriesWrap>
    </NavWrap>
  );
};

export default Nav;

const NavWrap = styled.div`
  width: 1024px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavTitle = styled.header`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: 600;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
  width: 300px;
  span {
    margin-left: 20px;
  }
`;

const CategoriesWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const NavCategories = styled.div`
  margin: 0 20px;
  font-weight: 500;
  cursor: pointer;
`;
