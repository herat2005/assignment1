import * as React from 'react';
import ErrorPage from '../containers/ErrorPage';

export default class ErrorBoundary extends React.Component<any, any>{

  state = {
    error: false,
  }

  componentDidCatch(error: any, info: any) {
    console.error(error);
    console.info(info);
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorPage />
      )
    }
    return this.props.children;
  }

}