import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  renderView() {
    if (this.state.view.name === 'catalog') {
      return (
        <div className="container-fluid">
          <ProductList setView={this.setView} />
        </div>
      );
    } else {
      return (
        <ProductDetails setView={this.setView} view={this.state.view}/>
      );
    }
  }

  render() {
    return (
      <>
        <div className="container-fluid bg-dark">
          <Header/>
        </div>
        {this.renderView()}
      </>
    );
  }
}
