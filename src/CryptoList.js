import React, { Component } from 'react';


class CryptoList extends Component {
    render() {
        const cryptoList = this.props.cryptoList;
    
        return (
            <ul>
                {cryptoList.map(currency =>
                <li key={currency.currency}>
                    Last rate: <span className={currency.class}>{currency.arrow} {currency.last}</span>
                    <strong>{currency.currency} </strong>
                    <span>[{currency.symbol}]</span>
                </li>
                )}
            </ul>

        )
    }

}

export default CryptoList;
