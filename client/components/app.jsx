import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      introModalStatus: {
        show: true,
        displayNone: false
      },
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.toggleIntroModal = this.toggleIntroModal.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
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

  getCartItems() {
    fetch('/api/cart')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ cart: data });
      });
  }

  addToCart(productId) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productId)
    })
      .then(response => {
        return response.json();
      })
      .then(productItem => {
        const cartCopy = [...this.state.cart];
        cartCopy.push(productItem);
        this.setState({ cart: cartCopy });
      });
  }

  deleteFromCart(cartItemId) {
    fetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE'
    })
      .then(() => {
        const cartCopy = [...this.state.cart];
        const cartItemIdx = cartCopy.findIndex(item =>
          item.cartItemId === cartItemId);
        cartCopy.splice(cartItemIdx, 1);
        this.setState({ cart: cartCopy });
      });
  }

  placeOrder(orderInfo) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderInfo)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setView('catalog', {});
        this.setState({ cart: [] });
      });
  }

  toggleIntroModal() {
    this.setState({
      introModalStatus: {
        show: false,
        displayNone: true
      }
    });
  }

  renderView() {
    if (this.state.view.name === 'catalog') {
      return (
        <div className="container-fluid">
          <ProductList setView={this.setView} addToCart={this.addToCart} />
        </div>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <CartSummary cartItems={this.state.cart} setView={this.setView} deleteFromCart={this.deleteFromCart} addToCart={this.addToCart} />
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <CheckoutForm setView={this.setView} cartItems={this.state.cart} onSubmit={this.placeOrder}/>
      );
    } else {
      return (
        <ProductDetails setView={this.setView} view={this.state.view} addToCart={this.addToCart}/>
      );
    }
  }

  render() {
    return (
      <>
        <div className="container-fluid bg-dark sticky-top shadow-sm">
          <Header
            cartItemCount={this.state.cart.length}
            setView={this.setView}
            toggleIntroModal={this.toggleIntroModal}
            introModalStatus={this.state.introModalStatus}/>
        </div>
        {this.renderView()}

      </>
    );
  }
}
