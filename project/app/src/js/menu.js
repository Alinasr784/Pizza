import React, { useState } from 'react';
import '../css/menu-tablet.css';

const SearchBar = ({ onSearch }) => {
    const handleInputChange = (event) => {
        onSearch(event.target.value); // تمرير القيمة المدخلة إلى مكون المتجر
    };

    return (
        <div className="search-bar">
            <input 
                type="text" 
                onChange={handleInputChange} 
                placeholder="Search for products..." 
                className="search-input"
                required 
            />
        </div>
    );
};

function Product(props) {
    const handleOrderOnline = () => {
        window.location.href = '/checkout'; // توجيه المستخدم لصفحة checkout
    };

    return (
        <div className="product-card">
            <div className="product-card-img">
                <img src={props.img} alt={props.name} />
            </div>
            <div className="product-card-name">{props.name}</div>
            <div className="product-card-price">{props.price ? props.price : "$0.00"}</div>
            <div className="product-card-buttons">
                <div className="product-card-order" onClick={handleOrderOnline}>Order Online</div>
                <div className="product-card-add">Add to Cart</div>
            </div>
        </div>
    );
}

function Store() {
    const [searchTerm, setSearchTerm] = useState('');

    const products = [
        { img: "/small.png", name: "Pizza Margherita", price: "$10.00" },
        { img: "/small.png", name: "Pizza Pepperoni", price: "$12.00" },
        { img: "/small.png", name: "Pizza Veggie", price: "$11.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },
        { img: "/small.png", name: "Pizza Hawaiian", price: "$13.00" },

        // أضف المزيد من المنتجات حسب الحاجة
    ];

    // دالة لتصفية المنتجات بناءً على مصطلح البحث
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="shop">
            <SearchBar onSearch={setSearchTerm} /> {/* تمرير دالة البحث إلى مكون البحث */}
            <div className="shop-section-title">Our Menu</div>
            <div className="shop-section-content">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <Product key={index} img={product.img} name={product.name} price={product.price} />
                    ))
                ) : (
                    <div className="no-results">لا توجد نتائج تطابق بحثك</div>
                )}
            </div>
        </div>
    );
}

export default Store;