//////////////////////////////////////////////////////
///                                                ///
///              CS PREP GROUP PROJECT             ///
///                                                ///
///              POMODORO STUDY TIMER              ///
///                                                ///
//////////////////////////////////////////////////////

// when testing, let breakTime be 1 (=== 1000 milliseconds)

let target = 0;
let awarded = 0;
let studyTime = 0;
let breakTime = 0;

const messages = {
  // Program Start.
  A: "Welcome! Would you like to start a Pomodoro timer?",
  // Yes(y) decision response.
  A1: "Awesome! Let's get started!",
  // No(n) decision response.
  A2: "Ok! See you next time!",
  A3: "You've selected 'no'. Returning you to the beginning.",
  // First Question=>B, invoked when user clicks yes through prompts
  B: "How many Pomodoros were you looking to earn?",
  // B1 has been pasted. (Line(s): 79)
  // B1: `Great we will set you with ${target} Pomodoros. How long do you want each Pomodoro to last (in minutes)?`,
  // During the program as user is studying (no input is need from user to start break, this is just an alert)
  B2:  `How long do you want your break to last (in minutes)?`,
  // C has been pasted. (Line(s): 132)
  // C: `Good job! You collected one more Pomodoro. You have ${target-awarded} Pomodoro's to go! Would you like to take your break?`,
  // When the user enters break time (no input is need from user to start break, this is just an alert)
  C1: "Your study session has begun. Get ready to collect a Pomodoro!",
  // D: after awarded 1 Pomodoro | when target === awarded (pomodoro)
  // D has been pasted. (Line(s): 127)
  // D: `Good job! You collected all ${target} Pomodoros!`,
  // D1 has been pasted. (Line(s): 149)
  // D1: `You collected ${awarded} Pomdoros, you still have ${target - awarded} pomdoros left. Are you sure you want to quit?`,
  // Goodbye message for endSession.
  E: "Your session has ended!",

  // Universal error! (isNaN error)
  Z: "Uh oh! You need to enter a number! Hit 'y' to try again.",
  // Error for inputs that = 0
  Z1: "Uh oh! Your input needs to be greater than 0. Try again."
}

// convert user input of minutes to milliseconds for setTimeOut()
function timeConversion(min){
  return min * 1000 // *60 // don't forget to add/remove * 60 for shortening testing
}

/* #2
All responses need to be numbers.
Add a check in each to ensure number is input and response if somone puts a non-number in.
EX: 'ewrwe'
for loop to check if input is number (if n !== number)
Response: "Sorry! Please put a number for how many Pomo's you want!"*/

function startPomodoro(){
  // The welcome confirmation
  const response = confirm(messages.A)
  if (response){
    // If "yes"
    alert(messages.A1)
    pomodoroNumber()
  } else {
    // If "cancel"
    alert(messages.A2)
  }
}

function pomodoroNumber(){
  // match response to target (# of pomodoro)
  const response = prompt(messages.B)
  // check if response is a number
  if(isNaN(response)){
    const response = confirm(messages.Z)
    if(response){
      // If 'y'
      pomodoroNumber()
    }
    else{
      // If 'n'
      alert(messages.A3)
      startPomodoro();
    }
  }
  // check if response >= 0
  else if(response <= 0){ const response = confirm(messages.Z1)
    if (response){
      // If 'y'
      pomodoroNumber()
    } else {
      // If 'n'
      alert(messages.A3)
      target = 0
      startPomodoro();
    }
  }
  // run if response !isNaN + >= 0
  
  else{
    target = response;
    pomodoroStudyTime();
  }
}

function pomodoroStudyTime(){
  const response = prompt(`Great we will set you with ${target} Pomodoros. How long do you want each Pomodoro to last (in minutes)?`)
  // const response = prompt(messages.B1)
  if(isNaN(response)){
    const response = confirm(messages.Z)
    if(response){
      // If 'y'
      pomodoroStudyTime()
    }
    else{
      // If 'n'
      alert(messages.A3)
      startPomodoro();
    }
  }
  // check if response >= 0
  else if(response <= 0){ const response = confirm(messages.Z1)
    if (response){
      // If 'y'
      pomodoroStudyTime()
    } else {
      // If 'n'
      alert(messages.A3)
      target = 0;
      studyTime = 0
      startPomodoro();
    }
  }
  // run if response !isNaN + >= 0
  else{
    studyTime = timeConversion(response);
    pomodoroBreakTime();
  }
}

function pomodoroBreakTime(){
  const response = prompt(messages.B2)
  if(isNaN(response)){
    const response = confirm(messages.Z)
    if(response){
      // If 'y'
      pomodoroBreakTime()
    }
    else{
      // If 'n'
      alert(messages.A3)
      startPomodoro();
    }
  }
  // check if response >= 0
  else if(response <= 0){ const response = confirm(messages.Z1)
    if (response){
      // If 'y'
      pomodoroBreakTime()
    } else {
      // If 'n'
      alert(messages.A3)
      target = 0;
      studyTime = 0;
      breakTime = 0;
      startPomodoro();
    }
  }
  // run if response !isNaN + >= 0
  else{
    breakTime = timeConversion(response);
    enterStudyRoom();
  }
}

function enterStudyRoom(){
  const response = alert(messages.C1)
  const startTime = setTimeout(enterBreakRoom, breakTime)
}

function enterBreakRoom(){
  awarded++;
  // const response = alert();
  // if you want to quit pomodoro hunting 
  if(awarded < target){
    const response = confirm(`Good job! You collected one more Pomodoro. You have ${target-awarded} Pomodoro's to go! Would you like to take your break?`)
    // prompt: answer "y" -> enter study room
    if(response){
      setTimeout(enterStudyRoom, breakTime)
      } 
    else {
      endSession()
    }
  } 
  
  else{
    const response = alert(`Good job! You collected all ${target} Pomodoros!`)
    targetMet();
  }
}

function endSession(){
  const response = confirm(`You collected ${awarded} Pomodoros - you still have ${target - awarded} Pomodoros left. Are you sure you want to quit?`);
  if(!response){
    enterStudyRoom()
    } 
  else {
    alert(messages.E)
  }
}

function targetMet(){
  const response = confirm(`You have collected your ${target} Pomodoros! Would you like to start a new session?`);
  if(response){
    awarded = 0;
    startPomodoro()
  } 
    else{alert(messages.E)
  }
}
startPomodoro()

