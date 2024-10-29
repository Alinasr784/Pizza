import React from 'react'
if (window.innerWidth > 599) {
  import('../css/cards-tablet.css')
} else {
  import('../css/cards-phone.css')
}
function Title() {
  return (
    <div>
      <div className="cards-section-title">Browse our menu</div>
    </div>
  )
}
function Des() {
  return (
    <div>
      <div className="cards-section-des">Lorem ipsum dolor sit amet consectetur adipiscing elit ugue quam diam vitae</div>
    </div>
  )
}
function Card(props) {
  return (
      <div className="card" id={props.id}>
        <div className="icon">
          <img src={props.icon} alt="icon"/>
        </div>
        <div className="card-title">{props.cardTitle}</div>
        <div className="card-des">{props.cardDes}</div>
        <div className="card-btn">
          <div className="card-btn-text">Explore Menu</div>
          <div className="card-btn-icon">
            <img src='/arrow.svg' />
          </div>
        </div>
      </div>
  )
}
function Btns() {
  return (
    <div className="btnsCards">
      <div className="order">Order Online</div>
      <div className="book">Book a Table</div>
    </div>
  )
}
function CardsPage(){
  return(
    <div className="cardPage">
      <Title />
      <Des />
      <div className="cardSection">
        <Card icon={'/icon1.svg'} id={"card1"} cardTitle={'Breakfast'} cardDes={'Breakfast is the most impor tant meal of the day, Breakfast is the most impor tant meal '}/>
        <Card icon={'/icon2.svg'} id={"card2"} cardTitle={'Main Dishes'} cardDes={'Breakfast is the most impor tant meal of the day, Breakfast is the most impor tant meal '}/>
        <Card icon={'/icon3.svg'} id={"card3"} cardTitle={'Drinks'} cardDes={'Breakfast is the most impor tant meal of the day, Breakfast is the most impor tant meal '}/>
        <Card icon={'/icon4.svg'} id={"card4"} cardTitle={'Desserts'} cardDes={'Breakfast is the most impor tant meal of the day, Breakfast is the most impor tant meal '}/>
      </div>
      <Btns />
    </div>
  )
}
export default CardsPage 