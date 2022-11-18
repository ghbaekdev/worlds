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
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Home: NextPage = () => {
  const [userList, setUserList] = useRecoilState(userListState);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useRecoilState(loadingState);
  const [filterList, setfilterList] = useState<UserType[]>([]);

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
    console.log(result);
    setfilterList(result);
    setInputValue('');
  };

  if (loading) return <Loading />;

  return (
    <Wrapper>
      <Head>
        <title>World Log</title>
        <link rel="shortcut icon" href="/image/sword.png" />
        <meta name="main" content="메인 페이지입니다." />
      </Head>
      <TrophyCardBox>
        {stageRank.slice(0, 3).map((user, index) => {
          return <TrophyCard data={user} index={index} key={user.uid} />;
        })}
      </TrophyCardBox>
      <SearchBox>
        <TextField
          label="STAGE"
          placeholder="stage ex: 11-10"
          variant="outlined"
          name="keyword"
          value={inputValue}
          onChange={(e: any) => setInputValue(e.target.value)}
          size="small"
          style={{ background: 'white' }}
        />
        <SearchIcon
          style={{ position: 'absolute', right: '200px', cursor: 'pointer' }}
          onClick={() => searchStage(inputValue)}
        />

        <button onClick={() => setfilterList([])}>ALL</button>
      </SearchBox>
      <RankingBox>
        {filterList.length === 0 ? (
          <RankingTable list={stageRank.slice(3, stageRank.length)} />
        ) : (
          <RankingTable list={filterList} />
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
  margin: 10px auto 0 auto;
`;

const SearchBox = styled.div`
  width: 500px;
  margin: 50px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  button {
    height: 36px;
    margin: 0 10px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    border: 1px rgba(0, 0, 0, 0.3) solid;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.deepGrey};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
