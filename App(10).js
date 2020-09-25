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
            account: undefined,
            flights: [],
            customerflights: []
        };
    }

    async componentDidMount() {

        this.web3 = await getWeb3();
        this.toEther = converter(thisWeb);
        this.airline = await AirlineContract(this.web3.currentProvider);
        this.AirlineService = new AirlineService(this.airline);
        
        var account = (await this.web3.eth.getAccounts())[0];
        
        this.web3.currencyProvider.publicConfigStore.on('update', async function(event) {
            this.setState({
            account: event.selectedAddress.toLowerCase()
        }, () => {
            this.load();
        });

}.bind(this));
 
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

    async getFlights(){
        let flights = await this.AirlineService.getFlights();
        this.setState({
            flights
        });
    }

    async getCustomerFlights() {
        let customerflights = await this.AirlineService.getCustomerFlights(this.state.account);
        this.state({
            customerFlights
        });    
    }

    async buyFlight(flightIndex, flight) {

        await this.AirlineService.buyFlight(
            flightIndex, 
            this.state.account,
            flight.price
        );
    }

    async load() {
        this.getBalance();
        this.getFlights();
        this.getCustomerFlights();        
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
                        <span><strong>Balance</strong>: {this.state.balance}</span>
                    </Panel> 
                </div>
                <div className="col-sm">
                    <Panel title="Loyalty points - refundable ether">

                    </Panel>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
          AaaAsasASas          <Panel title="Available flights">
                        {this.state.flights.map((flight, i) => {
                            return <div key={i}>
                                        <span>{flight.name} - cost: {this.toEther(flight.price)}</span>
                                        <button className = "btn btn-sm btn-sucess text-white" onClick={() => this.buyFlight(i, flight)}>Purchase</button>
                                    </div>
                        })}

                    </Panel>
                </div>
                <div className="col-sm">
                    <Panel title="Your flights">
                    {this.state.customerflights.map((flight,i) => {
                        return <div key = {i}>
                            {flight.name} - cost: {flight.price}
                        </div> 
                    })}

                    </Panel>
                </div>
            </div>
        </React.Fragment>
    }
}
