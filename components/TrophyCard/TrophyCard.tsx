import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { UserType } from '../../type/userType';

const TrophyCard = ({ data, index }: { data: UserType; index: number }) => {
  return (
    <CardWrap>
      <Image
        src={`/image/trophy${index + 1}.png`}
        alt="trophy"
        width={170}
        height={130}
      />
      <CardId>{data.uid}</CardId>
      <CardStage>{data.last_stage}</CardStage>
    </CardWrap>
  );
};

export default TrophyCard;

const CardWrap = styled.div`
  width: 220px;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 15px;
  border-radius: 15px;
  padding-top: 10px;
  cursor: pointer;

  &:hover {
    margin-top: -15px;
    width: 240px;
    height: 270px;
  }
`;

const CardId = styled.span`
  font-weight: 500;
  margin: 10px 0 5px 0;
`;

const CardStage = styled.span`
  font-size: 16px;
`;
