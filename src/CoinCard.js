import "./CoinCard.css";
import "./button.css";

function CoinCard(props) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div className="coincard-container">
      <div className="coincard-row" style={{ marginBottom: "20px" }}>
        <div className="coincard-column">
          <img
            src={props.image}
            style={{
              width: "1.5em",
              marginRight: "10px",
              verticalAlign: "middle",
            }}
            alt={props.name}
          ></img>
          <span style={{ verticalAlign: "middle" }}>{props.name}</span>
        </div>
        <div
          className="coincard-column"
          style={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          {props.ticker}
        </div>
      </div>
      <div className="coincard-row" style={{ marginBottom: "20px" }}>
        <div className="coincard-column">
          <div className="coincard-information">
            Market Cap Value: {formatter.format(props.marketCapValue)}
            <br></br>
            24H Volume: {formatter.format(props.volume)}
            <br></br>
          </div>
        </div>
        <div className="coincard-column">
          <div
            className="coincard-pricing-information"
            style={
              String(props.priceChange)[0] !== "-"
                ? { color: "#39FF14" }
                : { color: "#FF3131" }
            }
          >
            <span>${props.price.toFixed(3)}</span>
            <span>
              {String(props.priceChange)[0] !== "-"
                ? "↑$" + props.priceChange.toFixed(3)
                : "↓$" + props.priceChange.toFixed(3)}
            </span>
            <span>
              {String(props.priceChangePercentage)[0] !== "-"
                ? "↑" + props.priceChangePercentage.toFixed(3) + "%"
                : "↓" + props.priceChangePercentage.toFixed(3) + "%"}
            </span>
          </div>
        </div>
      </div>
      <div
        className="coincard-row"
        style={{ marginLeft: "auto", marginRight: "0" }}
      >
        <div className="coincard-column">
          <div>
            <button
              className="button-primary"
              onClick={() => props.portfolio(props.name)}
            >
              Add to Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinCard;
