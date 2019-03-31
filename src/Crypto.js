import React, { Component } from 'react';
import axios from "axios";
import CryptoList from './CryptoList';


class Crypto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cryptoList: [],

        };

    }



    componentDidMount() {
        setInterval(() => {
            if(this.inputValue.value === ""){
                this.fetchData();
            }
            
        }, 5000);
        this.fetchData();
    };

    fetchData() {

        axios.get('https://blockchain.info/pl/ticker')
            .then(response => {
                let cryptoList = [];
                let oldCryptoList = this.state.cryptoList;

                for (let key in response.data) {
                    let newRate = {
                        currency: key,
                        last: response.data[key].last,
                        symbol: response.data[key].symbol,
                    }

                    let oldRate = oldCryptoList.find(oldRate => oldRate.currency === newRate.currency);

                    if (oldRate !== undefined) {
                        if (newRate.last > oldRate.last) {
                            newRate.class = "green";
                            newRate.arrow = String.fromCharCode(8593);
                        } else if (newRate.last < oldRate.last) {
                            newRate.class = "red";
                            newRate.arrow = String.fromCharCode(8595);
                        } else if (newRate.last === oldRate.last) {
                            newRate.class = "blue";
                            newRate.arrow = String.fromCharCode(8596);
                        }
                    } else {
                        newRate.class = "blue";
                        newRate.arrow = String.fromCharCode(8593);
                    }

                    // let newRate = {
                    //     currency: key,
                    //     ...response.data[key]
                    // }

                    cryptoList.push(newRate);
                }
                // console.log(cryptoList);

                this.setState({ cryptoList });
            })
    }

    onFilter = () => {
        let filter = this.inputValue.value.trim().toUpperCase();
        let filteredCryptoList = this.state.cryptoList;

        filteredCryptoList = filteredCryptoList.filter(rate => {
            return rate.currency.includes(filter);
        });
        this.setState({ cryptoList: filteredCryptoList });
    }

    render() {


        return (
            <div className="crypto">
                <h1 className="main-header">Crypto Rate</h1>
                <input
                    type="text"
                    placeholder="Search"
                    ref={input => this.inputValue = input}
                    onChange={this.onFilter} />
                <CryptoList cryptoList={this.state.cryptoList} />
            </div>
        );
    }
}



export default Crypto;
