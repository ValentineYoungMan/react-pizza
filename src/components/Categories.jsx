import React from 'react';

function Categories({ value, onChangeCategory }) {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grille', 'Spicy', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={value == i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}

        {/*<li onClick={() => onClickCategory(0)} className={activeIndex == 0 ? 'active' : ''}>
          All
        </li>
         <li onClick={() => onClickCategory(1)} className={activeIndex == 1 ? 'active' : ''}>
          Meat
        </li>
        <li onClick={() => onClickCategory(2)} className={activeIndex == 2 ? 'active' : ''}>
          Vegetarian
        </li>
        <li onClick={() => onClickCategory(3)} className={activeIndex == 3 ? 'active' : ''}>
          Grille
        </li>
        <li onClick={() => onClickCategory(4)} className={activeIndex == 4 ? 'active' : ''}>
          Spicy
        </li>
        <li onClick={() => onClickCategory(5)} className={activeIndex == 5 ? 'active' : ''}>
          Closed
        </li> */}
      </ul>
    </div>
  );
}

export default Categories;
