'use strict';

const clock_div = document.querySelector('.clock');
const setHour = document.getElementById('input_hour');
const setMinute = document.getElementById('input_minute');
const setAmpm = document.getElementById('input_ampm');
const warningP = document.querySelector('.warning_p i');
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
};

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
};

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
  };

  // am or pm for clock
  function ampm() {
    if(hour > 12) {
      return "p.m.";
    } else {
      return "a.m.";
    }
  };

  // 0 in hours for clock
  function hourDigit() {
    if(hoursRange().length < 2) {
      return `0${hoursRange()}`;
    } else {
      return hoursRange();
    }
  };

  // 0 in minutes for clock
  function minuteDigits() {
    if ((minute.toString().length) < 2) {
      return `0${minute.toString()}`;
    } else {
      return minute.toString();
    }
  };

  const clock = document.createElement("h1");
  clock.textContent = `${hourDigit()}:${minuteDigits()} ${ampm()}`;

  clock_div.replaceChild(clock, clock_div.firstChild);


  //checks for invalid input
  function InvalidTime() {
    const warning1 = 'Invalid Format. Correct Format is "HH:MM a.m./p.m."';

    if (normalizeHourInput() > 11 || normalizeHourInput() < 0 || normalizeMinuteInput() > 59 || normalizeMinuteInput() < 0 || !validAmpm.includes(setAmpm.value) || (setHour.value.length) > 2 || setMinute.value.length > 2 || isNaN(Number(setHour.value)) || isNaN(Number(setMinute.value)) || setHour.value === " " || setMinute.value === " " || setHour.value === "  " || setMinute.value === "  ") {
      warningP.textContent = warning1;
      warningP.style.display = 'block';
      saveAlarmBtn.disabled = true;
    } else {
      warningP.style.display = 'none';
      saveAlarmBtn.disabled = false;
    }
  };


  setTime = {
    timeHour: normalizeHourInput(),
    timeMinute: normalizeMinuteInput(),
    ampm: setAmpm.value,
    checked: true
  };

  //set alarm
  const alarmSound = new Audio('../alarm/assets/media/alarm_sound.mp3');

  function alarmSet() {
    for (let i = 0; i < setTimeList.length; i++) {
      const listHour = setTimeList[i].timeHour;
      const listMin = setTimeList[i].timeMinute;
      const listAmpm = setTimeList[i].ampm;

      if(setTimeList[i].checked) {
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
  };

  alarmSet();
  InvalidTime();
}

addClock();

setInterval(addClock, delay);

window.addEventListener('load', () => {
  setHour.value = "";
  setMinute.value = "";
  setAmpm.value = "a.m.";
});

// alarm panel button
setAlarmBtn.addEventListener('click', () => {
  setAlarm.style.visibility = 'visible';
 setTimeout(() => {
  setHour.focus();
 }, 500);
});

cancelAlarmBtn.addEventListener('click', () => {
  setAlarm.style.visibility = 'hidden';
  setHour.value = "";
  setMinute.value = "";
  setAmpm.value = "a.m.";
});


// input field easy accessability
setHour.addEventListener('keydown', (event)=>{
  if (event.key === 'Enter') {
    event.preventDefault();
    setMinute.focus();
  }
});

setMinute.addEventListener('keydown', (event)=> {
  if (event.key === 'Enter') {
    event.preventDefault();
    setAmpm.focus();
  }
});

setAmpm.addEventListener('keydown', (event)=> {
  if (event.key === 'Enter') {
    event.preventDefault();
    saveAlarmBtn.click();
  }
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
        <input type="checkbox" id="checkedAlarm" checked>
        <span class="slider"></span>
      </label>
    </div>
    `;
    alarmList.insertBefore(emptyDiv, alarmList.firstChild);

    //toggle alarm on off button
    const checkBtn = document.getElementById('checkedAlarm');

    checkBtn.addEventListener('click', () => {
      setTimeList[i].checked = !setTimeList[i].checked;
    });
  }
}

//save alarm to alarm list
function saveBtnValidation() {
  const warning2 = "Please enter something.";

  saveAlarmBtn.addEventListener('click', () => {
    if (isNaN(setTime.timeHour) || isNaN(setTime.timeMinute)) {
      warningP.textContent = warning2;
      warningP.style.display = 'block';
    } else {
      warningP.style.display = 'none';
      alarmList.style.visibility = 'visible';
      setTimeList.push(setTime);
      displayAlarmList();
      setAlarm.style.visibility = 'hidden';
      setHour.value = "";
      setMinute.value = "";
    }
  });
};
saveBtnValidation();

