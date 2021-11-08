const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: 'KPD7hfPesl65wUVlxU9HkC5454EwlTNu13t8vIvAM4HwZKAQBoVqDw07zeWFLU8y',
    APISECRET: '7AGbpKvfobl3yrJ29fMUTEMKxAJXwOjSSIO5PgXlBzT7LACroD1k1z50NMSHogRE'
});

var symbols = [];

function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (parseFloat(current.change) < parseFloat(inputArr[j].change))) {
                inputArr[j+1] = inputArr[j];
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;
}
console.log("BINANCE BOT 1.0.0 STARTED, PULLING TOP GAINERS...");

binance.prevDay(false, (error, prevDay) => {
    // console.info(prevDay); // view all data
    for (let obj of prevDay) {
        let symbol = obj.symbol;
        if (symbol.includes("EUR")) {
            symbols.push({symbol:symbol,change:obj.priceChangePercent});
        }
        //console.info(symbol + " volume:" + obj.volume + " change: " + obj.priceChangePercent + "%");
    }
    symbols = insertionSort(symbols);
    symbols = [symbols[symbols.length - 1],symbols[symbols.length - 2],symbols[symbols.length - 3]]
    console.log("FOUND SYMBOLS: " + JSON.stringify(symbols));
});