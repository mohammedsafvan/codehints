"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { debounce } from "lodash";
import Monaco from "@/components/Monaco";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Spinner from "@/components/Spinner";
import QuestionSection from "@/components/QuestionSection";
import { sendData } from "@/utils/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function CodeEditor() {
  const { slug } = useParams();
  const [userCode, setUserCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userQuestion, setUserQuestion] = useState(null);
  const [isHintLoading, setHintLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [recognition, setRecognition] = useState(null);
  const audioCtx = useRef(null);

  const fetchQuestion = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/select?titleSlug=${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Question!");
        }
        return res.json();
      })
      .then((data) => {
        setUserQuestion(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  };

  const handleHintClick = () => {
    setHintLoading(true);
    sendData(userCode, userQuestion.question, toast, setHintLoading);
  };

  const toggleRecording = () => {
    if (!recognition) return;

    if (!isRecording) {
      recognition.start();
      setIsRecording(true);
      setError("");
    } else {
      recognition.stop();
      setIsRecording(false);
    }
  };
  const handleCodeChange = (newCode) => {
    setUserCode(newCode);
  };
  useEffect(() => {
    audioCtx.current = new AudioContext();
    return () => toast.dismiss();
  }, []);

  useEffect(() => {
    fetchQuestion();
    // Check if browser supports speech recognition
    console.log("checking for borowser speech recognition");
    if ("webkitSpeechRecognition" in window) {
      console.log("does have webkitspeecch");
      const rec = new window.webkitSpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;

      rec.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };

      rec.onstart = () => {
        console.log("Sterted recording");
      };

      rec.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };

      rec.onend = () => {
        console.log("recording finished");
        setIsRecording(false);
      };

      setRecognition(rec);
    } else {
      setError("Speech recognition is not supported in this browser.");
    }
  }, []);

  return isLoading ? (
    <div className="h-screen flex align-center justify-center">
      <Spinner />
    </div>
  ) : (
    <div className="h-full p-4">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          {isRecording}
          <QuestionSection userQuestion={userQuestion} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <Monaco handleCodeChange={handleCodeChange} />
        </ResizablePanel>
      </ResizablePanelGroup>
      <div className="fixed bottom-4 right-4">
        {isHintLoading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <>
            <Button className="px-6" size="lg" onClick={handleHintClick}>
              Hint
            </Button>

            <Button
              className="px-6"
              size="lg"
              onClick={() => recognition.start()}
            >
              Record
            </Button>

            {/* <Button */}
            {/*   className="px-6" */}
            {/*   size="lg" */}
            {/*   onClick={() => recognition.stop()} */}
            {/* > */}
            {/*   Stop */}
            {/* </Button> */}
            <h1>{transcript}</h1>
          </>
        )}
      </div>
    </div>
  );
}
