const backendUrl = "http://localhost:8000";
const MIN_CODE_CHANGE_THRESHOLD = 15;
const MAX_INACTIVITY_TIME = 5000;

const sendData = (backendUrl, userCode, userQuestion) => {
  fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_code: userCode,
      user_question: userQuestion,
    }),
  });
};

export { sendData, backendUrl, MAX_INACTIVITY_TIME, MIN_CODE_CHANGE_THRESHOLD };
