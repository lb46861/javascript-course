'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycle1 = new Cycling([39, -12], 27, 70, 523);
// console.log(run1, cycle1);

///////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const btnClearAll = document.querySelector('.btn__clear');
const btnSort = document.querySelector('.btn__sort');

class App {
  #map;
  #mapZoomLevel = 14;
  #mapEvent;
  #workouts = [];
  sorted = false;
  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._deleteWorkout.bind(this));
    containerWorkouts.addEventListener('click', this._editWorkout.bind(this));
    btnClearAll.addEventListener('click', this._clearWorkouts.bind(this));
    btnSort.addEventListener('click', this._sortWorkouts.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your positon!');
        }
      );
  }

  _loadMap(position) {
    //console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    //console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    // L is namespace for Leaflet geolocation library
    //console.log(this);
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    //console.log(map);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(workout => {
      this._renderWorkoutMarker(workout);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputElevation.value =
      inputCadence.value =
        '';

    // Add hidden class
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    const allWorkouts = document.querySelectorAll('.workout');
    let workoutEl;
    if (allWorkouts) {
      allWorkouts.forEach(workout => {
        if (workout.classList.contains('edit')) {
          workoutEl = workout;
          workout.classList.remove('edit');
        }
      });
    }

    let myworkout, lat, lng, index;

    if (workoutEl) {
      myworkout = this._getWorkout(workoutEl);
      [lat, lng] = myworkout.coords;
      index = this.#workouts.indexOf(myworkout);
    } else {
      ({ lat, lng } = this.#mapEvent.latlng);
    }

    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    let workout;

    // If workout is running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;

      // Check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout is cycling, create cycling object
    if (type === 'cycling') {
      if (type === 'cycling') {
        const elevation = +inputElevation.value;

        if (
          !validInputs(distance, duration, elevation) ||
          !allPositive(distance, duration)
        )
          return alert('Inputs have to be positive numbers!');

        workout = new Cycling([lat, lng], distance, duration, elevation);
      }
    }

    if (myworkout) {
      this.#workouts.splice(index, 1, workout);
      this._hideWorkouts();
      this._renderAllWorkouts();
    } else {
      this.#workouts.push(workout);
      this._renderWorkoutMarker(workout);
      this._renderWorkout(workout);
    }

    // Hide form + clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _sortWorkouts(e) {
    e.preventDefault();
    this.sorted = !this.sorted;
    if (this.sorted) this.#workouts.sort(this._bigSmall);
    else this.#workouts.sort(this._smallBig);
    this._hideWorkouts();
    this._renderAllWorkouts();
  }

  _bigSmall(a, b) {
    if (a.distance < b.distance) return -1;
    if (a.distance > b.distance) return 1;
    return 0;
  }

  _smallBig(a, b) {
    if (a.distance < b.distance) return 1;
    if (a.distance > b.distance) return -1;
    return 0;
  }

  _renderAllWorkouts() {
    this.#workouts.forEach(workout => {
      this._renderWorkout(workout);
    });
  }

  _hideWorkouts() {
    const allWorkouts = document.querySelectorAll('.workout');
    for (let i = 0; i < allWorkouts.length; i++) {
      allWorkouts[i].style.display = 'none';
    }
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <button class="btn btn__edit">Edit <i class="fa fa-edit" aria-hidden="true"></i></button>
        <button class="btn btn__delete">Delete <i class="fa fa-times-circle clr" aria-hidden="true"></i></button>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>`;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>`;

    form.insertAdjacentHTML('afterend', html);
  }

  _getWorkout(workoutEl) {
    const workout = this.#workouts.find(
      wout => wout.id === workoutEl.dataset.id
    );
    return workout;
  }

  _deleteWorkout(e) {
    const delButton = e.target.closest('.btn__delete');
    const myWorkoutEL = e.target.closest('.workout');

    if (!delButton) this._moveToPopup(myWorkoutEL);
    else {
      const myWorkout = this._getWorkout(myWorkoutEL);
      myWorkoutEL.style.display = 'none';

      const [mylat, mylng] = myWorkout.coords;
      const latlng = {
        lat: mylat,
        lng: mylng,
      };

      this.#map.eachLayer(layer => {
        if (JSON.stringify(latlng) === JSON.stringify(layer['_latlng']))
          layer.remove();
      });

      this.#workouts = this.#workouts.filter(
        workout => workout.id !== myWorkout.id
      );

      this._setLocalStorage();
    }
  }

  _editWorkout(e) {
    const editWorkout = e.target.closest('.btn__edit');
    if (!editWorkout) return;
    const allWorkouts = document.querySelectorAll('.workout');
    for (let i = 0; i < allWorkouts.length; i++) {
      allWorkouts[i].classList.remove('edit');
    }
    const workoutEl = e.target.closest('.workout');
    workoutEl.classList.add('edit');
    this._showForm();
  }

  _clearWorkouts() {
    // If we run this at begging there wouldnt be any workouts because they did not laod that fast
    const allWorkouts = document.querySelectorAll('.workout');

    // remove all markers
    this.#map.eachLayer(layer => {
      if (layer['_latlng']) layer.remove();
    });

    // Clear all workouts
    for (let i = 0; i < allWorkouts.length; i++) {
      allWorkouts[i].style.display = 'none';
    }

    // empty workout list and update local storage
    this.#workouts = [];
    this._setLocalStorage();
  }

  _moveToPopup(workoutEl) {
    if (!workoutEl) return;

    const workout = this._getWorkout(workoutEl);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    // Objects coming form lcocal storage will not inherit methods it did before !
    //workout.click();
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach(workout => {
      workout =
        workout.type === 'running'
          ? Object.setPrototypeOf(workout, Running.prototype)
          : Object.setPrototypeOf(workout, Cycling.prototype);
      this._renderWorkout(workout);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
