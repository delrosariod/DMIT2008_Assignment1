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

  var displayStock = function displayStock(currentStock, stockElement) {
    var companySymbol = stockElement.querySelector('.symbol');
    var companyName = stockElement.querySelector('.name');
    var currentDate = stockElement.querySelector('.date');
    var stockInterval = stockElement.querySelector('.interval');
    companySymbol.innerText = "".concat(currentStock.Symbol);
    companyName.innerText = "".concat(currentStock.Name);
  };

  stockInfoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var company = event.target.querySelector('[name=company]').value;
    var currentStockUrl = "".concat(BASE_URL, "query?function=OVERVIEW&symbol=").concat(company, "&apikey=").concat(API_KEY); //const forecastWeatherUrl = `${BASE_URL}forecast?q=${currentLocation}&appid=${API_KEY}&units=metric`;

    fetch(currentStockUrl).then(function (response) {
      return response.json();
    }).then(function (currentStockData) {
      displayStock(currentStockData, document.querySelector('.stock-display'));
    });
  });
})();
