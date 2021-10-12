const addUserBtn = document.querySelector('#add-user');
const doubleMoneyBtn = document.querySelector('#double-money');
const onlyMillionBtn = document.querySelector('#only-million');
const sortBtn = document.querySelector('#sort');
const totalBtn = document.querySelector('#total');
const main = document.querySelector('#main');

getRandomUser();
getRandomUser();
getRandomUser();

data = [];

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * 1000000)
    };

    addUser(newUser);
}

function addUser(obj){
    data.push(obj);

    updateDom();
}

function updateDom(providedData = data){
    main.innerHTML =`<h2><strong>People</strong> Wealth</h2>`;

    providedData.forEach((item)=>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

function formatMoney(number){
    return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&');
}

function doubleMoney(providedData=data){
    data = data.map((item)=>{
        return {...item,money:item.money*2}
    })

    updateDom();
}

function sortByRichest(){
    data.sort((a,b)=>{
        return b.money-a.money;
    });

    updateDom();
}

function showMillionares(){
    data = data.filter((item)=>{
        return item.money > 1000000;
    })

    updateDom();
}

function totalMoney(){
    const sum = data.reduce((acc,current)=>(acc +=current.money),0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total wealth:<strong>${sum}</strong></h3>`;
    main.appendChild(wealthEl);
}

addUserBtn.addEventListener('click',getRandomUser);
doubleMoneyBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
onlyMillionBtn.addEventListener('click',showMillionares);
totalBtn.addEventListener('click',totalMoney);