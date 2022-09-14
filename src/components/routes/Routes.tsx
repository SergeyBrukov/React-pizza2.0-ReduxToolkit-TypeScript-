import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IRouteses } from '../../interface/interface';
import NotFound404 from '../../pages/NotFound404';
import Layout from '../loyaut/Layout';
import { routes } from './routeses';

const RoutesBlock: FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map(({ path, element }: IRouteses): JSX.Element => {
            return <Route key={path} path={path} element={element} />;
          })}
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </div>
  );
};

export default RoutesBlock;
