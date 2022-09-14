import React, { useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { setPagination } from '../../redux/reducer/filterSlice';
import Context from '../Context/Context';
import styles from './Pagination.module.scss';

const Pagination = () => {
  const { pizzas } = useAppSelector((state) => state.pizzasSlice);
  const dispatch = useDispatch();

  // const handleChangePagePagination = (e: any) => {
  //   dispatch(setPagination(e.selected + 1));
  // };

  const handleChangePagePagination = (page: number) => {
    dispatch(setPagination(page));
  };

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => handleChangePagePagination(e.selected + 1)}
      pageRangeDisplayed={pizzas?.length}
      pageCount={3}
      previousLabel="<"
      // renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
