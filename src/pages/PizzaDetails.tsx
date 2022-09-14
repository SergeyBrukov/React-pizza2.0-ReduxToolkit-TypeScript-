import axios from 'axios';
import React, { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import Skeleton from '../components/skeleton/Skeleton';
import { useAppDispatch, useAppSelector } from '../hooks';
import { changeLoading } from '../redux/reducer/loadingSlice';
import { pizzaFetchDetail } from '../redux/reducer/pizzaDetailSlice';

const PizzaDetails: FC = () => {
  const { id } = useParams();

  const loading = useAppSelector((state) => state.loadingSlice.loading);
  const { pizza } = useAppSelector((state) => state.fetchPizzaDetail);
  console.log(loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(pizzaFetchDetail({ id }));
    }
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="container">
      <img src={pizza?.imageUrl} />
      <h2>{pizza?.name}</h2>
      <h4>{pizza?.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default PizzaDetails;
