import React, { Component } from "react";
import Panel from "./Panel";
import getWeb3 from "./getWeb3";
import AirlineContract from "./airline";
import { AirlineService } from "./AirlineService";

const converter = (web3) => {
    return (value) => {
        return web3.utils.fromWei(value.toString(), 'ether');
    }
}


export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            account: undefined
        };
    }

    async componentDidMount() {
        this.web3 = await getWeb3();
        this.toEther = converter(thisWeb);
        this.airline = await AirlineContract(this.web3.currentProvider);
        this.AirlineService = new AirlineService(this.airline);
        
        var account = (await this.web3.eth.getAccounts())[0];
 
        this.setState({
            account: account.toLowerCase()
        }, () => {
            this.load();
        });
    }
 
    async getBalance() {
        let weiBalance = await this.web3.eth.getBalance(this.state.account);
        this.setState({
            balance: this.toEher(weiBalance)
        });
    }

    async load() {
        this.getBalance();
        
    }

    render() {
        return <React.Fragment>
            <div className="jumbotron">
                <h4 className="display-4">Welcome to the Airline!</h4>
            </div>

            <div className="row">
                <div className="col-sm">
                    <Panel title="Balance">
                        <p>{this.state.account}</p>
                        <span>Balance: {this.state.balance}</span>
                    </Panel> 
                </div>
                <div className="col-sm">
                    <Panel title="Loyalty points - refundable ether">

                    </Panel>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <Panel title="Available flights">


                    </Panel>
                </div>
                <div className="col-sm">
                    <Panel title="Your flights">

                    </Panel>
                </div>
            </div>
        </React.Fragment>
    }
}