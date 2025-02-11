"use client";


import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"




import Monaco from "@/components/Monaco";
import InactivityWrapper from "@/components/InactivityWrapper";
import { useState, useEffect } from 'react';

export default function CodeEditor() {
  const [userCode, setUserCode] = useState("");
  const url = "10.0.21.149:8000/generate";
  const handleCodeChange = (code) => {
    setUserCode(code);
    console.log(userCode)
  };
  
  const sendData = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_code : userCode,
        user_question: 'Hello'
      })
    })
  }

  useEffect(sendData, [userCode]);
  
  return (
    <div className="h-screen p-4">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>Question</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <InactivityWrapper className="h-full"><Monaco handleCodeChange={handleCodeChange}/></InactivityWrapper>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>

  );
}