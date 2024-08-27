'use strict';

const clock_div = document.querySelector('.clock');
const setHour = document.getElementById('input_hour');
const setMinute = document.getElementById('input_minute');
const setAmpm = document.getElementById('input_ampm');
const warningP = document.getElementById('warning_p');
const setAlarmBtn = document.getElementById('set_alarm_btn');
const cancelAlarmBtn = document.getElementById('cancel_btn');
const setAlarm = document.querySelector('.set_alarm');
const validAmpm = ["a.m.", "p.m."];
const now = new Date();

const delay = 1000;


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

  //set alarm
  const alarmSound = new Audio('../alarm/assets/media/alarm_sound.mp3');

  function setAlarm() {
    if (setAmpm.value === 'p.m.') {
      const setNewHour = (normalizeHourInput() + 12);
      if(setNewHour === hour && normalizeMinuteInput() === minute && second === 0) {
        alarmSound.play();
      } else {
        alarmSound.pause();
      }
    } else if (normalizeHourInput() === hour && normalizeMinuteInput() === minute && second === 0) {
      alarmSound.play();
    } else {
      alarmSound.pause();
    }
  }
  
  setAlarm();
  InvalidTime();
}

addClock();

setInterval(addClock, delay);


// normalize input functions
function normalizeHourInput() {
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

function normalizeMinuteInput() {
  if (Number(setMinute.value) < 10) {
    if (setHour.value === "0") {
      const newValue = "0" + setMinute.value;
      return Number(newValue.replace("0", ""));
    } else {
      return Number(setMinute.value.replace("0", ""));
    }
  } else {
    return Number(setMinute.value);
  }
}


//checks fo invalid input
function InvalidTime() {
  if (normalizeHourInput() > 11 || normalizeHourInput() < 0 || normalizeMinuteInput() > 59 || normalizeMinuteInput() < 0 || !validAmpm.includes(setAmpm.value) || (setHour.value.length) > 2 || setMinute.value.length > 2 || isNaN(Number(setHour.value)) || isNaN(Number(setMinute.value)) || setHour.value === " " || setMinute.value === " " || setHour.value === "  " || setMinute.value === "  ") {
    warningP.style.display = 'block';
  } else {
    warningP.style.display = 'none';
  }
}

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
});
