window.onload = setupObservers
window.onclick = addUSDPrice

function getOpenPositions() {
  const positionsList = document.getElementsByClassName('positionsList');
  let positions = [];
  if (positionsList.length) {
    positions = positionsList[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  }
  return positions;
}

function getMarkPriceDiv() {
  const instruments = document.getElementsByClassName('instrumentsList')[0].getElementsByTagName('tr');
  for (let i = 0; i < instruments.length; i++) {
    const instrument = instruments[i];
    const symbol = instrument.getElementsByClassName('symbol')[0];
    if (symbol && symbol.innerText === "XBTUSD") {
      return instrument;
    }
  };
}

function setupObservers() {
  document.getElementsByClassName('lastPriceWidget')[0].getElementsByClassName('priceWidget')[0].style.fontSize = 'xxx-large'

  const positions = getOpenPositions();
  for (let i = 0; i < positions.length; i++) {
    const position = positions[i];
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(addUSDPrice);
    observer.observe(getMarkPriceDiv(), config);
    console.log('observer', i, 'observing');
    break;
  }
}

function addUSDPrice() {
  const positions = getOpenPositions()
  for (let i = 0; i < positions.length; i++) {
    const position = positions[i];

    const currentPriceDiv = position.getElementsByClassName('markPrice')[0];
    if (!currentPriceDiv) {
      // if no currentPrice, that means we're viewing the closed positions window
      // need to find current price from somewhere else
      const markPriceDiv = getMarkPriceDiv();
      const markPrice = parseFloat(markPriceDiv.getElementsByClassName('markPrice')[0].innerText);
      // updateUSDPrice(positionsList.getElementsByClassName)
      const prevPnl = position.getElementsByClassName('prevRealisedPnl')[0];
      if (prevPnl) {
        updateUSDPrice(prevPnl.getElementsByClassName('pos')[0], markPrice, true);
        updateUSDPrice(prevPnl.getElementsByClassName('neg')[0], markPrice, true);
      }

    } else {
      const currentPrice = parseFloat(currentPriceDiv.innerText);
      const uPnl = position.getElementsByClassName('unrealisedPnl')[0];
      updateUSDPrice(uPnl.getElementsByClassName('pos')[0], currentPrice)
      updateUSDPrice(uPnl.getElementsByClassName('neg')[0], currentPrice)

      const pnl = position.getElementsByClassName('combinedRealisedPnl')[0];
      const pos = pnl.getElementsByClassName('pos');
      const neg = pnl.getElementsByClassName('neg');
      updateUSDPrice(pos[pos.length - 1], currentPrice, true);
      updateUSDPrice(neg[neg.length - 1], currentPrice, true);
    }
  }
}

function updateUSDPrice(div, currentPrice, skipPercentage) {
  if (!div) return;

  const innerText = div.innerText;
  const parts = innerText.split(' XBT')
  const btc = parts[0]
  const percentage = parts[1]
  const percent_parts = percentage.split(' · ')
  const real_percentage = percent_parts[percent_parts.length - 1];
  div.innerText = btc + ' XBT ' + ' · $' + (btc*currentPrice).toFixed(2) + ' USD' + (skipPercentage ? '' : ' · ' + real_percentage);
}
