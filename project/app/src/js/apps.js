import React from 'react'
if (window.innerWidth > 599) {
  import('../css/apps-tablet.css')
} else {
  import('../css/apps-phone.css')
}
function Text() {
  return (
    <div className="textParent">
      <div className="text">Order online from your favorite app today</div>
    </div>
  )
}
function BtnApps(props) {
  return (
    <div className="btnParent">
      <div className="btnApp">{props.name}</div>
    </div>
  )
}
function Apps() {
  const ui = () => {
    if (true) {
      return (
        <div className="Apps">
          <Text />
          <div className="btnsApp">
            <BtnApps name={"Talabat"} />
            <BtnApps name={"Talabat"} />
            <BtnApps name={"Talabat"} />
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