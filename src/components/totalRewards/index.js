import React, { Component } from 'react';

/* third party */
import {Paper, Box, Typography} from '@material-ui/core';
import moment from 'moment';
import {groupBy} from 'lodash';

/* components */
import Table from './table';

class TotalTable extends Component {
  constructor(props) {
    super(props);
    this.state = {totalTransactions: {}, totalTransactionsPerUniqueCustomer: []};
    this.getTotalRewards = this.getTotalRewards.bind(this);
    this.getTotalRewardsOfACustomer = this.getTotalRewardsOfACustomer.bind(this);
    this.getTotalRewardsOfAMonth = this.getTotalRewardsOfAMonth.bind(this);
  }
  componentDidMount() {
    this.props.transactionData.map(elem => {
      return elem.month = moment(elem.transactionDateTime, 'YYYY-MM-DD').format('MMM')
    })
    const groups = groupBy(this.props.transactionData, 'customerName');
    this.getTotalRewards(groups);
  }
  getTotalRewards(groups) {
    const totalTransactions = [];
    for (let customerName in groups) {
      const eachObj = {
        customerName,
        totalRewards: this.getTotalRewardsOfACustomer(groups[customerName]),
        groupedByMonth: this.getTotalRewardsOfAMonth(groupBy(groups[customerName], 'month'))
      };
      totalTransactions.push(eachObj);
    }
    this.setState(state => ({
      totalTransactionsPerUniqueCustomer: totalTransactions
    }))
  }
  getTotalRewardsOfAMonth(groupedByMonth) {
    const monthsData = []
    for (let month in groupedByMonth) {
      let rewards = 0;
      for (let transaction of groupedByMonth[month]) {
        if (transaction.reward) rewards = rewards + transaction.reward;
      }
      const monthObj = {
        rewards,
        month
      };
      monthsData.push(monthObj);
    }
    return monthsData
  }
  getTotalRewardsOfACustomer(custTransactions) {
    let rewards = 0;
    custTransactions.map(transaction => {
      if (transaction.reward) rewards = rewards + transaction.reward
      return true
    });
    return rewards;
  }
  render() {
    return (
      <Paper style={{margin: "0 0 10px 0"}}> 
        <Box p={2} className={"addTransactionFormWrapper"}>
        <Typography variant="h4" gutterBottom>
          Total Rewards Per Customer (Expand to view rewards earned per month)
        </Typography>
        <Table data={this.state.totalTransactionsPerUniqueCustomer} />
        </Box>
      </Paper>
    );
  }
}

export default TotalTable;