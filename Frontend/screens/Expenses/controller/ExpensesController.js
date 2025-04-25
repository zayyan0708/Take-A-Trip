import axios from "axios";
import AllExpense from "../model/ExpensesModel";

const e1 = new AllExpense('1','Dinner',3000,'Food','Had dinner at Monal great time there. Ordered Fish, Steak, BBQ, Chinese and Sandwiches. For Starters had garlic bread, baked potatoes, and salad. Order Fresh Mint Juice.','2022/11/25');
const e2 = new AllExpense('2','Shopping',6000,'Shopping','Shopping at Giga Mall','2022/11/22');
const e3 = new AllExpense('3','Cab Fare',500,'Transport','Went to Hill by cab','2022/11/21');
const e4 = new AllExpense('4','Ticket',1000,'Other','Zipline ticket','2022/10/2')

let all_expenses = new Array();
all_expenses.push(e1);
all_expenses.push(e2);
all_expenses.push(e3);
all_expenses.push(e4);


function swap(all_expenses, i, j) {
    let temp = all_expenses[i];
    all_expenses[i] = all_expenses[j];
    all_expenses[j] = temp;
}
function partitionDateOldest(all_expenses, low, high) {
    let pivot = all_expenses[high].date;
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {
          if (all_expenses[j].date < pivot) {
            i++;
            swap(all_expenses, i, j);
        }
    }
    swap(all_expenses, i + 1, high);
    return (i + 1);
}
function partitionDateLatest(all_expenses, low, high) {
    let pivot = all_expenses[high].date;
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {
          if (all_expenses[j].date > pivot) {
            i++;
            swap(all_expenses, i, j);
        }
    }
    swap(all_expenses, i + 1, high);
    return (i + 1);
}
function partitionPriceLow(all_expenses, low, high) {
    let pivot = all_expenses[high].amount;
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {
          if (all_expenses[j].amount < pivot) {
            i++;
            swap(all_expenses, i, j);
        }
    }
    swap(all_expenses, i + 1, high);
    return (i + 1);
}
function partitionPriceHigh(all_expenses, low, high) {
    let pivot = all_expenses[high].amount;
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {
          if (all_expenses[j].amount > pivot) {
            i++;
            swap(all_expenses, i, j);
        }
    }
    swap(all_expenses, i + 1, high);
    return (i + 1);
}
function quickSort(all_expenses, low, high, option) {
    if (low < high) {
        if(option=="DateO"){
            let pi = partitionDateOldest(all_expenses, low, high);
            quickSort(all_expenses, low, pi - 1,"DateO");
            quickSort(all_expenses, pi + 1, high,"DateO");
        }
        if(option=="DateL"){
            let pi = partitionDateLatest(all_expenses, low, high);
            quickSort(all_expenses, low, pi - 1,"DateL");
            quickSort(all_expenses, pi + 1, high,"DateL");
        }
        if(option=="PriceL"){
            let pi = partitionPriceLow(all_expenses, low, high);
            quickSort(all_expenses, low, pi - 1,"PriceL");
            quickSort(all_expenses, pi + 1, high,"PriceL");
        }
        if(option=="PriceH"){
            let pi = partitionPriceHigh(all_expenses, low, high);
            quickSort(all_expenses, low, pi - 1,"PriceH");
            quickSort(all_expenses, pi + 1, high,"PriceH");
        }
    }
}

// export default quickSort;
function returnarr(option)
{
    let n = all_expenses.length;
    quickSort(all_expenses,0,n-1,option);
    return all_expenses;
}
// export default all_expenses;
export default returnarr;

function returnAPIarr(option,id)
{
    let se = [];
    if(option=="DateO")
    {
        axios.get(`http://192.168.0.105:3300/expenseIndiviual/'${id}'`).
        then(function (response){
            console.warn(response.data)
            se = response.data;
            // console.log(se);
        })
    }
    return se;
}
// export default returnAPIarr;