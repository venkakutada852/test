import React, { Component } from 'react'

/* third party */
import {Container} from '@material-ui/core';

/* components */
import AllTransactionsTable from '../allTransactions';
import TotalTable from '../totalRewards';
import AddTransactionForm from '../addTransactionForm';

/* data */
import transactionData from '../../data/transactions.json';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionData
    }
    this.addToData = this.addToData.bind(this);
  }
  addToData (transactionObj) {
    if (transactionObj.customerName && transactionObj.transactionAmount && transactionObj.transactionDateTime) {
      this.setState(state => ({
        transactionData: [...this.state.transactionData, ...[transactionObj]]
      }))
    } else {
      console.log('incomplete data given')
    }
  }
  render() {
    return (
      <Container className={"homeContainer"}>
        <AddTransactionForm addToData={this.addToData} />
        <AllTransactionsTable transactionData={this.state.transactionData} />
        <TotalTable transactionData={this.state.transactionData} />
      </Container>
    );
  }
}

export default Home;
