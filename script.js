const container = document.querySelector(".container");
const seats = document.querySelectorAll(".rows .seat:not(.occupied)");
const count = document.getElementById("count");
const price = document.getElementById("price");
const selectMovie = document.getElementById("movie");



let ticketPrice = +selectMovie.value;

//save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}




//update total and count
const updateSelectedCount = () => {
    const selectedSeat = document.querySelectorAll(".rows .seat.selected");
    const selectedSeatCount = selectedSeat.length;

    const seatIndex = [...selectedSeat].map(seat => [...seats].indexOf(seat))
    localStorage.setItem('selectedSeat', JSON.stringify(seatIndex))

    count.innerText = selectedSeatCount;
    price.innerText = ticketPrice * selectedSeatCount;
};

// get data from local storage and populate on UI
const populateUI = () => {
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeat'));
    if (selectedSeat !== null && selectedSeat.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeat.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if (selectedMovieIndex !== null) {
        selectMovie.selectedIndex = selectedMovieIndex
    }
}


// movie select event
selectMovie.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})

// seat select event
container.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")
    ) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});

populateUI();
updateSelectedCount();
