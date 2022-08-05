import React from "react";
import AnswerCard from "./AnswerCard";

export default function QuestionCard({
    quiz,currentAnswers,currentQuestionIndex,quizzes,navigateNext,
    pickAnswer,correctAnswer,pickedAnswer
    }){
    //console.log("currentAnswers",currentAnswers);
    return (
        <div className="question-card">
            <p>Total Quiz : {currentQuestionIndex+1}/{quizzes.length}</p>
            <h3>{quiz.question}</h3>
            {
                currentAnswers.map((answer,index) => (
                    <AnswerCard key={index} answer={answer} pickAnswer={pickAnswer}
                    correctAnswer={correctAnswer}
                    pickedAnswer={pickedAnswer}
                    />
                ))
                
            }
            <button onClick={navigateNext}>Next</button>
        </div>
    )
}