import { useEffect, useState } from 'react';
import './App.css';
import './components/productsPage.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const getProductsData = async () => {
    const response = await fetch('https://dummyjson.com/products?limit=100');
    const data = await response.json();
    console.log(data.products);
    setProducts(data.products);
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const handleSelectedPage = (selectedPage) =>{
    if(selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page)
    setPage(selectedPage);
  }

  return (
    <div className='App'>
      <h1>Pagination</h1>
      {products.length > 0 && (
        <div className='products'>
          {products.slice(page*10 - 10, page*10).map((prod) => (
            <span className='products__single' key={prod.id}> 
            <img src={prod.thumbnail} alt={prod.title} />
            <span>{prod.title}</span>
            </span>
          ))}
        </div>
      )}
      <div className='pagination'>
        <span className={page > 1 ? '' : 'pagination__disabled'} onClick={() => handleSelectedPage(page - 1)}>Prev</span>
        {[...Array(products.length / 10)].map((_, i) => (
          <span className={page === i+1 ? 'pagination_selected': ''} onClick={() => handleSelectedPage(i+1)} key={i}>{i+1}</span>
        ))}
        <span className={page < products.length / 10 ? '' : 'pagination__disabled'} onClick={() => handleSelectedPage(page + 1)}>Next</span>
      </div>
    </div>
  );
}

export default App;
