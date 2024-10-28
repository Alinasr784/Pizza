import React from 'react'

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
    <div>
      <div className="card">
        <div className="icon">
          <img src={props.icon} />
        </div>
        <div className="card-title">{props.cardTitle}</div>
        <div className="card-des">{props.cardDes}</div>
        <div className="card-btn">
          <div className="card-btn-text">{props.cardBtnText}</div>
          <div className="card-btn-icon">
          </div>
        </div>
      </div>
    </div>
  )
}