import React from 'react'

export default function Loader() {
  return (
    <div id="preloader">
        <div className="loader">
            <svg className="circular" viewBox="25 25 50 50"><circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="3" strokeMiterlimit="10"/></svg>
        </div>
    </div>
  )
}
