import React, { FC, useEffect, useState } from 'react';
import RoutesBlock from './components/routes/Routes';
import 'rc-pagination/assets/index.css';
import './scss/app.scss';
import './i18n';

const App: FC = () => {
  return (
    <div className="wrapper">
      <RoutesBlock />
    </div>
  );
};

export default App;
