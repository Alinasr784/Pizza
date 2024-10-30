import React from 'react';
import '../css/shop-tablet.css';
function Product(props){
  return(
    <div>
      <div className="product-card">
        <div className="product-card-img">
          <img src={props.img} alt={props.name} />
        </div>
        <div className="product-card-name">{props.name}</div>
        <div className="product-card-price">{props.price ? props.price : "$0.00"}</div>
        <div className="product-card-buttons">
          <div className="product-card-order">Order Online</div>
          <div className="product-card-add">Add to Cart</div>
        </div>
      </div>
    </div>
  );
}

function Shop(){
  return(
    <div className="shop">
      <div className="shop-section-title">Our Delicious Dishes</div>
      <div className="shop-section-content">
        <Product img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <Product img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <Product img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <Product img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <Product img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <Product img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <Product img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <Product img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <Product img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <Product img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <Product img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <Product img={"/small.png"} name={"Pizza test"} price={"$10.00"} />

      </div>
    </div>
  );
}
export default Shop 