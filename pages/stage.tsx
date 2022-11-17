import axios from 'axios';
import React, { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { userListState } from '../store/store';
import * as S from './index';
import { cloneDeep } from 'lodash';
import { UserType } from '../type/userType';
import Head from 'next/head';

const Stage = () => {
  const [userList, setUserList] = useRecoilState(userListState);

  useEffect(() => {
    axios.get('/api/users').then((res) => {
      setUserList(res.data.data.result);
    });
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

  console.log(stageRank.slice(0, 3));

  return (
    <S.Wrapper>
      <Head>
        <title>World of War</title>
        <link rel="shortcut icon" href="/image/sword.png" />
        <meta name="main" content="메인 페이지입니다." />
      </Head>
    </S.Wrapper>
  );
};

export default Stage;
