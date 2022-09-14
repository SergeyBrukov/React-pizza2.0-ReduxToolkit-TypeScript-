import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCategoryId } from '../../redux/reducer/filterSlice';
import { CATEGORIES } from '../../utils/const';

const Catefories: FC = () => {
  const { categoryId } = useAppSelector((state) => state.filterSlice);
  const dispatch = useAppDispatch();

  const handleChangeCategoties = (index: number) => {
    dispatch(setCategoryId(index));
  };

  return (
    <div className="categories">
      <ul>
        {CATEGORIES &&
          CATEGORIES.map((categories, index) => {
            return (
              <li
                key={categories}
                onClick={() => handleChangeCategoties(index)}
                className={categoryId === index ? 'active' : ''}>
                {categories}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Catefories;
