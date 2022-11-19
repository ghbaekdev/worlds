import { userListState } from '../store/store';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import * as S from './ranking';
import { UserType } from '../type/userType';
import PieChart from '../components/PieChart/PieChart';
import BarChart from '../components/BarChart/BarChart';
import Head from 'next/head';
import Loading from '../components/Loading/Loading';
import useGetList from '../hooks/useGetList';
import { useMemo } from 'react';

const Reward = () => {
  const [userList] = useRecoilState(userListState);

  const { loading } = useGetList();

  const countryData = useMemo(() => {
    const result = userList.reduce(
      (acc, cur: UserType) => {
        if (cur.country === 'kr') acc.kr += 1;
        if (cur.country === 'us') acc.us += 1;
        if (cur.country === 'cn') acc.cn += 1;
        if (cur.country === 'jp') acc.jp += 1;
        if (cur.country === 'vn') acc.vn += 1;
        return acc;
      },
      {
        kr: 0,
        us: 0,
        cn: 0,
        jp: 0,
        vn: 0,
      }
    );
    return result;
  }, [userList]);

  const rewardData = useMemo(() => {
    const result = userList.reduce(
      (acc, cur: UserType) => {
        if (cur.reward_type === 'VVIP') acc.vvip += 1;
        if (cur.reward_type === 'VIP') acc.vip += 1;
        if (cur.reward_type === 'NORMAL') acc.normal += 1;
        return acc;
      },
      {
        vvip: 0,
        vip: 0,
        normal: 0,
      }
    );
    return result;
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
      <S.BodyWrap>
        <ChartBox>
          <span>County</span>
          <PieChart filter={countryData} />
        </ChartBox>
        <ChartBox>
          <span>Reward</span>
          <BarChart filter={rewardData} />
        </ChartBox>
      </S.BodyWrap>
    </Wrapper>
  );
};

export default Reward;

const Wrapper = styled(S.Wrapper)`
  height: 1000px;
  @media ${({ theme }) => theme.responsive.mobile} {
    height: 1500px;
    width: ${({ theme }) => theme.mobile};
  }
`;

const ChartBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 24px;
    font-weight: 600;
    margin: 100px 0 0 100px;

    @media ${({ theme }) => theme.responsive.mobile} {
      margin: 50px 0 0 30px;
    }
  }
`;
