import React, { Component } from 'react';
import Web3 from 'web3';
import Form from './form.js';
import _ from 'lodash';
import Table from './table.js'

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
    this.getPeople = this.getPeople.bind(this);
  }

  getPeople = () => {
    var data = People.getPeople();
    this.setState({
      firstNames: String(data[0]).split(','),
      lastNames: String(data[1]).split(','),
      ages: String(data[2]).split(',')
    });
  }

  componentWillMount() {
    this.getPeople();
  }

  render() {
    const MainStyle={
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "blue",
      color: "black",
      margin: "5px auto",
      border: "5px solid white",
    }

    return(
      <main className="container" style={MainStyle}>
        <Form getPeople={this.getPeople} />
        <p>ETH = {balance}</p>
        <Table key={1} firstNames={this.state.firstNames} lastNames={this.state.lastNames} ages={this.state.ages} />
      </main>
    )
  }
}

export default Home
