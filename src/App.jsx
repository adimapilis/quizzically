import { useState, useEffect } from "react"
import Question from "./Question.jsx"
import {nanoid} from "nanoid"

export default function App() {
  const [startGame, setStartGame ] = useState(false)
  const [data, setData ] = useState([])
  const [hasSubmit, setHasSubmit ] = useState(false)
  const [score,setScore] = useState(0)
  const [category,setCategory] = useState('')
  const [difficulty,setDifficulty] = useState('')


  // determines which page is shown
  function changeStartGame() {
    setStartGame(!startGame)
  }

 //sets Data as an array of questions as objects
   function arrangeData(data) {
    const questions = data.map(each => ({
      questionId: nanoid(),
      question: each.question,
      answers: getAnswers(each)
    })
    )
    setData(questions)
  }

  //fetches API and creates initial Data Array
  useEffect( () =>
    {
      if (startGame) {fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`)
    .then(res => res.json())
    .then(data => arrangeData(data.results))
    }},[startGame])



  //sets the answers props for Data with shuffled answers
  function  getAnswers(data) {
    const answersArray=[]
    answersArray.push({
      text: data.correct_answer,
      value : true,
      isChosen: false,
      answerId: nanoid(),
    })
    data.incorrect_answers.forEach(each => {
      answersArray.push({
        text: each,
        value : false,
        isChosen: false,
        answerId: nanoid(),
      })
    })
    const answers = answersArray.sort(function () {return Math.random() - 0.5})

    return answers
  }


  function selectAnswer(answerID,questionID) {

    setData(prevData =>
      prevData.map(question => {
        if (question.questionId===questionID) {
          const newAnswers=question.answers.map(answer =>{
            if (answer.answerId===answerID) {
              return {
                ...answer,
                isChosen:true
              }
            }
            else {
              return {
                ...answer,
                isChosen:false
              }
            }
          })
          return {
            ...question,
            answers: newAnswers
          }
        }
        else {
          return {
            ...question
          }
        }
      })
    )
  }

  function deselect() {
    setData(prevData =>
      prevData.map(question => {
        const newAnswers=question.answers.map(answer =>(
            {...answer,
            isChosen:false}
          ))
        return {
          ...question,
          answers: newAnswers
        }
      })
    )
  }


  function countCorrect() {
    data.map(question => {
      question.answers.map(answer => {
        if (answer.isChosen && answer.value) {
          setScore(prevScore => prevScore + 1)
          console.log("correct")
          return {...answer}
        }
        else {
          return {...answer}
        }
      })
      return {...question}
    })
  }





  function submitAnswers() {
    if (!hasSubmit) {
      countCorrect()
      setHasSubmit(true)
    }
    else {
      deselect()
      setHasSubmit(false)
      setStartGame(false)
      // setScore(0)
    }
  }

  const allItems = data.map(item => {
    return(
    <Question
    answers={item.answers}
    question={item.question}
    questionId={item.questionId}
    selectAnswer={selectAnswer}
    hasSubmit= {hasSubmit}
    />
    )
  })

  const handleCategory = (e) => {
    setCategory(e.target.value)
  }
  const handleDifficulty = (e) => {
    setDifficulty(e.target.value)
  }

  return (
    <main>
      {!startGame ?
      <div className="home-page">
      <h1 className="home-title">Quizzically</h1>
      <h5 className="home-text">Choose your difficulty and category</h5>
      <select value={category} onChange={handleCategory} class="choice">
        <option value="">Any Category</option>
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="13">Entertainment: Musicals &amp; Theatres</option>
        <option value="14">Entertainment: Television</option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="17">Science &amp; Nature</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Entertainment: Comics</option>
        <option value="30">Science: Gadgets</option>
        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
        <option value="32">Entertainment: Cartoon &amp; Animations</option>
      </select>
      <select value={difficulty} onChange={handleDifficulty} class="choice">
        <option value="">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button className="start-button" onClick={()=>changeStartGame()}>Start Quiz</button>
      </div> :
      <div>
        <div style={{color:"rgb(20, 8, 112)", marginBottom:"30px",fontSize:"30px", fontWeight:"bold"}}>Multiple Choice: Click your answer.</div>
        {allItems}
        <div className="bottom-section">
          <button className="btn-submit" onClick={submitAnswers}>
          {!hasSubmit ? "Check Answers" : "Play Again"}
          </button>
          {hasSubmit && <h1 className="score">You scored {score}/10 correct answers</h1>}
        </div>
      </div>}
    </main>
  )
}
