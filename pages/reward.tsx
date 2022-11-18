import React, { useEffect } from 'react';
import { userListState, loadingState } from '../store/store';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import * as S from './ranking';
import axios from 'axios';
import { UserType } from '../type/userType';
import PieChart from '../components/PieChart/PieChart';
import BarChart from '../components/BarChart/BarChart';
import Head from 'next/head';
import Loading from '../components/Loading/Loading';

const Reward = () => {
  const [userList, setUserList] = useRecoilState(userListState);
  const [loading, setLoading] = useRecoilState(loadingState);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/users')
      .then((res) => {
        setUserList(res.data.data.result);
        setLoading(false);
      })
      .catch((error) => console.log(error, '통신에러'));
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

  if (loading) return <Loading />;

  return (
    <Wrapper>
      <Head>
        <title>World Log</title>
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
    </Wrapper>
  );
};

export default Reward;

const Wrapper = styled(S.Wrapper)`
  height: 1000px;
`;

const ChartBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 24px;
    font-weight: 600;
    margin: 100px 0 0 100px;
  }
`;
