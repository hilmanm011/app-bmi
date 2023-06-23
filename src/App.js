import preferredMerchantIcon from "./icons/icon-preferred-merchant.svg";
import merchants from "./data/merchants.json";
import "./App.css";

function App() {
  return (
    <section className="page">
      <h1>Restoran Terdekat yang Populer</h1>

      <div className="merchants">
        {merchants.data.map((merchant, index) => (
          <div key={index} className="merchant">
            <div className="merchant-thumbnail">
              <img src={merchant.thumbnail_url} alt="thumbnail" />
              {merchant.is_currently_promo && (
                <div className="promo-tag">
                  <span>Promo</span>
                  <div className="tag-tail"></div>
                </div>
              )}
            </div>
            <div className="merchant-description">
              <div className="preferred-merchant">
                <img src={preferredMerchantIcon} alt="icon" />
                <span>Restoran Pilihan</span>
              </div>

              <h2>{merchant.name}</h2>

              <div className="merchant-detail">
                <p>{merchant.category}</p>
                <div>
                  <div>
                    <span>⭐</span>
                    <span>{merchant.avg_rating}</span>
                  </div>
                  <div>
                    <span>🕘</span>
                    <span>{merchant.distance} mnt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
