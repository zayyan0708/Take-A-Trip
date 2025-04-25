//21-27
const HotData=[
    {name: "Clothes(Lightweight Fabrics i.e Cotton,Linen)", check: false },
    {name: "SunHat", check: false },
    {name: "SunGlasses", check: false },
    {name: "SunScreen", check: false },
    {name: "Insect Repellent", check: false },
    {name: "Sandals", check: false },
    {name: "Lightweight Shoes", check: false },
    {name: "Lightweight Rain Jacket or Umbrella(In case of Rain)", check: false },
    {name: "Toiletries(e.g Toothbrush,Toothpaste,Shampoo,Conditioner)", check: false },
    {name: "Passports(If travelling internationally)", check: false },
    {name: "Travel Documents & Tickets", check: false },
    {name: "Credit & Debit Cards", check: false },
    {name: "Cash", check: false },
    {name: "Phone and Charger", check: false },
    {name: "First aid kit", check: false },
    {name: "Travel Insurance documents(if you have any)", check: false },
    {name: "Camera", check: false },
    {name: "Ziplock Bags", check: false },
];
//16-21
const WarmData=[
    {name: "Clothes(Long-sleeve shirt)", check: false },
    {name: "Sweater", check: false },
    {name: "Light Jacket", check: false },
    {name: "Glasses", check: false },
    {name: "SunScreen", check: false },
    {name: "SunHat", check: false },
    {name: "Insect Repellent", check: false },
    {name: "Boots", check: false },
    {name: "Closed-toe Shoes", check: false },
    {name: "Lightweight Rain Jacket or Umbrella(In case of Rain)", check: false },
    {name: "Toiletries(e.g Toothbrush,Toothpaste,Shampoo,Conditioner)", check: false },
    {name: "Passports(If travelling internationally)", check: false },
    {name: "Travel Documents & Tickets", check: false },
    {name: "Credit & Debit Cards", check: false },
    {name: "Cash", check: false },
    {name: "Phone and Charger", check: false },
    {name: "First aid kit", check: false },
    {name: "Travel Insurance documents(if you have any)", check: false },
    {name: "Camera", check: false },
    {name: "Ziplock Bags", check: false },
];
//10-16
const ColdData=[
    {name: "Clothes(Long-sleeve shirt)", check: false },
    {name: "Sweater", check: false },
    {name: "Jacket", check: false },
    {name: "Coat", check: false },
    {name: "Hat", check: false },
    {name: "Gloves", check: false },
    {name: "Scarf", check: false },
    {name: "Boots", check: false },
    {name: "Closed-toe Shoes", check: false },
    {name: "Lightweight Rain Jacket or Umbrella(In case of Rain)", check: false },
    {name: "Toiletries(e.g Toothbrush,Toothpaste,Shampoo,Conditioner)", check: false },
    {name: "Passports(If travelling internationally)", check: false },
    {name: "Travel Documents & Tickets", check: false },
    {name: "Credit & Debit Cards", check: false },
    {name: "Cash", check: false },
    {name: "Phone and Charger", check: false },
    {name: "First aid kit", check: false },
    {name: "Travel Insurance documents(if you have any)", check: false },
    {name: "Camera", check: false },
    {name: "Ziplock Bags", check: false },
];
//4-10
const VeryColdData=[
    {name: "Clothes(Long-sleeve shirt,Jeans)", check: false },
    {name: "Warm Sweater", check: false },
    {name: "Warm Jacket", check: false },
    {name: "A Warm Coat", check: false },
    {name: "Hat", check: false },
    {name: "Gloves", check: false },
    {name: "Scarf", check: false },
    {name: "Boots", check: false },
    {name: "Warm Socks", check: false },
    {name: "Closed-toe Shoes", check: false },
    {name: "Lightweight Rain Jacket or Umbrella(In case of Rain)", check: false },
    {name: "Toiletries(e.g Toothbrush,Toothpaste,Shampoo,Conditioner)", check: false },
    {name: "Passports(If travelling internationally)", check: false },
    {name: "Travel Documents & Tickets", check: false },
    {name: "Credit & Debit Cards", check: false },
    {name: "Cash", check: false },
    {name: "Phone and Charger", check: false },
    {name: "First aid kit", check: false },
    {name: "Travel Insurance documents(if you have any)", check: false },
    {name: "Camera", check: false },
    {name: "Ziplock Bags", check: false },
];
//Below 4
const SnowyData=[
    {name: "Clothes(Long-sleeve shirt,Jeans)", check: false },
    {name: "Warm Sweater", check: false },
    {name: "Thermal Undergarments", check: false },
    {name: "Ver Warm Jacket", check: false },
    {name: "A Very Warm Coat", check: false },
    {name: "Hat", check: false },
    {name: "Gloves", check: false },
    {name: "Scarf", check: false },
    {name: "Boots", check: false },
    {name: "Warm Socks", check: false },
    {name: "Snow Pants", check: false },
    {name: "Closed-toe Shoes", check: false },
    {name: "Lightweight Rain Jacket or Umbrella(In case of Rain)", check: false },
    {name: "Toiletries(e.g Toothbrush,Toothpaste,Shampoo,Conditioner)", check: false },
    {name: "Passports(If travelling internationally)", check: false },
    {name: "Travel Documents & Tickets", check: false },
    {name: "Credit & Debit Cards", check: false },
    {name: "Cash", check: false },
    {name: "Phone and Charger", check: false },
    {name: "First aid kit", check: false },
    {name: "Travel Insurance documents(if you have any)", check: false },
    {name: "Camera", check: false },
    {name: "Ziplock Bags", check: false },
];
function ItemsData(temp){
    console.log(temp);
    if(temp>=21){
        return HotData;
    }
    else if(temp<21 && temp>=16){
        return WarmData;
    }
    else if(temp<16 && temp>=10){
        return ColdData;
    }
    else if(temp<10 && temp>=4){
        return VeryColdData;
    }
    else if(temp<4){
        return SnowyData;
    }
    return [];
}
export default ItemsData;