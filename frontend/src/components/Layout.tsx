import * as React from 'react';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import '../components/styles/layout.scss';
export default class Layout extends React.Component<any, any>{

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container my-3 p-0">{this.props.children}</div>
        <Footer />
      </React.Fragment>
    )
  }

}