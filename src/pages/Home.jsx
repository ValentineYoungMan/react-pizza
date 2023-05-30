import React, { useContext, useEffect, useRef, useState } from 'react';
import qs from 'qs';
import Categories from './../components/Categories';
import PizzaBlock from './../components/PizzaBlock';
import Sort, { list } from './../components/Sort';
import Skeleton from './../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { store } from '../redux/store';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { fetchPizzas, selectPizzaData, selectPizzaItems } from '../redux/slices/pizzaSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const sortType = sort.sortProperty;

  //const { searchValue } = useContext(SearchContext);

  const onChangeCatregory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );
  };
  // якщо змінили параметри і був 1й рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //якщо був 1й рендер то запитуємо піци
  useEffect(() => {
    //window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //якщо був 1й рендер то провіряємо url-парметри і зберігаємо в редаксі
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty == params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  //useEffect(() => {
  //  if (window.location.search) {
  //    fetchPizzas();
  //  }
  //}, []);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCatregory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizza</h2>
      {status == 'error' ? (
        <div>
          <h2>
            Error occurred <span>😕</span>
          </h2>
          <p>
            Failed to download pizzas
            <br />
          </p>
        </div>
      ) : (
        <div className="content__items">{status == 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
