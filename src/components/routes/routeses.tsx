import React from 'react';
import { IRouteses } from '../../interface/interface';
import Cart from '../../pages/Cart';
import Home from '../../pages/Home';
import PizzaDetails from '../../pages/PizzaDetails';
import Pagination from '../pagination/Pagination';

export const routes: IRouteses[] = [
  { path: '/', element: <Home /> },
  { path: '/cart', element: <Cart /> },
  { path: '/pagination', element: <Pagination /> },
  { path: '/pizza-detail/:id/:name', element: <PizzaDetails /> },
];
