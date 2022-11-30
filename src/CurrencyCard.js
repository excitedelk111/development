import './CurrencyCard.css';

function CurrencyCard(props) {
    return (
        <div className="currencycard-container">
            <div className='currencycard-row'>
                <div className='currencycard-column'>
                    {props.name}
                </div>
                <div className='currencycard-column'>
                    {props.ticker}
                </div>
            </div>
            <div className='currencycard-row'>
                <div className='currencycard-column'>
                    Circulating Supply: {props.circulatingSupply}<br></br>
                    Total Supply: {props.totalSupply}<br></br>
                    Max Supply: {props.maxSupply}<br></br>
                </div>
                <div className='currencycard-column'>
                    Price: <br></br>
                </div>
            </div>
        </div>
    );
}

export default CurrencyCard;