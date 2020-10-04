(() => {
	const API_KEY = 'V33XLB8FW7E5O77P';
	const BASE_URL = 'https://www.alphavantage.co/';
	const stockInfoForm = document.querySelector('.frm.stocks');
  
  /**
	 * Displays the current stock symbol and information for a company, on a given element.
	 *
	 * @param {Object} currentStock - an object, the stock data from AlphaVantage api.
	 * @param {Object} stockElement - The reference to the stock element that we need.
	 */
  const displayStock = (currentStock, stockElement) => {
    const companySymbol = stockElement.querySelector('.symbol');
    const companyName = stockElement.querySelector('.name');
    const currentDate = stockElement.querySelector('.date');
    const stockInterval = stockElement.querySelector('.interval');

    companySymbol.innerText = `${currentStock.Symbol}`;
    companyName.innerText = `${currentStock.Name}`;

  }

  stockInfoForm.addEventListener('submit', (event) => {
	  event.preventDefault();
	  const company = event.target.querySelector('[name=company]').value;
	  const currentStockUrl = `${BASE_URL}query?function=OVERVIEW&symbol=${company}&apikey=${API_KEY}`;
	  //const forecastWeatherUrl = `${BASE_URL}forecast?q=${currentLocation}&appid=${API_KEY}&units=metric`;


    fetch(currentStockUrl)
    .then((response) => response.json())
    .then((currentStockData) => {
      displayStock(currentStockData, document.querySelector('.stock-display'));
    }); 
  });
  })();