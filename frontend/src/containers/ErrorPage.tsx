import * as React from 'react';
import '../components/styles/layout.scss';

export default function ({ ...props }) {
  return (
    <div className="row h-500 error-page">
      <div className="col-12">
        <div className="col-12">
          <span className="oops">OPPS!!!</span>
        </div>
        <div className="col-12">
          <span className="message">Our Servers are facing some issue</span>
        </div>
        <div className="col-12">
          <span className="message">Please contact administrator</span>
        </div>
      </div>
    </div>
  )
}