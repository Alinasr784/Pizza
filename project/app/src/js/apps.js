import React from 'react'
if (window.innerWidth > 599) {
  import('../css/apps-tablet.css')
} else {
  import('../css/apps-phone.css')
}

function TextApp() {
  return (
    <div className="textParent-app">
      <div className="text-app">Order online Now</div>
    </div>
  )
}
function BtnAppsOrder(props) {
  return (
    <div className="btnParent-app">
      <div className="btnApp-app">{props.name}</div>
    </div>
  )
}
function Apps() {
  const ui = () => {
    if (true) {
      return (
        <div className="Apps-app">
          <TextApp />
          <div className="btnsApp-app">
            <BtnAppsOrder name={"Talabat"} />
            <BtnAppsOrder name={"Talabat"} />
            <BtnAppsOrder name={"Talabat"} />
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
export default Apps 