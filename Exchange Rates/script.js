//Dom elements 
const curr_one = document.getElementById('currency-one');
const curr_two = document.getElementById('currency-two');
const curr_one_amount = document.getElementById('amount1');
const curr_two_amount = document.getElementById('amount2');
const flip = document.getElementById('flip');
const rate = document.getElementById('rate');



//functions
//fetching data from api
const calculate = () => {
    const oneCode = curr_one.value;
    const twoCode = curr_two.value;

    fetch(`https://v6.exchangerate-api.com/v6/245896f307441d7f5dc3521b/latest/${oneCode}`)
        .then(res => res.json())
        .then(data => {
            const exchangerate = data.conversion_rates[twoCode];

            //display the conversion rate
            rate.innerText = ` 1 ${oneCode} = ${exchangerate} ${twoCode}`;

            //apply conversion rate and update amount of currency two
            curr_two_amount.value = (curr_one_amount.value * exchangerate).toFixed(2);

        });

}


//flip button
const flips = () => {
    const temp = curr_one.value;
    curr_one.value = curr_two.value;
    curr_two.value = temp;
    calculate();
}








//eventlisteners
curr_one.addEventListener('change', calculate);
curr_two.addEventListener('change', calculate);
curr_one_amount.addEventListener('input', calculate);
curr_two_amount.addEventListener('input', calculate);
flip.addEventListener('click', flips);





calculate();








