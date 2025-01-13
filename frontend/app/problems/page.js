"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
const QuestionRow = ({ question }) => {
  const router = useRouter();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <tr
      onClick={() => router.push(`/problems/${question.titleSlug}`)}
      className="border-b even:bg-white odd:bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
    >
      <td className="p-4">{question.questionFrontendId}</td>
      <td className="p-4 font-medium">{question.title}</td>
      <td className="p-4">
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}
        >
          {question.difficulty}
        </span>
      </td>
      <td className="p-4">
        <div className="flex gap-1 flex-wrap">
          {question.topicTags.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
      </td>
      <td className="p-4 text-right">{question.acRate.toFixed(1)}%</td>
    </tr>
  );
};

// Main QuestionTable component remains the same
const QuestionTable = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestions = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/problems")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data.problemsetQuestionList);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  useEffect(fetchQuestions, []);

  if (isLoading) {
    return (
      <div className="h-screen flex align-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center h-64">
          <p className="text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>LeetCode Questions ({questions.length} loaded)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="bg-gray-50">
                <th className="text-left p-4 font-medium text-gray-600">
                  Question No
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Title
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Difficulty
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Topics
                </th>
                <th className="text-right p-4 font-medium text-gray-600">
                  Success Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <QuestionRow
                  key={question.questionFrontendId}
                  question={question}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionTable;
