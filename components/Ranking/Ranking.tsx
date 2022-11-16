import React, { ChangeEvent, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserListType, UserType } from '../../type/userType';
import usePagination from '../../hooks/usePagination';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';

const Ranking = ({ list }: UserListType) => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(list.length / PER_PAGE);
  const _DATA = usePagination(list, PER_PAGE);

  const handleChange = (e: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    _DATA.jump(page);
  };
  return (
    <TableWrap>
      <TableContainer component={Paper} style={{ width: '500px' }}>
        <Table sx={{ maxWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Lv</TableCell>
              <TableCell align="center">Stats</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_DATA.currentData().map((users: UserType, index: number) => {
              let rank;
              if (page > 1) {
                rank = index + 1 + (page - 1) * 10;
              } else {
                rank = index + 1;
              }
              let userItem = users.items.reduce(
                (acc, cur: any) => {
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
                  <TableCell component="th" scope="row">
                    {rank}
                  </TableCell>
                  <TableCell align="left">{users.uid}</TableCell>
                  <TableCell align="left">{users.lv}</TableCell>
                  <TableCell align="center">
                    <StatsBox>
                      <span>attack: + {userItem.attack}</span>
                      <span>magic: + {userItem.magic}</span>
                      <span>defence: + {userItem.defence}</span>
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

export default Ranking;

const TableWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatsBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 14px;
  }
`;
