import React, { useState, useEffect } from 'react';
import shuffleArray from './ShuffleArray'
import handleAnswerClick from './HandleAnswerClick'
import getAnswers from "./GetAnswers";


export default function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [checkAnswers, setCheckAnswers] = useState(false)
    const [correctCount, setCorrectCount] = useState(0)
    const [answersChecked, setAnswersChecked] = useState(false);

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple')
            .then((res) => res.json())
            .then((data) => {
                const newQuestions = data.results.map((question) => ({
                    question: question.question.replaceAll(/&quot;/g, '"').replaceAll(/&#039;s/g, "'s").replaceAll(/&#039;t/g, "'t").replaceAll(/&amp;/g, '&').replaceAll(/&#039;ve/g, 've'),
                    correctAnswer: question.correct_answer,
                    incorrectAnswers: question.incorrect_answers,
                }));
                setQuestions(newQuestions);
                setSelectedAnswers(newQuestions.map(() => null));

            });
    }, []);

    const memoizedAnswers = React.useMemo(() => questions.map(getAnswers), [questions]);

    function handleCheckAnswers() {
        const allAnswerBtns = document.querySelectorAll('.answer-btn')

        // disabling all answers so they cant be modified after checking answers
        allAnswerBtns.forEach(btn => btn.disabled = true)

        setAnswersChecked(true)
        setCheckAnswers(true)
        let correctAnswers = 0
        questions.forEach((question, index) => {
            const selectedAnswerIndex = selectedAnswers[index];
            if (selectedAnswerIndex !== null && memoizedAnswers[index][selectedAnswerIndex].isCorrect) {
                correctAnswers++;
            }
        });
        setCorrectCount(correctAnswers)
    }

    function handlePlayAgain() {
        setQuestions([]);
        setSelectedAnswers([]);
        setCheckAnswers(false);
        setAnswersChecked(false)
        fetch('https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple')
            .then((res) => res.json())
            .then((data) => {
                const newQuestions = data.results.map((question) => ({
                    question: question.question.replaceAll(/&quot;/g, '"').replaceAll(/&#039;s/g, "'s").replaceAll(/&#039;t;/g, "'t").replaceAll(/&amp;/g, '&').replaceAll(/&#039;ve/g, 've'),
                    correctAnswer: question.correct_answer,
                    incorrectAnswers: question.incorrect_answers,
                }));
                setQuestions(newQuestions);
                setSelectedAnswers(newQuestions.map(() => null));
                setCheckAnswers(false);
            });
    }

    return (
        <div className="questions-div">
            {questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                    <h1>{question.question}</h1>
                    <div>
                        {memoizedAnswers[questionIndex].map((answer, answerIndex) => (
                            <button
                                key={answerIndex}
                                className={`answer-btn btn ${selectedAnswers[questionIndex] === answerIndex ? 'selected-answer' : ''} ${answersChecked && answer.isCorrect ? 'correct-answer-checked' : ''} ${answersChecked && selectedAnswers[questionIndex] === answerIndex ? 'incorrect-answer-checked' : ''}`}
                                onClick={() => handleAnswerClick(questionIndex, answerIndex)}
                            >
                                {answer.text}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            {questions.length > 1 &&
                <button className={checkAnswers? 'none' : 'btn check-answers-btn '} onClick={handleCheckAnswers}>Check answers</button>
            }
            {checkAnswers &&
                (<div className="check-answers-div">
                    <h1>You got {correctCount}/{questions.length} correct answers</h1>
                    <button className='btn play-again-btn' onClick={handlePlayAgain}>Play again</button>
                </div>) }
        </div>
    );
}


