import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import PageNotFoundImage from '../public/assets/404error.png';
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      if (router.route === '/404') {
        router.push('/');
      }
    }, 5000);
  }, []);

  return (
    <Wrap>
      <Contents>
        <ImageSection>
          <Image
            src={PageNotFoundImage}
            alt="pagenotfoundimage"
            width={480}
            height={480}
          />
        </ImageSection>
        <TextSection>
          <TextEmoticon>: (</TextEmoticon>
          <Text>요청하신 페이지를 찾을 수 없습니다.</Text>
          <Link href="/">
            <PrevButton onClick={() => router.push('/')}>
              홈으로 이동
            </PrevButton>
          </Link>
        </TextSection>
      </Contents>
    </Wrap>
  );
};
const Wrap = styled.div`
  width: 100%;
`;
const Contents = styled.div`
  ${({ theme }) => theme.flexMixin('center', 'center')}
  width: 800px;
  padding: 70px;
  margin: 0 auto;
`;
const ImageSection = styled.div`
  ${({ theme }) => theme.flexMixin('', 'center')};
  margin-right: 10px;
`;

const TextSection = styled.div`
  width: 25%;
  margin-top: 80px;
  color: ${(props) => props.theme.mainColor};
`;
const TextEmoticon = styled.p`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 30px;
`;
const Text = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
`;
const PrevButton = styled.button`
  margin-top: 30px;
  background-color: #2542e6;
  padding: 10px 30px;
  color: white;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.25s ease;
`;
export default NotFound;
