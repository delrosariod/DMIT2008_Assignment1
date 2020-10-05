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
  const displayStockCompanyName = (currentStock, stockElement) => {
    const companyName = stockElement.querySelector('.name');
    companyName.innerText = `${currentStock.Name}`;
  }

  const displayStockTicks = (stockData) => {
    let latestTick;
    let nextTick;
    const intervalField = document.querySelector('.interval');
    const symbolField = document.querySelector('.symbol');
    const dateField = document.querySelector('.date');
    const openField = document.querySelector('.open');
    const closeField = document.querySelector('.close');
    const highField = document.querySelector('.high');
    const lowField = document.querySelector('.low');
    

  
    const {'Meta Data': tickData, 'Time Series (15min)' : ticks} = stockData;
    const {
      ['2. Symbol']: symbol,
      ['3. Last Refreshed']: currentTickDate,
      ['4. Interval']: interval
    } = tickData;

    latestTick = ticks[currentTickDate];
    const {
      ['1. open'] : open,
      ['2. high'] : high,
      ['3. low'] : low,
      ['4. close'] : close
    } = latestTick;

    intervalField.innerText = interval;
    symbolField.innerText = symbol.toUpperCase();
    dateField.innerText = new Date(currentTickDate).toUTCString();
    openField.innerText = Number(open).toFixed(2);
    closeField.innerText = Number(close).toFixed(2);
    highField.innerText = Number(high).toFixed(2);
    lowField.innerText = Number(low).toFixed(2);

  }
  

  stockInfoForm.addEventListener('submit', (event) => {
	  event.preventDefault();
	  const company = event.target.querySelector('[name=company]').value;
    const currentStockUrl = `${BASE_URL}query?function=OVERVIEW&symbol=${company}&apikey=${API_KEY}`;
    const currentStockTickUrl = `${BASE_URL}query?function=TIME_SERIES_INTRADAY&symbol=${company}&interval=15min&apikey=${API_KEY}`;

    
    fetch(currentStockUrl)
    .then((response) => response.json())
    .then((currentStockData) => {
      displayStockCompanyName(currentStockData, document.querySelector('.stock-display'));
      return fetch(currentStockTickUrl);
    })
    .then((response) => response.json())
    .then((stockData) => {
      displayStockTicks(stockData);
    })
  });
  })();