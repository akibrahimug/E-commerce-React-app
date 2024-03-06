// import { useContext } from "react";
// import { CategoriesContext } from "../../components/context/categories.context";
import CategoryPreview from '../../components/categoryPriview/category-preview.components'
import { useSelector } from 'react-redux'
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector'
import Spinner from '../../components/spinner/spinner'
const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title]
          return <CategoryPreview key={title} title={title} products={products} />
        })
      )}
    </>
  )
}

export default CategoriesPreview
