function playBeep() {
  var beep = new Audio('beep.mp3'); // Path to the beep sound file
  beep.volume = 1.0; // Max volume for the beep sound
  beep.play();
}

// Function to pause the song for 2 seconds before playing the beep
function pauseSongAndPlayBeep() {
  var audioPlayer = document.getElementById('audio-player'); // Audio player element
  if (audioPlayer && !audioPlayer.paused) {
    audioPlayer.pause(); // Pause the song
    setTimeout(() => {
      playBeep(); // Play beep after 2 seconds
      audioPlayer.play(); // Resume the song after the beep
    }, 2000); // 2 seconds delay before beep
  } else {
    playBeep(); // If no song is playing, just play the beep
  }
}


   // Automatic Slideshow - change image every 3 seconds
    var myIndex = 0;
    carousel();

    function carousel() {
      var i;
      var x = document.getElementsByClassName("mySlides");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      myIndex++;
      if (myIndex > x.length) { myIndex = 1 }
      x[myIndex - 1].style.display = "block";
      setTimeout(carousel, 3000);
    }

let timeLeft;
let breakTime;
let totalTime; // Keep track of the full duration
let timerInterval;
let isBreak = false; // Flag to track whether it's a break time
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const progressBar = document.getElementById('progress-bar');

// Function to initialize/reset values
function initializeTimer() {
  const focusTimeInput = document.getElementById('focus-time');
  const breakTimeInput = document.getElementById('break-time');

  focusTimeInput.value = "25"; // Default value 25 minutes
  breakTimeInput.value = "5"; // Default value 5 minutes

  timeLeft = 25 * 60; // 25 minutes in seconds
  breakTime = 5 * 60; // 5 minutes in seconds
  totalTime = timeLeft; // Initial total time is focus time
  isBreak = false; // Reset break flag

  updateDisplay();
  progressBar.style.width = '100%'; // Reset progress bar to full
}

// Convert seconds into mm:ss format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Update the timer display
function updateDisplay() {
  timeDisplay.textContent = formatTime(timeLeft);
}

// Update the progress bar
function updateProgressBar() {
  const percentage = (timeLeft / totalTime) * 100;
  progressBar.style.width = `${percentage}%`;
}

function startTimer() {
  const focusTimeInput = document.getElementById('focus-time').value.trim();
  const breakTimeInput = document.getElementById('break-time').value.trim();

  // Ensure values are valid numbers and not empty
  let userFocusTime = (focusTimeInput && !isNaN(focusTimeInput)) ? focusTimeInput * 60 : 25 * 60;
  let userBreakTime = (breakTimeInput && !isNaN(breakTimeInput)) ? breakTimeInput * 60 : 5 * 60;

  // Set timeLeft and breakTime only if the timer is not running
  if (!timerInterval) {
    if (!isBreak) {
      timeLeft = userFocusTime;  // Set focus time
      totalTime = userFocusTime; // Set progress tracking
    } else {
      timeLeft = userBreakTime;  // Set break time
      totalTime = userBreakTime; // Set progress tracking
    }

    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
        updateProgressBar();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;

        if (isBreak) {
          playBeep();
          alert('Break is over. Start a new Pomodoro!');
          initializeTimer(); // Reset timer after break
        } else {
          playBeep();
          alert('Pomodoro session is over. Take a break!');
          isBreak = true; // Switch to break mode
          timeLeft = userBreakTime; // Start break time
          totalTime = userBreakTime; // Update total progress
          updateDisplay();
          updateProgressBar();
          startTimer(); // Start break timer immediately
        }
      }
    }, 1000);
  }
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Reset the timer
function resetTimer() {
  stopTimer();
  initializeTimer();
}

// Event listeners for buttons
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize timer values on page load
initializeTimer();

// Music button functionality
document.getElementById('play-music-button').addEventListener('click', function () {
  var musicFileInput = document.getElementById('music-file');
  musicFileInput.click();
});

// File input for music selection
document.getElementById('music-file').addEventListener('change', function (event) {
  var audioPlayer = document.getElementById('audio-player');
  var audioSource = document.getElementById('audio-source');
  var file = event.target.files[0];
  var fileURL = URL.createObjectURL(file);
  audioSource.src = fileURL;
  audioPlayer.load();
  audioPlayer.play();
});

// Get the element for the editable sentence
const focusTextElement = document.getElementById('focus-text');

// Default placeholder text
const defaultText = "What do you want to focus on?";

// Add an event listener to handle when the text is clicked for editing
focusTextElement.addEventListener('click', function () {
  const currentText = focusTextElement.textContent.trim();

  // Create an input field with the current text as value
  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.value = currentText !== defaultText ? currentText : '';
  inputField.style.fontSize = '20px';
  inputField.style.fontWeight = 'bold';
  inputField.style.border = 'none';
  inputField.style.padding = '5px';
  inputField.style.borderRadius = '5px';
  inputField.style.backgroundColor = '#f0f0f0';
  inputField.style.width = '100%';
  
  // Replace the text with the input field
  focusTextElement.innerHTML = '';
  focusTextElement.appendChild(inputField);
  
  // Focus on the input field so the user can start typing immediately
  inputField.focus();

  // When the user presses 'Enter' or clicks outside, save the new text
  inputField.addEventListener('blur', function () {
    const newText = inputField.value.trim();
    focusTextElement.textContent = newText || defaultText; // Default if empty
  });

  // Also allow pressing 'Enter' to save the text
  inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      inputField.blur();
    }
  });
});    