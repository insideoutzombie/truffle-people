import React, { Component } from 'react';
import Web3 from 'web3';
import Form from './form.js';
import _ from 'lodash';

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))
let ABI = require('../../../abi/PeopleABI.js');
let peopleAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
let People = web3.eth.contract(ABI).at(peopleAddress);
web3.eth.defaultAccount = web3.eth.accounts[0];
let balance = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase)).toString();

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstNames: [],
      lastNames: [],
      ages: [],
    }
  }

  componentWillMount() {
    var data = People.getPeople();
    this.setState({
      firstNames: String(data[0]).split(','),
      lastNames: String(data[1]).split(','),
      ages: String(data[2]).split(',')
    });
    console.log(typeof data);
    console.log(data);
  }

  render() {

    let TableRows = []

    _.each(this.state.firstNames, (value, index) => {
      TableRows.push(
        <tr key={index}>
          <td>{web3.toAscii(this.state.firstNames[index])}</td>
          <td>{web3.toAscii(this.state.lastNames[index])}</td>
          <td>{this.state.ages[index]}</td>
        </tr>
      )
    })


    return(
      <main className="container">
        <Form />
        <p>ETH = {balance}</p>
        <div className="App-table-div">
              <table className="App-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {TableRows}
                </tbody>
              </table>
          </div>
      </main>
    )
  }
}

export default Home
