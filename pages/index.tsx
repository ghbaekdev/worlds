import axios from 'axios';
import type { NextPage } from 'next';
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userListState, loadingState } from '../store/store';
import * as S from './ranking';
import { cloneDeep } from 'lodash';
import Head from 'next/head';
import styled from 'styled-components';
import TrophyCard from '../components/TrophyCard/TrophyCard';
import RankingTable from '../components/RankingTable/RankingTable';
import Loading from '../components/Loading/Loading';
import { UserType } from '../type/userType';

const Home: NextPage = () => {
  const [userList, setUserList] = useRecoilState(userListState);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useRecoilState(loadingState);
  const [filterList, setfilterList] = useState<UserType[] | undefined>();

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

  const stageRank = useMemo(() => {
    return cloneDeep(userList).sort((prev, curr) => {
      if (curr.last_stage.split('-')[0] === prev.last_stage.split('-')[0]) {
        return (
          Number(curr.last_stage.split('-')[1]) -
          Number(prev.last_stage.split('-')[1])
        );
      } else {
        return (
          Number(curr.last_stage.split('-')[0]) -
          Number(prev.last_stage.split('-')[0])
        );
      }
    });
  }, [userList]);

  const searchStage = (inputValue: string) => {
    const result = userList.filter((user) => {
      return user.last_stage === inputValue;
    });
    setfilterList(result);
    setInputValue('');
  };

  if (loading) return <Loading />;

  return (
    <Wrapper>
      <Head>
        <title>World of War</title>
        <link rel="shortcut icon" href="/image/sword.png" />
        <meta name="main" content="메인 페이지입니다." />
      </Head>
      <TrophyCardBox>
        {stageRank.slice(0, 3).map((user, index) => {
          return <TrophyCard data={user} index={index} key={user.uid} />;
        })}
      </TrophyCardBox>
      <SearchInput
        type="text"
        placeholder="stage ex: 11-10"
        onChange={(e: any) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <SearchButton onClick={() => searchStage(inputValue)}>검색</SearchButton>
      <SearchButton onClick={() => setfilterList()}>전체</SearchButton>
      <RankingBox>
        {filterList ? (
          <RankingTable list={filterList} />
        ) : (
          <RankingTable list={stageRank.slice(3, stageRank.length)} />
        )}
      </RankingBox>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled(S.Wrapper)`
  height: 1600px;
`;

const TrophyCardBox = styled.div`
  display: flex;
  width: 700px;
  margin: 50px auto 0 auto;
`;

const RankingBox = styled.div`
  width: 500px;
  margin: 50px auto 0 auto;
`;

const SearchInput = styled.input``;

const SearchButton = styled.button``;
