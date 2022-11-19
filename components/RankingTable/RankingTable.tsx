import React, { ChangeEvent, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserListType, UserType, Item } from '../../type/userType';
import usePagination from '../../hooks/usePagination';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';
import sword from '../../public/image/sword.png';
import wand from '../../public/image/wand.png';
import shield from '../../public/image/shield.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

const RankingTable = ({ list }: UserListType) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(list.length / PER_PAGE);
  const DATA = usePagination(list, PER_PAGE);

  const handleChange = (e: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    DATA.jump(page);
  };
  return (
    <TableWrap>
      <TableContainer component={Paper} style={{ width: '500px' }}>
        <Table sx={{ maxWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Rank</TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Lv</TableCell>
              <TableCell align="left">Stage</TableCell>
              <TableCell align="left">Stats</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DATA.currentData().map((users: UserType, index: number) => {
              let rank;
              if (page > 1) {
                rank = index + 1 + (page - 1) * 10;
              } else {
                rank = index + 1;
              }
              let userItem = users.items.reduce(
                (acc, cur: Item) => {
                  if (cur.attack) acc.attack += cur.attack;
                  if (cur.defence) acc.defence += cur.defence;
                  if (cur.magic) acc.magic += cur.magic;
                  return acc;
                },
                { attack: 0, defence: 0, magic: 0 }
              );
              return (
                <TableRow
                  key={users.uid}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" align="center">
                    {router.pathname === '/' ? rank + 3 : rank}
                  </TableCell>
                  <TableCell align="center">
                    <RankNumber>{users.uid}</RankNumber>
                  </TableCell>
                  <TableCell align="center">{users.lv}</TableCell>
                  <TableCell align="left">{users.last_stage}</TableCell>
                  <TableCell align="right">
                    <StatsBox>
                      <Stats>
                        <Image src={sword} alt="sword" width={18} height={16} />
                        <span>+ {userItem.attack}</span>
                      </Stats>
                      <Stats>
                        <Image src={wand} alt="wand" width={18} height={16} />
                        <span>+ {userItem.magic}</span>
                      </Stats>
                      <Stats>
                        <Image
                          src={shield}
                          alt="shiel"
                          width={18}
                          height={16}
                        />
                        <span>+ {userItem.defence}</span>
                      </Stats>
                    </StatsBox>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={count}
        size="medium"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        style={{ margin: '20px auto 0 auto' }}
      />
    </TableWrap>
  );
};

export default RankingTable;

const TableWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 60px;
  align-items: flex-start;
`;

const Stats = styled.div`
  height: 16px;
  display: flex;
  margin-bottom: 5px;
  span {
    margin-left: 5px;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
  }
`;

const RankNumber = styled.div``;
