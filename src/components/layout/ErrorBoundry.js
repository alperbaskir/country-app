import  React, {Component} from "react";

class ErrorBoundry extends Component {
  constructor() {
    super();
    this.state = {hasError: false};
  }
  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error) { 
    this.setState({hasError:true}) 
  }
  render() {
    if(this.state.hasError) {
      return <React.Fragment><p>Something went wrong!</p></React.Fragment>;
    }
    return this.props.children;
  }
}

export default ErrorBoundry;