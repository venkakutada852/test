import React, { Component } from 'react';

/* third party */
import { DataGrid } from '@material-ui/data-grid';
import {Paper, Box, Typography} from '@material-ui/core';
import moment from 'moment';

const columns = [
  {field: "customerName", headerName: "Customer Name", width: 160},
  {field: "transactionAmount", headerName: "Transaction Amount $", width: 200},
  {field: "transactionDateTime", headerName: "Transaction Date", width: 170},
  {field: "month", headerName: "Transacted Month", width: 170},
  {field: "reward", headerName: "Rewards", width: 110},
]

class AllTransactionsTable extends Component {
  componentDidMount() {
    this.props.transactionData.map(elem => {
      elem.transactionAmount = "$" + elem.transactionAmount
      return elem.month = moment(elem.transactionDateTime, 'YYYY-MM-DD').format('MMM')
    })
  }
  componentDidUpdate() {
    this.props.transactionData.map(elem => {
      return elem.month = moment(elem.transactionDateTime, 'YYYY-MM-DD').format('MMM')
    })
  }
  render() {
    return (
      <Paper style={{margin: "0 0 10px 0"}}> 
        <Box p={2} className={"addTransactionFormWrapper"}>
        <Typography variant="h4" gutterBottom>
          All Transactions
        </Typography>
            <div className={"dataTable"}>
                <DataGrid Background={"white"} autoHeight={true} rows={this.props.transactionData} columns={columns} />
            </div>
        </Box>
      </Paper>
    );
  }
}

export default AllTransactionsTable;
