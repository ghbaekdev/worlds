import React from 'react';
import styled from 'styled-components';
import Nav from '../Nav/Nav';

export interface ChildProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ChildProps) => {
  return (
    <MainWrap>
      <Nav />
      {children}
    </MainWrap>
  );
};

export default Layout;

const MainWrap = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.mainColor};
`;
