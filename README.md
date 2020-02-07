# Bitmex Chrome Extension

## Installation

- Clone this repo to your machine
- Go to Window > Extensions in Chrome's menu bar
- Make sure `Developer Mode` is checked in the upper right corner
- Click `Load unpacked` on the top left
- Select both .js files that are found in this repo
- Refresh Bitmex 
- Your open positions should now be show in USD terms, as well as XBT!

## Description

- This chrome extension will allow you to see uPnL and PnL in USD terms, rather than just XBT

## Known Bugs

- Doesn't work correctly with non-XBT pairs at the moment, since it's using the current price found in each open position's row
