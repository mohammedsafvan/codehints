"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Monaco from "@/components/Monaco";
import InactivityWrapper from "@/components/InactivityWrapper";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Spinner from "@/components/Spinner";
import QuestionSection from "@/components/QuestionSection";

export default function CodeEditor() {
  const { slug } = useParams();
  const [userCode, setUserCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userQuestion, setUserQuestion] = useState("");
  const fetchQuestion = () => {
    setIsLoading(true);
    fetch(`https://alfa-leetcode-api.onrender.com/select?titleSlug=${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Question!");
        }
        return res.json();
      })
      .then((data) => {
        setUserQuestion(data.question);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  };
  const handleCodeChange = (code) => {
    setUserCode(code);
    console.log(userCode);
  };
  useEffect(fetchQuestion, []);
  return isLoading ? (
    <div className="h-screen flex align-center justify-center">
      <Spinner />
    </div>
  ) : (
    <div className="h-screen p-4">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <QuestionSection userQuestion={userQuestion} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <InactivityWrapper className="h-full">
            <Monaco handleCodeChange={handleCodeChange} />
          </InactivityWrapper>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
