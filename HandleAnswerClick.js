import React from 'react'

export default function handleAnswerClick(questionIndex, answerIndex) {
    setSelectedAnswers(selectedAnswers.map((prevAnswer, index) => {
        if (index === questionIndex) {
            return answerIndex;
        } else {
            return prevAnswer;
        }
    }));
}