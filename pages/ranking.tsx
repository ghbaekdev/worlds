import Head from 'next/head';
import { useEffect, useMemo } from 'react';
import RankingTable from '../components/RankingTable/RankingTable';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';
import { userListState, loadingState } from '../store/store';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import Loading from '../components/Loading/Loading';

const Ranking = () => {
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

  const levelRank = useMemo(() => {
    return cloneDeep(userList).sort((prev, curr) => curr.lv - prev.lv);
  }, [userList]);

  const pvpRank = useMemo(() => {
    return cloneDeep(userList).sort(
      (prev, curr) => prev.pvp_rank - curr.pvp_rank
    );
  }, [userList]);

  if (loading) return <Loading />;

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
          <RankingTable list={levelRank} />
        </RankBox>
        <RankBox>
          <RankingTitle>PVP Rank</RankingTitle>
          <RankingTable list={pvpRank} />
        </RankBox>
      </BodyWrap>
    </Wrapper>
  );
};

export default Ranking;

export const Wrapper = styled.div`
  width: 100%;
  height: 1200px;
  background-color: ${({ theme }) => theme.colors.mainColor};
`;

export const BodyWrap = styled.div`
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
