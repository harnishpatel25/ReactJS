import { useState, useEffect } from 'react';

const PRODUCTS_URL = '/api/products'

export default function ProductList({ refreshKey }) {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function getProducts() {
          try {
              const response = await fetch(PRODUCTS_URL, { signal: controller.signal });
          
          
            if (!response.ok) {
              throw new Error(`Failed to load products (${response.status})`)
            }

            const data = await response.json()
            setProducts(data)
            setError(null)

            }  catch (error) {
              if (error.name === 'AbortError') {
                  return;
              }
              setError(error.message);
            } finally {
                if (!controller.signal.aborted) {
                  setLoading(false);
                }
            }
        }

        getProducts();

        return () => controller.abort()

    }, [refreshKey]);
    

    if (loading) {
        return <p>Loading products...</p>
    }

    if (error) {
    return <p role="alert">{error}</p>
    }

    if (products.length === 0) {
    return <p>No products found.</p>
    }
    return (
        <table>
          <caption>Products</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
    
    function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(price)

};