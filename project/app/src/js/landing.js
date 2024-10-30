import React from 'react'
if (window.innerWidth > 599) {
  import('../css/landing-tablet.css')
} else {
  import('../css/landing-phone.css')
}
function Text() {
  return (
    <div className="text">
      <div className="title">Let<div>'s</div>Pizza Time</div>
      <div className="des">Welcome to Let's Pizza Time, your ultimate destination for pizza lovers! We offer a diverse range of the most delicious pizzas, made from fresh, high-quality ingredients.</div>
    </div>
  )
};
function Btns() {
  return (
    <div className="btnslanding">
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
        <img src="/small.png" alt="small"/>
      </div>
    </div>
  )
}

function Landing() {
  const ui = () => {
    if (window.innerWidth > 599) {
      return (
        <div className="landing">
          <div className="overlay">
            <Text />
            <Btns />
            <Abs />
          </div>
        </div>
      )
    } else {
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
  }
  return (
    <div>
      {ui()}
    </div>
  )
}
export default Landing 