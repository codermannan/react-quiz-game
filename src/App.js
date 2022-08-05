import { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import ScoreCard from './components/ScoreCard';
import shuffle from './utils';


function App() {

  const [quizzes, setQuizzes] = useState(null);
  const [loaded,setLoaded] = useState(false);
  const [startQuiz,setStartQuiz] = useState(false);
  const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0);
  const [currentAnswers,setCurrentAnswers] = useState(null);
  const [endGame,setEndGame] = useState(false);
  const [totalScore,setTotalScore] = useState(0);
  const [correctAnswer,setCorrectAnswer] = useState(null);
  const [pickedAnswer,setPickedAnswer] = useState(null);

  const pickAnswer = (answer) => {
    setPickedAnswer(answer);
    if(answer === correctAnswer){
      setTotalScore((prevTotal)=> prevTotal + 1);
    }
    console.log("totalScore",totalScore)
  }

  const navigateNext = () =>{
    let currentQuizIndex = currentQuestionIndex + 1;
    const validQuestionIndex = currentQuizIndex < quizzes.length;
    //console.log("prevIndex",currentQuizIndex);
    if(validQuestionIndex){
      setCurrentQuestionIndex(currentQuizIndex)
      //console.log("currentQuestionIndex",currentQuestionIndex);
      const nextAnswer = quizzes[currentQuizIndex]
      //console.log("nextAnswer",nextAnswer);
      setCurrentAnswers(shuffle(nextAnswer));
      setCorrectAnswer(nextAnswer.correct_answer);
      setPickedAnswer(null);
    }else{
      setEndGame(true);
    }
    
  }

  //console.log(currentQuestionIndex);
  const fetchQuiz = async () => {
      const res         = await fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple");
      const { results } = await res.json();
      console.log(results);
      setQuizzes(results);

      const initialQuestion  = results[currentQuestionIndex];
      //const answers = [initialQuestion.correct_answer,
     // ...initialQuestion.incorrect_answers
      //];
      //////console.log("answers",answers);
      setCurrentAnswers(shuffle(initialQuestion));
      setCorrectAnswer(initialQuestion.correct_answer);
      //console.log("cccccccccurrentAnswer",currentAnswers);
      setStartQuiz(true);
      setLoaded(true);
  }

  const resetQuiz = () => {
    setQuizzes(null)
    setLoaded(false)
    setCorrectAnswer(null)
    setEndGame(false)
    setStartQuiz(false)
    setPickedAnswer(null)
    setTotalScore(0)
    setCurrentQuestionIndex(0)
  }
  return (
    <>
      {endGame && <ScoreCard totalScore={totalScore} resetQuiz={resetQuiz}/>}
      { !startQuiz &&
      <button onClick={fetchQuiz} style={{display:'block',margin:'200px auto'}}>Start Quiz</button>
      }
      <div className='container'>
        {loaded && !endGame &&
        <QuestionCard
          pickAnswer={pickAnswer}
          quiz={quizzes[currentQuestionIndex]} 
          currentAnswers={currentAnswers}
          currentQuestionIndex={currentQuestionIndex}
          quizzes={quizzes}
          navigateNext={navigateNext}
          correctAnswer={correctAnswer}
          pickedAnswer={pickedAnswer}
        />
        }
      </div>
    </>
  );
}

export default App;
