import React, { useState, useEffect, MouseEventHandler, FC } from 'react';
import { useRef } from 'react';
import { useClickAway } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSort } from '../../redux/reducer/filterSlice';
import { SORT_ITEMS } from '../../utils/const';

const Sort: FC = () => {
  const [activeSortPopup, setActiveSortPopup] = useState(false);
  const activePopup = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const { sort } = useAppSelector((state) => state.filterSlice);
  const handleSort = (value: string, name: string) => {
    const sortValue = {
      name,
      sortProperty: value,
    };
    dispatch(setSort(sortValue));
  };

  useClickAway(() => {
    setActiveSortPopup(false);
  }, activePopup);
  // useEffect(() => {
  //   //i dont understand how write type on this event

  //   const examinationClickPopup = (e: any) => {
  //     const path = e.path || (e.composedPath && e.composedPath());
  //     if (!path.includes(activePopup.current)) {
  //       setActiveSortPopup(false);
  //     }
  //   };
  //   document.body.addEventListener('click', examinationClickPopup);
  //   return () => {
  //     document.body.removeEventListener('click', examinationClickPopup);
  //   };
  // }, []);

  return (
    <div className="sort" ref={activePopup} onClick={() => setActiveSortPopup(!activeSortPopup)}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{sort.name}</span>
      </div>
      <div className={activeSortPopup ? 'sort__popup active' : 'sort__popup'}>
        <ul>
          {SORT_ITEMS.map(({ sortProperty, name }, index) => {
            return (
              <li
                key={index}
                onClick={() => handleSort(sortProperty, name)}
                className={sort.sortProperty === sortProperty ? 'active' : ''}>
                {name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sort;
