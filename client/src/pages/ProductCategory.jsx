import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
    const { products } = useAppContext();
    const { category } = useParams();

    // Find the category details
    const searchCategory = categories.find((item) =>
        item.path.toLowerCase() === category
    );

    // Filter the products based on the current category    
    const filteredProducts = products.filter((product) =>
        product.category.toLowerCase() === category
    );

    return (
        <div className="mt-16 px-4 md:px-8">
            {searchCategory && (
                <div className="flex flex-col items-end w-max mx-auto">
                    <p className="text-2xl font-medium text-right">
                        {searchCategory.text.toUpperCase()}
                    </p>
                    <div className="w-16 h-0.5 bg-primary rounded-full"></div>
                </div>
            )}

            {/* Show products or message if not found */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-[60vh]">
                    <p className="text-2xl font-medium text-primary">
                        No products found in this category.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProductCategory;
