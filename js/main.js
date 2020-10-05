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

  var displayStockTicks = function displayStockTicks(stockData) {
    var latestTick;
    var intervalField = document.querySelector('.interval');
    var symbolField = document.querySelector('.symbol');
    var dateField = document.querySelector('.date');
    var openField = document.querySelector('.open');
    var closeField = document.querySelector('.close');
    var highField = document.querySelector('.high');
    var lowField = document.querySelector('.low');
    var tickData = stockData['Meta Data'],
        ticks = stockData['Time Series (15min)'];
    var symbol = tickData['2. Symbol'],
        currentTickDate = tickData['3. Last Refreshed'],
        interval = tickData['4. Interval'];
    latestTick = ticks[currentTickDate];
    var _latestTick = latestTick,
        open = _latestTick['1. open'],
        high = _latestTick['2. high'],
        low = _latestTick['3. low'],
        close = _latestTick['4. close'];
    intervalField.innerText = interval;
    symbolField.innerText = symbol.toUpperCase();
    dateField.innerText = new Date(currentTickDate).toUTCString();
    openField.innerText = Number(open).toFixed(2);
    closeField.innerText = Number(close).toFixed(2);
    highField.innerText = Number(high).toFixed(2);
    lowField.innerText = Number(low).toFixed(2);
  };

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
