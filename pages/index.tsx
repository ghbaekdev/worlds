import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Ranking from '../components/Ranking/Ranking';
import styled from 'styled-components';

const Home: NextPage = () => {
  const [userList, setUserList] = useState({});

  useEffect(() => {
    axios.get('/api/users').then((res) => {
      if (res.status === 200) {
        setUserList(res.data.result);
      } else {
        console.log('error');
      }
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Worlds</title>
        <meta name="main" content="메인 페이지입니다." />
      </Head>
      <Ranking />
    </div>
  );
};

export default Home;

const BodyWrap = styled.div``;
