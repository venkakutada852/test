import React, { Component } from 'react'

/* third party */
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Collapse, Box, Typography} from '@material-ui/core';
import {KeyboardArrowUp, KeyboardArrowDown} from '@material-ui/icons';

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow className={""}>
        <TableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
        </TableCell>
        <TableCell><b>{row.customerName}</b></TableCell>
        <TableCell><b>{row.totalRewards}</b></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} unmountOnExit>
          <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
              Total Rewards per month
            </Typography>
            <Table size="small" aria-label="rewards_per_month">
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Rewards</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.groupedByMonth ? 
                  (row.groupedByMonth.map(monthData => (
                    <TableRow key={monthData.month}>
                      <TableCell>{monthData.month}</TableCell>
                      <TableCell>{monthData.rewards}</TableCell>
                    </TableRow>
                  )))
                : ""}
              </TableBody>
            </Table>
          </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

class TotalRewardsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <TableContainer component={Paper}>
        <Table className={"totalTable"} aria-label="total table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Rewards</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data ? 
              (this.props.data.map(row => (
                <Row key={row.customerName} row={row} />
              )))
            : ""}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default TotalRewardsTable;
