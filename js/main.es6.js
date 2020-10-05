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

  /**
   * 
   * @param {obj} stockData - Stock Data retrived from Alphavantage Stock API (Time series intraday)
   */
  const displayStockTicks = (stockData) => {
    let currentItem;
    let tickList;
    const intervalField = document.querySelector('.interval');
    const symbolField = document.querySelector('.symbol');
    const dateField = document.querySelector('.date');
    
    let allTicks = Object.keys(stockData['Time Series (15min)']);
    tickList = document.createElement("ul");
  
    const {'Meta Data': tickData, 'Time Series (15min)' : ticks} = stockData;
    const {
      ['2. Symbol']: symbol,
      ['3. Last Refreshed']: currentTickDate,
      ['4. Interval']: interval
    } = tickData;

/**
 * Cycle through each time tick and display stock information for each 15min interval.
 */
    allTicks.forEach(tick => {
      currentItem = document.createElement("li");
      currentItem.innerHTML += `
      <div class="tick-detail">
        <ul>
          <li>Date: ${tick}</li>
          <li>Open: $ ${stockData['Time Series (15min)'][tick]['1. open']}</li>
          <li>High: $${stockData['Time Series (15min)'][tick]['2. high']}</li>
          <li>Low: $${stockData['Time Series (15min)'][tick]['3. low']}</li>
          <li>Close: $${stockData['Time Series (15min)'][tick]['4. close']}</li>
          <li>Volume: ${stockData['Time Series (15min)'][tick]['5. volume']}</li>
        </ul>
      </div>
    `;
    tickList.append(currentItem);
    })
    document.querySelector('.tick-display').append(tickList);

    intervalField.innerText = interval;
    symbolField.innerText = symbol.toUpperCase();
    dateField.innerText = currentTickDate;

  }
  
/**
 * Submit event triggers a fetch for json data.
 */
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