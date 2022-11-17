import React, { useEffect } from 'react';
import { userListState } from '../store/store';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import * as S from './index';
import axios from 'axios';
import { UserType } from '../type/userType';
import PieChart from '../components/PieChart/PieChart';
import BarChart from '../components/BarChart/BarChart';
import Head from 'next/head';

const Reward = () => {
  const [userList, setUserList] = useRecoilState(userListState);

  useEffect(() => {
    axios.get('/api/users').then((res) => {
      setUserList(res.data.data.result);
    });
  }, []);

  const countryFilter = (country: string) => {
    const result = userList.filter(
      (element: UserType) => element.country === country
    );
    return result.length;
  };

  const rewardFilter = (reward: string) => {
    const result = userList.filter(
      (element: UserType) => element.reward_type === reward
    );
    return result.length;
  };

  return (
    <S.Wrapper>
      <Head>
        <title>World of War</title>
        <link rel="shortcut icon" href="/image/sword.png" />
        <meta name="main" content="메인 페이지입니다." />
      </Head>
      <S.BodyWrap>
        <ChartBox>
          <span>County</span>
          <PieChart filter={countryFilter} />
        </ChartBox>
        <ChartBox>
          <span>Reward</span>
          <BarChart filter={rewardFilter} />
        </ChartBox>
      </S.BodyWrap>
    </S.Wrapper>
  );
};

export default Reward;

const ChartBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 24px;
    font-weight: 600;
    margin: 100px 0 0 100px;
  }
`;
