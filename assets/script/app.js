'use strict';

const clock_div = document.querySelector('.clock');
const setHour = document.getElementById('input_hour');
const setMinute = document.getElementById('input_minute');
const setAmpm = document.getElementById('input_ampm');
const warningP = document.getElementById('warning_p');
const setAlarmBtn = document.getElementById('set_alarm_btn');
const cancelAlarmBtn = document.getElementById('cancel_btn');
const saveAlarmBtn = document.getElementById('save_btn');
const setAlarm = document.querySelector('.set_alarm');
const alarmList = document.querySelector('.alarm .alarm_list');
const validAmpm = ["a.m.", "p.m."];
const setTimeList = [];
const now = new Date();

const delay = 1000;

let setTime = {};

// function to show clock on the main screen
function addClock() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  
  // hours for clock
  function hoursRange() {
    if(hour > 12) {
      const newHour = (hour - 12);
      return newHour.toString();
    } else {
      return hour.toString();
    }
  }

  // am or pm for clock
  function ampm() {
    if(hour > 12) {
      return "p.m.";
    } else {
      return "a.m.";
    }
  }

  // 0 in hours for clock
  function hourDigit() {
    if(hoursRange().length < 2) {
      return `0${hoursRange()}`;
    } else {
      return hoursRange();
    }
  }

  // 0 in minutes for clock
  function minuteDigits() {
    if ((minute.toString().length) < 2) {
      return `0${minute.toString()}`;
    } else {
      return minute.toString();
    }
  }

  const clock = document.createElement("h1");
  clock.textContent = `${hourDigit()}:${minuteDigits()} ${ampm()}`;

  clock_div.replaceChild(clock, clock_div.firstChild);

  
  // normalize input functions
  function normalizeHourInput() {
    if (setHour.value === "") {
      return NaN;
    } else {
      if (Number(setHour.value) < 10) {
        if (setHour.value === "0") {
          const newValue = "0" + setHour.value;
          return Number(newValue.replace("0", ""));
        } else {
          return Number(setHour.value.replace("0", ""));
        }
      } else {
        return Number(setHour.value);
      }
    }
  }

  function normalizeMinuteInput() {
    if(setMinute.value === "") {
      return NaN;
    } else {
      if (Number(setMinute.value) < 10) {
        if (setMinute.value === "0") {
          const newValue = "0" + setMinute.value;
          return Number(newValue.replace("0", ""));
        } else {
          return Number(setMinute.value.replace("0", ""));
        }
      } else {
        return Number(setMinute.value);
      }
    }
  }


  //checks fo invalid input
  function InvalidTime() {
    if (normalizeHourInput() > 11 || normalizeHourInput() < 0 || normalizeMinuteInput() > 59 || normalizeMinuteInput() < 0 || !validAmpm.includes(setAmpm.value) || (setHour.value.length) > 2 || setMinute.value.length > 2 || isNaN(Number(setHour.value)) || isNaN(Number(setMinute.value)) || setHour.value === " " || setMinute.value === " " || setHour.value === "  " || setMinute.value === "  ") {
      warningP.style.display = 'block';
      saveAlarmBtn.disabled = true;
    } else {
      warningP.style.display = 'none';
      saveAlarmBtn.disabled = false;
    }
  }


  setTime = {
    timeHour: normalizeHourInput(),
    timeMinute: normalizeMinuteInput(),
    ampm: setAmpm.value
  };

  //set alarm
  const alarmSound = new Audio('../alarm/assets/media/alarm_sound.mp3');

  function alarmSet() {
    for (let i = 0; i < setTimeList.length; i++) {
      const listHour = setTimeList[i].timeHour;
      const listMin = setTimeList[i].timeMinute;
      const listAmpm = setTimeList[i].ampm;

      if (listAmpm === 'p.m.') {
        const setNewHour = (listHour + 12);
        if(setNewHour === hour && listMin === minute && second === 0) {
          alarmSound.play();
        }
      } else if (listAmpm === 'a.m.' && listHour === hour && listMin === minute && second === 0) {
        alarmSound.play();
      }
    }
  }

  alarmSet();
  InvalidTime();
}

addClock();

setInterval(addClock, delay);

window.addEventListener('load', () => {
  setHour.value = "";
  setMinute.value = "";
});

// alarm panel button
setAlarmBtn.addEventListener('click', () => {
  setAlarm.style.visibility = 'visible';
});

cancelAlarmBtn.addEventListener('click', () => {
  setAlarm.style.visibility = 'hidden';
  setHour.value = "";
  setMinute.value = "";
});


// show alarm list on main screen
function displayAlarmList() {
  const emptyDiv = document.createElement('div');

  for (let i = 0; i < setTimeList.length; i++) {
    const listHour = setTimeList[i].timeHour;
    const listMin = setTimeList[i].timeMinute;
    const listAmpm = setTimeList[i].ampm;

    const rangeListHour = (listHour < 10) ? `0${listHour}` : listHour;
    const rangeListMin = (listMin < 10) ? `0${listMin}` : listMin;

    emptyDiv.innerHTML = `
    <div class="alarm_list_item flex flex-row space-between">
      <h3>${rangeListHour}:${rangeListMin} ${listAmpm}</h3>
      <label class="switch">
        <input type="checkbox" checked>
        <span class="slider"></span>
      </label>
    </div>
    `;
    alarmList.insertBefore(emptyDiv, alarmList.firstChild);
  }
}

//save alarm to alarm list
saveAlarmBtn.addEventListener('click', () => {
  if (isNaN(setTime.timeHour) || isNaN(setTime.timeMinute)) {
    alarmList.style.visibility = 'hidden';
  } else {
    alarmList.style.visibility = 'visible';
    setTimeList.push(setTime);
    displayAlarmList();
    setAlarm.style.visibility = 'hidden';
    setHour.value = "";
    setMinute.value = "";
  }
});

