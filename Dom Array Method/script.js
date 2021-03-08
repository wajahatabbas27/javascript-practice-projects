//callinng Dom elements
const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleMoney = document.getElementById('double-money');
const showMillionaire = document.getElementById('show-millionaire');
const sortButton = document.getElementById('sort-richest');
const totalButton = document.getElementById('calculate-total');

let data = [];

//functin to fetch random user
// used https://randomuser.me/api/
const generateRandomUser = async () => {
    const res = await fetch(' https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];
    //console.log(user.name);
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        worth: Math.round(Math.random() * 1000000)
    };
    addData(newUser);
}

//function to doubleWorth
const doubleWorth = () => {

    //The map() method creates a new array with the results of calling a function for every array element.
    data = data.map((item) => {
        return { ...item, worth: item.worth * 2 }
    });
    updateDom();
}

//sort function
const sortRichest = () => {
    //The sort order can be either alphabetic or numeric, and either ascending (up) or descending (down).
    data.sort((a, b) => b.worth - a.worth);
    updateDom();
}

//millionaire function
const showmillionaire = () => {
    //The filter() method creates an array filled with all array elements that pass a test (provided as a function).
    data = data.filter(item => item.worth > 1000000);
    updateDom();
}

// calculateTotalWealth function
function totalWealth() {
    const total = data.reduce(
        (acc, item) => (acc += item.worth), 0
    );

    const TOTALWORTH = document.createElement('div');
    TOTALWORTH.innerHTML = `<h3> Total Net Worth: <strong>${formatCurrency(total)}</strong></h3>`
    main.appendChild(TOTALWORTH);
}


// Add new users to array
const addData = (newUser) => {
    data.push(newUser);

    updateDom();
}

//function to update UI
const updateDom = (inputdata = data) => {
    main.innerHTML = '<h2><strong>Name</strong> NetWorth</h2>';
    //forEach array method lagarhe hain]
    //The forEach() method calls a function once for each element in an array, in order.
    inputdata.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `<strong>${item.name}</strong>  ${formatCurrency(item.worth)}`;
        main.appendChild(element);
    });
}

//format Currency
const formatCurrency = num => {
    return 'PKR ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


//Event Listeners
addUserButton.addEventListener('click', generateRandomUser);
doubleMoney.addEventListener('click', doubleWorth);
sortButton.addEventListener('click', sortRichest);
showMillionaire.addEventListener('click', showmillionaire);
totalButton.addEventListener('click', totalWealth);


generateRandomUser();
generateRandomUser();
generateRandomUser();