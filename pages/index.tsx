import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Ranking from '../components/Ranking/Ranking';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';
import { UserType } from '../type/userType';

const Home: NextPage = () => {
  const [userList, setUserList] = useState<UserType[]>([]);

  useEffect(() => {
    axios.get('/api/users').then((res) => {
      setUserList(res.data.data.result);
    });
  }, []);

  const levelRank = useMemo(() => {
    return cloneDeep(userList).sort((prev, curr) => curr.lv - prev.lv);
  }, [userList]);

  const pvpRank = useMemo(() => {
    return cloneDeep(userList).sort(
      (prev, curr) => curr.pvp_rank - prev.pvp_rank
    );
  }, [userList]);

  console.log(pvpRank);

  return (
    <Wrapper>
      <Head>
        <title>World of War</title>
        <link rel="shortcut icon" href="/image/sword.png" />
        <meta name="main" content="메인 페이지입니다." />
      </Head>
      <BodyWrap>
        <RankBox>
          <RankingTitle>Level Rank</RankingTitle>
          <Ranking list={levelRank} />
        </RankBox>
        <RankBox>
          <RankingTitle>PVP Rank</RankingTitle>
          <Ranking list={pvpRank} />
        </RankBox>
      </BodyWrap>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 100%;
  height: 1200px;
  background-color: ${({ theme }) => theme.colors.mainColor};
`;

const BodyWrap = styled.div`
  display: flex;
  width: 1200px;
  margin: 20px auto 0 auto;
`;
const RankBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const RankingTitle = styled.div`
  margin: 30px 0 15px 10px;
  font-weight: 600;
`;
