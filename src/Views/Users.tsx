import React, { useState, useEffect } from 'react';
import { RouteProps } from 'react-router-dom';
import company from './../API/company';

type User = {
  user_id: number
  email: string
  password: string
  role: string
}

const Users: any = (props: RouteProps) => {
  //const [categoriesData, setCategoriesData] = useState<User[]>([]);
  //const [loading, setLoading] = useState<boolean>(true);

  useEffect(()=> {
    company('/users').then(({data}) => {
      console.log(data);
    });
  },[]);

  return (
    <div>
      <h1>Users</h1>
    </div>
  )
}

export default Users;