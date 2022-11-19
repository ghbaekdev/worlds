import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();

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
              <NavCategories selected={category.url === router.pathname}>
                {category.title}
              </NavCategories>
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

  @media ${({ theme }) => theme.responsive.mobile} {
    flex-direction: column;
    width: 500px;
    margin: 0 auto;
  }
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

  @media ${({ theme }) => theme.responsive.mobile} {
    width: 220px;
  }
`;

const CategoriesWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  @media ${({ theme }) => theme.responsive.mobile} {
    flex-direction: column;
    width: 500px;
  }
`;

interface Selected {
  selected: boolean;
}

const NavCategories = styled.div<Selected>`
  margin: 0 20px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
  @media ${({ theme }) => theme.responsive.mobile} {
    margin-bottom: 10px;
  }
`;
