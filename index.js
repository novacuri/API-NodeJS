const express = require('express');
const yahooFinance = require('yahoo-finance2');
const app = express();

app.get('/stock/:AAPL', async (req, res) => { //aca probe con '/stock/:AAPL' pero no me trae nada, la linea venia con '/stock/:symbol' Uriel
  const symbol = req.params.symbol.toUpperCase();
  try {
    const data = await yahooFinance.quoteSummary(symbol);
    const price = data.price.regularMarketPrice;
    const spread = data.price.regularMarketAsk.raw - data.price.regularMarketBid.raw;
    const prevClose = data.price.regularMarketPreviousClose.raw;
    const changePct = ((price - prevClose) / prevClose) * 100;
    res.json({
      symbol,
      price: parseFloat(price.toFixed(2)),
      spread: parseFloat(spread.toFixed(2)),
      changePct: parseFloat(changePct.toFixed(2)),
    });
  } catch (error) {
    res.status(404).json({ message: 'Symbol not found' });
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));

