
async function postData(url = "", data = {}) { 
    const response = await fetch(url, {
      method: "POST", headers: {
        "Content-Type": "application/json", 
      }, body: JSON.stringify(data),  
    });
    return response.json(); 
  }

  sendButton.addEventListener("click", async ()=>{ 
    questionInput = document.getElementById("questionInput").value;
    document.getElementById("questionInput").value = "";
    document.querySelector(".right2").style.display = "block"
    document.querySelector(".right1").style.display = "none"

    // question1.innerHTML = questionInput;
    question2.innerHTML = questionInput;

    // Get the answer and populate it! 
    let result = await postData("/api", {"question": questionInput})
    // solution.innerHTML = result.answer

    const code = result.answer; // Replace this with your actual code

    // Function to insert line breaks before closing curly braces
    const codeContainer = document.getElementById("solution");
    
    function formatCode(code) {
      code = code.replace(/{/g, "{\n"); // Insert line break before opening curly braces
      code = code.replace(/}/g, "}\n"); // Insert line break before closing curly braces
      return code;
    }

    // Get the code container element

    // Set the innerHTML of the code container with the formatted code
    codeContainer.innerHTML = formatCode(code);

  })

  
  // -------------------------------------------------------------------------

  // new chat button click relaod page

  // NewChat.addEventListener("click", async ()=>{ 
  //   document.querySelector(".right2").style.display = "none"
  //   document.querySelector(".right1").style.display = "block"
  // })

  function reloadPage() {
    location.reload();
  }


// -------------------------------------------------------------------------

// <!--  Light And Dark Mode -->

const toggleBtn = document.getElementById('toggle-btn');
const meDL = document.getElementById('meDL');
const styleLink = document.getElementById('style-link');

function myfunct(){
  let element = document.body;
  element.classList.toggle("dark-mode");
}

toggleBtn.addEventListener('click', function () {
  if(meDL.textContent === 'Dark mode'){
    document.getElementById("meDL").innerHTML = "Light mode";
    toggleBtn.style.color = "white";
  }
  
  else {
    if(meDL.textContent === 'Light mode'){
      document.getElementById("meDL").innerHTML = "Dark mode";
      toggleBtn.style.color = "white";
    }
  }
});

// -----------------------------------------------------------------

// Assume `code` is the string containing the code retrieved from MongoDB
// const code = "{{ chat.answer }}"; // Replace this with your actual code




// -----------------------------------------------------------------

// Speech Recoginition

    let recognition;
    let isRecognitionActive = false;
    let savedTranscription = "";

    function startRecognition() {
        recognition = new webkitSpeechRecognition(); // webkitSpeechRecognition()

        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            const result = event.results[event.resultIndex];
            const newTranscript = result[0].transcript;
            const promptText = document.getElementById("questionInput");
            promptText.value = newTranscript; // Set the value of input field to the transcribed text
            savedTranscription = newTranscript; // Save the current transcription
        };

        recognition.onerror = (event) => {
            console.error(event.error);
        };

        recognition.onend = () => {
            console.log("Speech recognition stopped.");
            document.getElementById("microphone").classList.remove("active");
            isRecognitionActive = false;
        };

        recognition.start();
        document.getElementById("microphone").classList.add("active");
        isRecognitionActive = true;
    }

    function stopRecognition() {
        if (recognition) {
            recognition.stop();
            savedTranscription = ""; // Clear the saved transcription
        }
    }

    function toggleRecognition() {
        if (isRecognitionActive) {
            stopRecognition();
        } else {
            if (savedTranscription) {
                document.getElementById("questionInput").value = savedTranscription; // Restore the saved transcription
            }
            startRecognition();
        }
    }
// -----------------------------------------------------------------

// for on click on left side questions

// function populateTextArea(message) {
//   document.getElementById('questionInput').value = message;
// }


    function populateTextArea(message) {
        var questionInput = document.getElementById('questionInput');
        questionInput.value = message;
        questionInput.style.height = 'auto';
        questionInput.style.height = questionInput.scrollHeight + 'px';
    }



// -----------------------------------------------------------------

// for copy button

const copyBtn = document.querySelector("#copybtn");
const solution = document.querySelector("#solution");
const modal = document.getElementById("modal");
const closeBtn = document.getElementsByClassName("close")[0];

copyBtn.addEventListener("click", () => {
  const textToCopy = solution.innerText;
  navigator.clipboard.writeText(textToCopy)
  .then(() => {
    modal.style.display = "block";
  })
  .catch((err) => {
    console.error("Failed to copy: ", err);
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// -----------------------------------------------------------------

//  clear left section

const clearBtn = document.getElementById("clearBtn");
const chatsDiv = document.querySelector(".chats");
clearBtn.addEventListener("click", () => {
  chatsDiv.innerHTML = "";
});

// -----------------------------------------------------------------

// mongo db query for to prevent from store same question again and again

const questionLowerCase = question.toLowerCase(); // Convert question to lowercase

// Check if the question already exists in the database
const existingQuestion = mongo.db.chats.findOne({ 'question': questionLowerCase });

if (!existingQuestion) {
  // The question does not exist in the database, insert it
  mongo.db.chats.insertOne({ 'question': questionLowerCase, 'answer': `${response['choices'][0]['text']}` });
}

// -----------------------------------------------------------------
// loading animation

document.getElementById('solution').innerHTML = 'Loading complete.';

// -----------------------------------------------------------------

// color change of user









