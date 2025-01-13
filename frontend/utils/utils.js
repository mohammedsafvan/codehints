const backendUrl = "http://localhost:8000";
import Markdown from "react-markdown";
const MIN_CODE_CHANGE_THRESHOLD = 15; // reasonable 15, smaller 5-10, functi 20-50
const MAX_INACTIVITY_TIME = 16000;

const sendData = (userCode, userQuestion, toast, setHintLoading) => {
  fetch(`${backendUrl}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_code: userCode,
      user_question: userQuestion,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch Question!");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      toast.info(<Markdown>{data.hints}</Markdown>, {
        duration: Infinity,
        style: {
          margin: "0 auto", // Center align horizontally
          width: "50vw", // Take 50% of the viewport width
          fontSize: "1.1rem", // Increase font size
          lineHeight: "1.5", // Improve line spacing
        },
        action: {
          text: "Got it",
          onClick: () => toast.dismiss(), // Dismiss the toast on action click
        },
      });
      setHintLoading(false);
      return data;
    })
    .catch((err) => {
      setHintLoading(false);
      console.log("err", err);
    });
};
export { sendData, backendUrl, MAX_INACTIVITY_TIME, MIN_CODE_CHANGE_THRESHOLD };
