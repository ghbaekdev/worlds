import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import logo from '../../public/image/sword.png';

const Nav_Links = ['Ranking', 'Country', 'Reward', 'Stage'];

const Nav = () => {
  return (
    <NavWrap>
      <Link href="/">
        <NavTitle>
          <Image src={logo} alt="logo" width={50} height={50} />
          <span>World</span>
        </NavTitle>
      </Link>
      <CategoriesWrap>
        {Nav_Links.map((category) => {
          return <NavCategories key={category}>{category}</NavCategories>;
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
  font-size: 32px;
  font-weight: 600;
  line-height: 60px;
  text-align: center;
  cursor: pointer;

  span {
    margin-left: 20px;
  }
`;

const CategoriesWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: 500px;
  width: 100%;
`;

const NavCategories = styled.div`
  margin: 0 20px;
  font-weight: 500;
  cursor: pointer;
`;
