import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category_preview/CategoryPreview.component';

import { selectCategoriesMap } from '../../store/categories/category.selector';

import './categories_preview.styles.scss';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} productsArray={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
