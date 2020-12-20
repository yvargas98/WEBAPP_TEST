import React, { useState, useEffect } from 'react';
import { RouteProps } from 'react-router-dom';
import company from './../API/company';

type Category = {
  category_id: string
  name: string
  description: string
}

const Categories: any = (props: RouteProps) => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(()=> {
    company('/categories').then(({data}) => {
      setCategoriesData(data);
      setLoading(false);
    });
  },[]);

  return !loading && (
    <div>
      <h1>Categories</h1>
    </div>
  )
}

export default Categories;