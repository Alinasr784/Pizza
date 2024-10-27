import React from 'react'
import '../css/landing.css'
function Text() {
  return (
    <div className="text">
      <div className="title">Let's Pizza Time</div>
      <div className="des">Welcome to Let's Pizza Time, your ultimate destination for pizza lovers! We offer a diverse range of the most delicious pizzas, made from fresh, high-quality ingredients.</div>
    </div>
  )
};
function Btns() {
  return (
    <div className="btns">
      <div className="order">Order Online</div>
      <div className="book">Book a Table</div>
    </div>
  )
}
function Abs() {
  return (
    <div>
      <div className="slice">
        <img src="/slice.png" />
      </div>
      <div className="slice2">
        <img src="/half.png" />
      </div>
      <div className="slice3">
        <img src="/small.png" />
      </div>
    </div>
  )
}
function Landing() {
  return (
    <div className="landing">
      <div className="overlay">
        <Text />
        <Btns />
        <Abs />
      </div>
    </div>
  )
}
export default Landing 