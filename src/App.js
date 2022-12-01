import CoinCard from "./CoinCard";
import "./App.css";
import "./table.css";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [coins, setCoins] = useState([]);
  const [coinsOnScreen, setCoinsOnScreen] = useState([]);
  const [coinsPrice, setCoinsPrice] = useState({});
  const [coinsInPortfolio, setCoinsInPortfolio] = useState({});
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [portfolioComplete, setPortfolioComplete] = useState(false);

  const marketCapSortRef = useRef(null);
  const volumeSortRef = useRef(null);
  const percentChangeSortRef = useRef(null);
  const [sortingComplete, setSortingComplete] = useState(false);

  const greenFilterRef = useRef(null);
  const redFilterRef = useRef(null);
  const portfolioFilterRef = useRef(null);
  const [filteringComplete, setFilteringComplete] = useState(false);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setCoinsOnScreen(data);
        var localCoinsPrice = {};
        data.map((coin) => {
          localCoinsPrice[coin.name] = coin.current_price;
        });
        setCoinsPrice(localCoinsPrice);
      })
      .catch((error) => console.log("Error:", error));
  }, [url]);

  useEffect(() => {
    masterSort();
    setFilteringComplete(false);
  }, [filteringComplete]);

  useEffect(() => {
    setSortingComplete(false);
  }, [sortingComplete]);

  useEffect(() => {
    setPortfolioComplete(false);
    determinePortfolioValue();
    masterFilter();
  }, [portfolioComplete]);

  const addToPortfolio = (name) => {
    var coinsInPortfolioCopy = coinsInPortfolio;
    if (name in coinsInPortfolioCopy) {
      coinsInPortfolioCopy[name] += 1;
    } else {
      coinsInPortfolioCopy[name] = 1;
    }
    setCoinsInPortfolio(coinsInPortfolioCopy);
    setPortfolioComplete(true);
  };

  const removeFromPortfolio = (name) => {
    var coinsInPortfolioCopy = coinsInPortfolio;
    if (coinsInPortfolioCopy[name] === 1) {
      delete coinsInPortfolioCopy[name];
    } else {
      coinsInPortfolioCopy[name] -= 1;
    }
    setCoinsInPortfolio(coinsInPortfolioCopy);
    setPortfolioComplete(true);
  };

  const determinePortfolioValue = () => {
    var localPortfolioValue = 0;
    if (Object.entries(coinsInPortfolio).length !== 0) {
      Object.entries(coinsInPortfolio).map((coin) => {
        localPortfolioValue += coinsPrice[coin[0]] * coin[1];
      });
    }
    setPortfolioValue(localPortfolioValue);
  };

  const resetPortfolio = () => {
    setCoinsInPortfolio({});
    setPortfolioValue(0);
    setPortfolioComplete(true);
  };

  const masterSort = () => {
    if (marketCapSortRef.current.checked) {
      setCoinsOnScreen(
        coinsOnScreen.sort((a, b) => {
          return b.market_cap - a.market_cap;
        })
      );
    }
    if (volumeSortRef.current.checked) {
      setCoinsOnScreen(
        coinsOnScreen.sort((a, b) => {
          return b.total_volume - a.total_volume;
        })
      );
    }
    if (percentChangeSortRef.current.checked) {
      setCoinsOnScreen(
        coinsOnScreen.sort((a, b) => {
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        })
      );
    }
    setSortingComplete(true);
  };

  const masterFilter = () => {
    var greenFilteredCoins = [];
    var redFilteredCoins = [];
    var portfolioFilteredCoins = [];
    if (
      greenFilterRef.current.checked &&
      redFilterRef.current.checked &&
      portfolioFilterRef.current.checked
    ) {
      portfolioFilteredCoins = coins.filter((coin) => {
        return coin.name in coinsInPortfolio;
      });
      setCoinsOnScreen(portfolioFilteredCoins);
      setFilteringComplete(true);
      return;
    }
    if (greenFilterRef.current.checked && redFilterRef.current.checked) {
      setCoinsOnScreen(coins);
      setFilteringComplete(true);
      return;
    }
    if (greenFilterRef.current.checked && portfolioFilterRef.current.checked) {
      greenFilteredCoins = coins.filter((coin) => {
        return String(coin.price_change_24h)[0] !== "-";
      });
      portfolioFilteredCoins = greenFilteredCoins.filter((coin) => {
        return coin.name in coinsInPortfolio;
      });
      setCoinsOnScreen(portfolioFilteredCoins);
      setFilteringComplete(true);
      return;
    }
    if (redFilterRef.current.checked && portfolioFilterRef.current.checked) {
      redFilteredCoins = coins.filter((coin) => {
        return String(coin.price_change_24h)[0] === "-";
      });
      portfolioFilteredCoins = redFilteredCoins.filter((coin) => {
        return coin.name in coinsInPortfolio;
      });
      setCoinsOnScreen(portfolioFilteredCoins);
      setFilteringComplete(true);
      return;
    }
    if (greenFilterRef.current.checked) {
      greenFilteredCoins = coins.filter((coin) => {
        return String(coin.price_change_24h)[0] !== "-";
      });
      setCoinsOnScreen(greenFilteredCoins);
      setFilteringComplete(true);
      return;
    }
    if (redFilterRef.current.checked) {
      redFilteredCoins = coins.filter((coin) => {
        return String(coin.price_change_24h)[0] === "-";
      });
      setCoinsOnScreen(redFilteredCoins);
      setFilteringComplete(true);
      return;
    }
    if (portfolioFilterRef.current.checked) {
      portfolioFilteredCoins = coins.filter((coin) => {
        return coin.name in coinsInPortfolio;
      });
      setCoinsOnScreen(portfolioFilteredCoins);
      setFilteringComplete(true);
      return;
    }
    if (
      !(
        greenFilterRef.current.checked ||
        redFilterRef.current.checked ||
        portfolioFilterRef.current.checked
      )
    ) {
      setCoinsOnScreen(coins);
      setFilteringComplete(true);
      return;
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 3,
  });

  return (
    <div className="app">
      <br></br>
      <div className="portfolio-container">
        <div className="portfolio-header">
          <span>My Portfolio</span>
          <span>{formatter.format(portfolioValue)}</span>
        </div>
        <div className="portfolio-table">
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Coin</th>
                <th>Number</th>
                <th>Price</th>
                <th>Total Value</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(coinsInPortfolio).map((coin) => {
                return (
                  <tr key={coin[0]}>
                    <td>{coin[0]}</td>
                    <td>{coin[1]}</td>
                    <td>{formatter.format(coinsPrice[coin[0]])}</td>
                    <td>{formatter.format(coinsPrice[coin[0]] * coin[1])}</td>
                    <td>
                      <button
                        className="button-primary"
                        onClick={() => removeFromPortfolio(coin[0])}
                      >
                        Remove From Portfolio
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="portfolio-footer">
          <button
            className="button-primary"
            onClick={() => {
              resetPortfolio();
            }}
          >
            Reset Portfolio
          </button>
        </div>
      </div>
      <br></br>
      <div className="sort-container">
        <span>Sort By: </span>
        <label>
          <input
            ref={marketCapSortRef}
            type="radio"
            onClick={() => {
              masterSort();
            }}
            name="sort"
            defaultChecked
          />{" "}
          &nbsp; Market Cap
        </label>
        <label>
          <input
            ref={volumeSortRef}
            type="radio"
            onClick={() => {
              masterSort();
            }}
            name="sort"
          />{" "}
          &nbsp; Volume
        </label>
        <label>
          <input
            ref={percentChangeSortRef}
            type="radio"
            onClick={() => {
              masterSort();
            }}
            name="sort"
          />{" "}
          &nbsp; Percent Change
        </label>
      </div>{" "}
      <br></br>
      <div className="filter-container">
        <span>Filter By: </span>
        <label>
          <input
            ref={greenFilterRef}
            type="checkbox"
            onClick={() => {
              masterFilter();
            }}
          />{" "}
          &nbsp; In The Green
        </label>
        <label>
          <input
            ref={redFilterRef}
            type="checkbox"
            onClick={() => {
              masterFilter();
            }}
          />{" "}
          &nbsp; In The Red
        </label>
        <label>
          <input
            ref={portfolioFilterRef}
            type="checkbox"
            onClick={() => {
              masterFilter();
            }}
          />{" "}
          &nbsp; In My Portfolio
        </label>
      </div>
      <div className="coin-container">
        {coinsOnScreen.map((coin, id) => (
          <div key={id}>
            <CoinCard
              name={coin.name}
              image={coin.image}
              ticker={coin.symbol}
              price={coin.current_price}
              priceChange={coin.price_change_24h}
              priceChangePercentage={coin.price_change_percentage_24h}
              marketCapPosition={coin.market_cap_rank}
              marketCapValue={coin.market_cap}
              volume={coin.total_volume}
              portfolio={addToPortfolio}
            />
            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
