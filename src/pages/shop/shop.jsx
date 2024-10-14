import React from 'react';
import Sidebar from '../../components/shop/shop-sidebar/Sidebar';

const Shop = () => {
    return (
        <section className="shop spad">
            <div className="container">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <Sidebar />
                    </div>
            
                    {/* Main Content */}
                    <div className="col-lg-9">
                        {/* <ProductOption />
                        <ProductList />
                        <Pagination /> */}
                    </div>
                </div>
            </div>
        </section>
      );
}

export default Shop;