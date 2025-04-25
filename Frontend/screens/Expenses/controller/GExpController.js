import GAllExpense from "../model/GExpensesModel";

const e1 = new GAllExpense('1','1','Dinner',3000,'Food','Had dinner at Monal great time there. Ordered Fish, Steak, BBQ, Chinese and Sandwiches. For Starters had garlic bread, baked potatoes, and salad. Order Fresh Mint Juice.','2022/11/25','4','M','P');
const e2 = new GAllExpense('1','2','Shopping',6000,'Shopping','Shopping at Giga Mall','2022/11/22','4','M','F');
const e3 = new GAllExpense('1','3','Cab Fare',500,'Transport','Went to Hill by cab','2022/11/21','4','M','S');
const e4 = new GAllExpense('1','4','Ticket',1000,'Other','Zipline ticket','2022/10/2','4','M','K')

let all_gexpenses = new Array();
all_gexpenses.push(e1);
all_gexpenses.push(e2);
all_gexpenses.push(e3);
all_gexpenses.push(e4);


function swap(all_gexpenses, i, j) {
    let temp = all_gexpenses[i];
    all_gexpenses[i] = all_gexpenses[j];
    all_gexpenses[j] = temp;
}
function partitionDateOldest(all_gexpenses, low, high) {
    let pivot = all_gexpenses[high].date;
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {
          if (all_gexpenses[j].date < pivot) {
            i++;
            swap(all_gexpenses, i, j);
        }
    }
    swap(all_gexpenses, i + 1, high);
    return (i + 1);
}
function partitionDateLatest(all_gexpenses, low, high) {
    let pivot = all_gexpenses[high].date;
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {
          if (all_gexpenses[j].date > pivot) {
            i++;
            swap(all_gexpenses, i, j);
        }
    }
    swap(all_gexpenses, i + 1, high);
    return (i + 1);
}
function partitionPriceLow(all_gexpenses, low, high) {
    let pivot = all_gexpenses[high].amount;
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {
          if (all_gexpenses[j].amount < pivot) {
            i++;
            swap(all_gexpenses, i, j);
        }
    }
    swap(all_gexpenses, i + 1, high);
    return (i + 1);
}
function partitionPriceHigh(all_gexpenses, low, high) {
    let pivot = all_gexpenses[high].amount;
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {
          if (all_gexpenses[j].amount > pivot) {
            i++;
            swap(all_gexpenses, i, j);
        }
    }
    swap(all_gexpenses, i + 1, high);
    return (i + 1);
}
function quickSort(all_gexpenses, low, high, option) {
    if (low < high) {
        if(option=="DateO"){
            let pi = partitionDateOldest(all_gexpenses, low, high);
            quickSort(all_gexpenses, low, pi - 1,"DateO");
            quickSort(all_gexpenses, pi + 1, high,"DateO");
        }
        if(option=="DateL"){
            let pi = partitionDateLatest(all_gexpenses, low, high);
            quickSort(all_gexpenses, low, pi - 1,"DateL");
            quickSort(all_gexpenses, pi + 1, high,"DateL");
        }
        if(option=="PriceL"){
            let pi = partitionPriceLow(all_gexpenses, low, high);
            quickSort(all_gexpenses, low, pi - 1,"PriceL");
            quickSort(all_gexpenses, pi + 1, high,"PriceL");
        }
        if(option=="PriceH"){
            let pi = partitionPriceHigh(all_gexpenses, low, high);
            quickSort(all_gexpenses, low, pi - 1,"PriceH");
            quickSort(all_gexpenses, pi + 1, high,"PriceH");
        }
    }
}

// export default quickSort;
function returngarr(option)
{
    let n = all_gexpenses.length;
    quickSort(all_gexpenses,0,n-1,option);
    return all_gexpenses;
}
// export default all_gexpenses;
export default returngarr;
