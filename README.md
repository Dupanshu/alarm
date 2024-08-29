# <span style="color:#8E033F">Alarm Clock</span>

### [go to alarm](https://dupanshu.github.io/alarm/)

### Description
An interactive alarm clock application built with JavaScript that allows users to set alarms, view a list of set alarms, and play a sound when the alarm time is reached. The application provides a real-time clock display and handles alarm validation to ensure correct time input.

### Technology used:
- `Javascript`
- `CSS`
- `HTML`

### Usage
#### 1. Set the Time:
  - Click the add button.
  - Enter the hour and minute in the input fields.
  - Select "a.m." or "p.m." using the dropdown.
  - Click the "Save" button to make the alarm panel visible.
#### 2. Manage Alarms
  - Use the toggle switch to activate or deactivate individual alarms.

### Validation
Real-Time validation of the input field for better user experience.
```
JavaScript

//checks for invalid input
  function InvalidInput() {
    const warning1 = 'Invalid Format. Correct Format is "HH:MM a.m./p.m."';

    if (conditions for invalid inputs) {
      warningPara.textContent = warning1;
      warningPara.style.display = 'block';
      saveAlarmBtn.disabled = true;
    } else {
      warningPara.style.display = 'none';
      saveAlarmBtn.disabled = false;
    }
    
    // on save validation
    const warning2 = "Please enter something.";

    saveAlarmBtn.addEventListener('click', () => {
      if (isNaN(setTime.timeHour) || isNaN(setTime.timeMinute)) {
        warningPara.textContent = warning2;
        warningPara.style.display = 'block';
  };
setInterval(InvalidInput, delay);
```

&copy; Dupanshu 2024
