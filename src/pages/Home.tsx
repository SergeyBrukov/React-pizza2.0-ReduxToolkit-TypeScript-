import React, { ChangeEventHandler, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Catefories from '../components/categori/Catefories';
import PizzaBlock from '../components/pizza-block/PizzaBlock';
import Skeleton from '../components/skeleton/Skeleton';
import Sort from '../components/sort/Sort';
import InputGroup from '../components/input-group/InputGroup';
import Pagination from '../components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { useDebounce } from 'ahooks';
import { useCallback } from 'react';
import {
  initialState,
  setFilter,
  setLocationTranskate,
  setSearchValue,
} from '../redux/reducer/filterSlice';
import { useSearchParams } from 'react-router-dom';
import { SORT_ITEMS } from '../utils/const';
import { fetchPizzas } from '../redux/reducer/pizzasSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { EStatusLoading } from '../enums/enums';

interface IParams {
  [index: string]: any;
}

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { categoryId, sort, page, searchValue, lang } = useAppSelector(
    (state) => state.filterSlice,
  );

  const dispatch = useAppDispatch();

  const { pizzas, status } = useAppSelector((state) => state.pizzasSlice);

  const [value, setValue] = useState('');
  const isMounted = useRef(false);

  const fetchSortFilterHandler = () => {
    const order = sort.sortProperty?.includes('-') ? 'ask' : 'desc';
    const category = categoryId ? `?category=${categoryId}&` : '?';
    const search = searchValue ? `&search=${searchValue.toLowerCase()}` : '';
    const pagePagination = `&page=${page}&limit=4`;
    const sortParams = sort.sortProperty?.replace('-', '');
    dispatch(fetchPizzas({ order, category, search, pagePagination, sortParams }));
  };

  useEffect(() => {
    fetchSortFilterHandler();
  }, [categoryId, sort, page, searchValue]);

  const customSearchParamsFun = () => {
    const params: IParams = {};
    if (categoryId !== initialState.categoryId) params.categoryId = categoryId;
    if (page) params.page = page;
    if (searchValue.length) params.searchValue = searchValue;
    if (lang) params.lang = lang;
    if (sort.sortProperty !== initialState.sort.sortProperty) params.sort = sort.sortProperty;
    setSearchParams(params);
    console.log(params);
  };

  useEffect(() => {
    if (isMounted.current) {
      customSearchParamsFun();
    }
    if (!isMounted.current && window.location.search) {
      const dispatchSearchParams: any = {};
      // @ts-ignore
      for (const [key, value] of searchParams.entries()) {
        dispatchSearchParams[key] = value;
      }
      dispatch(
        setFilter({
          ...initialState,
          ...dispatchSearchParams,
          sort: searchParams.get('sort')
            ? SORT_ITEMS.find((item) => item.sortProperty === dispatchSearchParams.sort)
            : initialState.sort,
        }),
      );
      dispatch(setLocationTranskate(searchParams.get('lang') || 'en'));
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, page, searchValue, lang]);

  // const updateSearchValue = useCallback(
  //   debounce((value: string) => {
  //     dispatch(setSearchValue(value));
  //   }, 1000),
  //   [],
  // );

  const debouncedValue = useDebounce(value, { wait: 500 });
  dispatch(setSearchValue(debouncedValue));
  const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    // updateSearchValue(e.target.value);
  };

  const clearValue = (): void => {
    setValue('');
    dispatch(setSearchValue(''));
  };
  // const [name, setName] = useState('');
  // const [surName, setSurName] = useState('');

  // const testMemo = (name, surname) => {
  //   console.log('>>>>>', `${name} ${surname}`);
  //   return { name, surname };
  // };

  // const user = useMemo(() => testMemo(name, surName), [name, surName]);
  // console.log(user);

  // const [count, setCount] = useState(0);

  if (status === EStatusLoading.error) {
    return (
      <div className="cart cart--empty">
        <h2>
          Все плохо <span>😕</span>
        </h2>
      </div>
    );
  }

  return (
    <div>
      {/* <input type="text" onChange={(e) => setName(e.target.value)} />
      <input type="text" onChange={(e) => setSurName(e.target.value)} /> */}
      <div className="content">
        <div className="container">
          <div className="content__top">
            <InputGroup
              value={value || searchValue}
              clearValue={clearValue}
              type="text"
              placeholder="Search"
              handleChange={searchHandler}
            />
            <Catefories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === EStatusLoading.loading && <Skeleton />}
            {pizzas?.map((pizza) => {
              if (status === EStatusLoading.loading) {
                return <Skeleton key={pizza.id} />;
              } else {
                return <PizzaBlock key={pizza.id} pizza={pizza} />;
              }
            })}
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
