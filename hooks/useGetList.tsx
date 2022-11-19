import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getUserList } from '../api';
import { userListState } from '../store/store';

const useGetList = () => {
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useRecoilState(userListState);

  useEffect(() => {
    if (userList.length === 0) {
      setLoading(true);
      getUserList()
        .then((res) => {
          setUserList(res.data.result);
          setLoading(false);
        })
        .catch((error) => console.log(error, '통신에러'));
    }
  }, []);

  return { loading };
};

export default useGetList;
