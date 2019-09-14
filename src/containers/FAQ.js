import React from "react";

const FAQ = () => {
  return (
    <>
      <div className="row">
        <div className="offset-sm-3 col-sm-6 pb-4">
          <h2 className="font-weight-light">What is a prediction market?</h2>
          <p className="card-text">
            Prediction markets are exchange-traded markets created for the
            purpose of trading the outcome of events. The market prices can
            indicate what the crowd thinks the probability of the event is.
          </p>
        </div>

        <div className="offset-sm-3 col-sm-6 pb-4">
          <h2 className="font-weight-light">What is Gnosis?</h2>
          <p className="card-text">
            Amoung other things, Gnosis builds Ethereum-based prediction market
            platforms allowing anyone to utilize customized forecasting
            applications.
          </p>
        </div>

        <div className="offset-sm-3 col-sm-6 pb-4">
          <h2 className="font-weight-light">What is Flyingcarpet (FCLA)?</h2>
          <p className="card-text">
            Flyingcarpet provides orcales sourced via insights from geospatial
            data. The FCLA PM combines Gnosis{"'"} prediction market contracts,
            with FCLA{"'"}s unique geospatial data via a Chainlink-secured data
            gateway.
          </p>
        </div>

        <div className="offset-sm-3 col-sm-6 pb-4">
          <h2 className="font-weight-light">How is market data sourced?</h2>
          <p className="card-text">
            All data in the FCLA PM is sourced from FCLA{"'"}s geospatial data
            providers (e.g. satellite models and data feeds) and is accessible
            to the FCLA smart contracts via a Chainlink integration.
          </p>
        </div>

        <div className="offset-sm-3 col-sm-6 pb-4">
          <h2 className="font-weight-light">
            Why should I participate in these markets?
          </h2>
          <p className="card-text">
            Prediction markets accessible via the FCLA PM enable users to take
            positions based on the development of unique geospatial and
            ecological events. Such positions may functions as tools, for
            example, enabling users to hedge the risk of a specific rate of
            continued Artic ice melt or diminishing CO2 absorption by forests.
          </p>
        </div>
      </div>
    </>
  );
};

export default FAQ;
