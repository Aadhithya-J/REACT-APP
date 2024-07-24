import React, { useState, useEffect } from 'react';
import './App.css';

const questions = [
    { id: 1, type: "radio", question: "1) Which country first colonized India?", options: ["Portugal", "Dutch", "Britain", "France"], correct: 0 },
    { id: 2, type: "checkbox", question: "2) What are the official languages of India?", options: ["Tamil", "Hindi", "Telugu", "English"], correct: [1, 3] },
    { id: 3, type: "dropdown", question: "3) What is the capital of Portugal?", options: ["London", "Barcelona", "Lisbon", "Madrid"], correct: 2 },
    { id: 4, type: "text", question: "4) What is the largest mammal?", correct: "Blue Whale" },
    { id: 5, type: "radio", question: "5) How many sides are in Nanogon?", options: ["7", "8", "9", "10"], correct: 2 },
    { id: 6, type: "checkbox", question: "6) What are the functions of OS?", options: ["Memory management", "Storage management", "Resource management", "None of the above"], correct: [0, 1, 2] },
    { id: 7, type: "dropdown", question: "7) What is the second stage of Data Science Process?", options: ["Goal Setting", "Data Mining", "Building a Model", "Data Acquisition"], correct: 3 },
    { id: 8, type: "text", question: "8) Who invented the Turing machine?", correct: "Alan Turing" },
    { id: 9, type: "radio", question: "9) What is the oldest software development model?", options: ["Waterfall model", "Agile model", "Rapid Application model", "V shape model"], correct: 0 },
    { id: 10, type: "checkbox", question: "10) What are the non-linear data structures?", options: ["Graph", "Stack", "Queue", "Tree"], correct: [0, 3] },
    { id: 11, type: "dropdown", question: "11) Which company developed Elden Ring?", options: ["Santa Monica Studios", "Rockstar Games", "From Software", "Ubisoft"], correct: 2 },
    { id: 12, type: "text", question: "12) Who is the protagonist of God of War?", correct: "Kratos" },
    { id: 13, type: "radio", question: "13) How many protagonists are in GTA V?", options: ["2", "3", "4", "5"], correct: 1 },
    { id: 14, type: "checkbox", question: "14) Who are the main characters in The Last Of Us?", options: ["Tommy", "Rebecca", "Joel", "Ellie"], correct: [2, 3] },
    { id: 15, type: "dropdown", question: "15) In which game did Lady Dimitrescu appear?", options: ["Resident Evil", "Bloodborne", "Dark Souls", "Devil May Cry"], correct: 0 },
    { id: 16, type: "text", question: "16) Who is the protagonist of Attack On Titan?", correct: "Eren Yeager" },
    { id: 17, type: "radio", question: "17) What is the real name of L in Death Note?", options: ["Lelouch", "Levi", "Lawliet", "Laufey"], correct: 2 },
    { id: 18, type: "checkbox", question: "18) Who are the arch enemies?", options: ["Gojo", "Yuji", "Mahito", "Nanami"], correct: [1, 3] },
    { id: 19, type: "dropdown", question: "19) Who is the strongest character in One Punch Man?", options: ["Genos", "Boros", "Blast", "Saitama"], correct: 3 },
    { id: 20, type: "text", question: "20) What is the last name of Edward in Fullmetal Alchemist?", correct: "Elric" }
];

const QuizPage = ({ onLogout }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [timer, setTimer] = useState(120);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            calculateScore();
        }
    }, [timer]);

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers({ ...userAnswers, [questionId]: answer });
    };

    const calculateScore = () => {
        let calculatedScore = 0;
        questions.forEach(question => {
            const userAnswer = userAnswers[question.id];
            if (question.type === 'checkbox') {
                if (JSON.stringify(userAnswer) === JSON.stringify(question.correct)) {
                    calculatedScore += 1;
                }
            } else {
                if (userAnswer === question.correct) {
                    calculatedScore += 1;
                }
            }
        });
        setScore(calculatedScore);
    };

    const handleSubmit = () => {
        calculateScore();
        setTimer(0);
    };

    const handleNext = () => {
        if (currentPage < 3) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (score !== null) {
        return (
            <div className="App">
                <h1>Your Score: {score} / 20</h1>
                <button onClick={onLogout}>Logout</button>
            </div>
        );
    }

    return (
        <div className="App">
            <h1 className="title">Quiz</h1>
            <p className="title">Time Remaining: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</p>
            <div>
                {questions.slice(currentPage * 5, (currentPage + 1) * 5).map((question, index) => (
                    <div key={question.id}>
                        <p>{question.question}</p>
                        {question.type === 'radio' && question.options.map((option, idx) => (
                            <div key={idx}>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={idx}
                                    onChange={() => handleAnswerChange(question.id, idx)}
                                    checked={userAnswers[question.id] === idx}
                                />
                                {option}
                            </div>
                        ))}
                        {question.type === 'checkbox' && question.options.map((option, idx) => (
                            <div key={idx}>
                                <input
                                    type="checkbox"
                                    name={question.id}
                                    value={idx}
                                    onChange={(e) => {
                                        const currentAnswers = userAnswers[question.id] || [];
                                        const newAnswers = e.target.checked
                                            ? [...currentAnswers, idx]
                                            : currentAnswers.filter(ans => ans !== idx);
                                        handleAnswerChange(question.id, newAnswers);
                                    }}
                                    checked={(userAnswers[question.id] || []).includes(idx)}
                                />
                                {option}
                            </div>
                        ))}
                        {question.type === 'dropdown' && (
                            <select onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))} value={userAnswers[question.id] || ''}>
                                <option value="">Select</option>
                                {question.options.map((option, idx) => (
                                    <option key={idx} value={idx}>{option}</option>
                                ))}
                            </select>
                        )}
                        {question.type === 'text' && (
                            <input
                                type="text"
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                value={userAnswers[question.id] || ''}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div>
                <button onClick={handlePrevious} disabled={currentPage === 0}>Previous</button>
                <button onClick={handleNext} disabled={currentPage === 3}>Next</button>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
};

export default QuizPage;
