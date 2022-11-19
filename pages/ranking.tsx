import Head from 'next/head';
import { useMemo } from 'react';
import RankingTable from '../components/RankingTable/RankingTable';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';
import { userListState } from '../store/store';
import { useRecoilState } from 'recoil';
import Loading from '../components/Loading/Loading';
import useGetList from '../hooks/useGetList';

const Ranking = () => {
  const [userList] = useRecoilState(userListState);

  const { loading } = useGetList();

  const levelRank = useMemo(() => {
    return cloneDeep(userList).sort((prev, curr) => curr.lv - prev.lv);
  }, [userList]);

  const pvpRank = useMemo(() => {
    return cloneDeep(userList).sort(
      (prev, curr) => prev.pvp_rank - curr.pvp_rank
    );
  }, [userList]);

  if (loading)
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );

  return (
    <Wrapper>
      <Head>
        <title>World Log</title>
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
  @media ${({ theme }) => theme.responsive.mobile} {
    height: 2500px;
    width: ${({ theme }) => theme.mobile};
  }
`;

export const BodyWrap = styled.div`
  display: flex;
  width: 1200px;
  margin: 20px auto 0 auto;
  @media ${({ theme }) => theme.responsive.mobile} {
    flex-direction: column;
    width: ${({ theme }) => theme.mobile};
  }
`;
const RankBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media ${({ theme }) => theme.responsive.mobile} {
    margin: 50px auto 0 auto;
    width: ${({ theme }) => theme.small};
  }
`;

const RankingTitle = styled.div`
  margin: 30px 0 15px 10px;
  font-weight: 600;
`;
