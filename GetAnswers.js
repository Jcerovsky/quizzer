import React from '/react'
import shuffleArray from "./ShuffleArray";

function replaceHtmlEntities(str) {
    const parser = new DOMParser();
    return parser.parseFromString(`<!doctype html><body>${str}`, 'text/html').body.textContent;
}


export default function getAnswers(question) {
    const answers = [...question.incorrectAnswers, question.correctAnswer];
    const shuffledAnswers = shuffleArray(answers)
    const correctAnswerIndex = shuffledAnswers.indexOf(question.correctAnswer)
    return shuffledAnswers.map((answer, index) => ({
        text: replaceHtmlEntities(answer),
        isCorrect: index === correctAnswerIndex,
    }))
}