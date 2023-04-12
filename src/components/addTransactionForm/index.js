import React, { Component } from 'react';

/* third party */
import {Paper, Box, Input, Button, Typography} from '@material-ui/core';

/* styles */
import './index.css';

/* business logic */
import CalculateRewards from '../../services/rewards'

class AddTransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: '',
      transactionAmount: '',
      transactionDateTime: '',
    };
    this.addNewTransaction = this.addNewTransaction.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  addNewTransaction(event) {
    event.preventDefault();
    if (!this.state.customerName || !this.state.transactionAmount || !this.state.transactionDateTime) {
      return alert("please fill in the form")
    }
    if (!this.state.customerName) { return alert("please give name") }
    if (!this.state.transactionAmount || this.state.transactionAmount === 0) { return alert("please give valid amount") }
    if (!this.state.transactionDateTime) { return alert("please give date") }
    const newTransaction = {
      id: Date.now(),
      customerName: this.state.customerName,
      transactionAmount: this.state.transactionAmount,
      transactionDateTime: this.state.transactionDateTime,
      reward: CalculateRewards(this.state.transactionAmount)
    };
    this.setState({
      customerName: '',
      transactionAmount: '',
      transactionDateTime: '',
    })
    // using child to update data in parent; one of react's most useful feature
    this.props.addToData(newTransaction)
  }
  render() {
    return (
      <Paper style={{margin: "0 0 10px 0"}}> 
        <Box p={2} className={"addTransactionFormWrapper"}>
          <Typography variant="h4" gutterBottom>
            Add a new transaction
          </Typography>
          <form onSubmit={this.addNewTransaction} className={"addTransactionForm"}>
            <label>
              Customer Name:
              <Input type="text" name="customerName" value={this.state.customerName} onChange={this.handleChange} />
            </label>
            <label>
              Transaction Amount:
              <Input type="number" name="transactionAmount" value={this.state.transactionAmount} onChange={this.handleChange} />
            </label>
            <label>
              Transaction Date:
              <Input type="date" name="transactionDateTime" value={this.state.transactionDateTime} onChange={this.handleChange} />
            </label>
            <Button variant="contained" color="primary" type="submit" value="Submit">Submit</Button>
            </form>
        </Box>
      </Paper>
    );
  }
}

export default AddTransactionForm;
