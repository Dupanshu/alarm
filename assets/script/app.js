'use strict';

const clock_div = document.querySelector('.clock');
const setHour = document.getElementById('input_hour');
const setMinute = document.getElementById('input_minute');
const setAmpm = document.getElementById('input_ampm');
const now = new Date();

const delay = 1000;

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
      const setNewHour = (Number(setHour.value) + 12);
      if(setNewHour.toString() === `${hour.toString()}` && setMinute.value === `${minute.toString()}` && second === 0) {
        alarmSound.play();
      } else {
        alarmSound.pause();
      }
    } else if (setHour.value === `${hour.toString()}` && setMinute.value === `${minute.toString()}` && second === 0) {
      alarmSound.play();
    } else {
      alarmSound.pause();
    }
  }
  
  setAlarm();
}

addClock();

setInterval(addClock, delay);

