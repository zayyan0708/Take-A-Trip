// export const ConvertCurrency=({toN,fromN,fromV})=>{
//     var myHeaders = new Headers();
//     myHeaders.append("apikey", "TZQbYa6bS5WuhQNk0WBxIIg9JhYY1TGj");
//     var requestOptions = {
//     method: 'GET',
//     redirect: 'follow',
//     headers: myHeaders
//     };
//     fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toN}&from=${fromN}&amount=${parseInt(fromV)}`, requestOptions)
//     .then(response => response.text())
//     .then(re => onChangeToValue(JSON.parse(re).result))
//     .catch(error => console.warn('error', error));
// }