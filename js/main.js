"use strict";

(function () {
  var API_KEY = 'V33XLB8FW7E5O77P';
  var BASE_URL = 'https://www.alphavantage.co/';
  var stockInfoForm = document.querySelector('.frm.stocks');
  /**
  * Displays the current stock symbol and information for a company, on a given element.
  *
  * @param {Object} currentStock - an object, the stock data from AlphaVantage api.
  * @param {Object} stockElement - The reference to the stock element that we need.
  */

  var displayStockCompanyName = function displayStockCompanyName(currentStock, stockElement) {
    var companyName = stockElement.querySelector('.name');
    companyName.innerText = "".concat(currentStock.Name);
  };
  /**
   * 
   * @param {obj} stockData - Stock Data retrived from Alphavantage Stock API (Time series intraday)
   */


  var displayStockTicks = function displayStockTicks(stockData) {
    var currentItem;
    var tickList;
    var intervalField = document.querySelector('.interval');
    var symbolField = document.querySelector('.symbol');
    var dateField = document.querySelector('.date');
    var allTicks = Object.keys(stockData['Time Series (15min)']);
    tickList = document.createElement("ul");
    var tickData = stockData['Meta Data'],
        ticks = stockData['Time Series (15min)'];
    var symbol = tickData['2. Symbol'],
        currentTickDate = tickData['3. Last Refreshed'],
        interval = tickData['4. Interval'];
    /**
     * Cycle through each time tick and display stock information for each 15min interval.
     */

    allTicks.forEach(function (tick) {
      currentItem = document.createElement("li");
      currentItem.innerHTML += "\n      <div class=\"tick-detail\">\n        <ul>\n          <li>Date: ".concat(tick, "</li>\n          <li>Open: $ ").concat(stockData['Time Series (15min)'][tick]['1. open'], "</li>\n          <li>High: $").concat(stockData['Time Series (15min)'][tick]['2. high'], "</li>\n          <li>Low: $").concat(stockData['Time Series (15min)'][tick]['3. low'], "</li>\n          <li>Close: $").concat(stockData['Time Series (15min)'][tick]['4. close'], "</li>\n          <li>Volume: ").concat(stockData['Time Series (15min)'][tick]['5. volume'], "</li>\n        </ul>\n      </div>\n    ");
      tickList.append(currentItem);
    });
    document.querySelector('.tick-display').append(tickList);
    intervalField.innerText = interval;
    symbolField.innerText = symbol.toUpperCase();
    dateField.innerText = currentTickDate;
  };
  /**
   * Submit event triggers a fetch for json data.
   */


  stockInfoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var company = event.target.querySelector('[name=company]').value;
    var currentStockUrl = "".concat(BASE_URL, "query?function=OVERVIEW&symbol=").concat(company, "&apikey=").concat(API_KEY);
    var currentStockTickUrl = "".concat(BASE_URL, "query?function=TIME_SERIES_INTRADAY&symbol=").concat(company, "&interval=15min&apikey=").concat(API_KEY);
    fetch(currentStockUrl).then(function (response) {
      return response.json();
    }).then(function (currentStockData) {
      displayStockCompanyName(currentStockData, document.querySelector('.stock-display'));
      return fetch(currentStockTickUrl);
    }).then(function (response) {
      return response.json();
    }).then(function (stockData) {
      displayStockTicks(stockData);
    });
  });
})();
