import React from 'react';
if (window.innerWidth > 599) {
  import('../css/shop-tablet.css')
} else {
  import('../css/shop-phone.css')
}
function ProductShop(props) {
  const handleOrderOnline = () => {
    window.location.href = '/checkout'; // توجيه المستخدم لصفحة checkout
  };

  return (
    <div>
      <div className="product-card-shop">
        <div className="product-card-img-shop">
          <img src={props.img} alt={props.name} />
        </div>
        <div className="product-card-name-shop">{props.name}</div>
        <div className="product-card-price-shop">{props.price ? props.price : "$0.00"}</div>
        <div className="product-card-buttons-shop">
          <div className="product-card-order-shop" onClick={handleOrderOnline}>Order Online</div>
          <div className="product-card-add-shop">Add to Cart</div>
        </div>
      </div>
    </div>
  );
}
function Shop(){
  return(
    <div className="shop-shop">
      <div className="shop-section-title-shop">Our Delicious Dishes</div>
      <div className="shop-section-content-shop">
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />
        <ProductShop img={"/small.png"} name={"Pizza test"} price={"$10.00"} />


      </div>
    </div>
  );
}
export default Shop 