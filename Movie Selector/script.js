// getting Dom elements

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row.seat:not(.occupied)');
const total = document.getElementById('total');
const count = document.getElementById('count');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

container.addEventListener('click', (e) => {
    //console.log(e.target);

    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();

});

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //console.log(selectedSeats);
    const countSelectedSeats = selectedSeats.length;
    //console.log(countSelectedSeats);

    count.innerText = countSelectedSeats;
    total.innerText = countSelectedSeats * ticketPrice;

    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

movieSelect.addEventListener('change', e => {
    ticketPrice = e.target.value;
    updateSelectedCount();

    setMovieData(e.target.selectedIndex, e.target.value);

})

const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

const populateUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {

        seats.forEach((seat, index) => {

            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selectedSeats');
            }

        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

updateSelectedCount();