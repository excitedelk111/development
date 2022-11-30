import logo from './logo.svg';
import CurrencyCard from './CurrencyCard';
import './App.css';
import axios from 'axios';


function App() {

  let response = null;
  new Promise(async (resolve, reject) => {
    try {
      response = await axios.default.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/trending/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': 'da483b80-b3b5-4a21-85d4-0fb468931f6d',
        },
      });
    } catch(ex) {
      response = null;
      // error
      console.log(ex);
      reject(ex);
    }
    if (response) {
      // success
      const json = response.data;
      console.log(json);
      resolve(json);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className='coin-container'>
        {/* <CurrencyCard 
        name={coin["name"]} 
        ticker={coin["symbol"]}
        circulatingSupply={coin["circulating_supply"]}
        totalSupply={coin["total_supply"]}
        maxSupply={coin["max_supply"]}>

        </CurrencyCard>
        <CurrencyCard 
        name={coin["name"]} 
        ticker={coin["symbol"]}
        circulatingSupply={coin["circulating_supply"]}
        totalSupply={coin["total_supply"]}
        maxSupply={coin["max_supply"]}>

        </CurrencyCard> */}
        </div>
      </header>
    </div>
  );
}

export default App;
