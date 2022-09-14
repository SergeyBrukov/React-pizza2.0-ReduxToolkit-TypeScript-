import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IPizza } from '../../interface/interface';
import { addProduct } from '../../redux/reducer/cartSlice';

interface IPizzaBlock {
  pizza: IPizza;
}

const PizzaBlock: FC<IPizzaBlock> = ({ pizza }) => {
  const { imageUrl, name, price, sizes, types, id } = pizza;

  const typeNames = ['тонкое', 'традиционное'];
  const [sizesIndex, setSizesIndex] = useState<number>(sizes[0]);
  const [activeTypesIndex, setActiveTypesIndex] = useState<number>(0);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleActiveSizes = (index: number) => {
    setSizesIndex(index);
  };
  const handleActiveType = (type: number) => {
    setActiveTypesIndex(type);
  };
  const { basketItem } = useAppSelector((state) => state.cartSlice);

  const countPizza = basketItem.find((item) => item.id === id);

  const addedCount = countPizza ? countPizza.count : 0;

  const onClickAdd = () => {
    const basketItem = {
      ...pizza,
      sizes: sizesIndex,
      count: 0,
      types: !activeTypesIndex ? 'тонкое' : 'традиционное',
    };
    dispatch(addProduct(basketItem));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4
        className="pizza-block__title"
        onClick={() => navigate(`/pizza-detail/${id}/${name}`, { state: { pizza } })}>
        {name}
      </h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => {
            return (
              <li
                key={type}
                className={activeTypesIndex === type ? 'active' : ''}
                onClick={() => handleActiveType(type)}>
                {typeNames[type]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size) => {
            return (
              <li
                key={size}
                className={sizesIndex === size ? 'active' : ''}
                onClick={() => handleActiveSizes(size)}>
                {size}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{addedCount}</i>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
