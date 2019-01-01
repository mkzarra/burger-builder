import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Max Shwarzmüller',
        address: {
          street: '1 Street Ave',
          zipCode: '22222',
          country: 'Germany'
        },
        email: 'max@max.max'
      },
      deliveryMethod: 'premium'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/')
      })
      .catch(this.setState({ loading: false }));
  }

  render() {
    let form = (
      <form>
          <input className={classes.Input} type="text" name="name" placeholder="Harry Potter" />
          <input className={classes.Input} type="email" name="email" placeholder="chosen.one@hogwarts.uk" />
          <input className={classes.Input} type="text" name="street" placeholder="123 Main S" />
          <input className={classes.Input} type="text" name="post_code" placeholder="12345" />
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
    );
    if (this.state.loading) {
      return <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Contact Info</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;