import React from "react"
import Answer from "./Answer"

export default function Question(props) {

  const choices = props.answers.map(answer => (
    <Answer
    className="trivia-answer"
    value={answer.value}
    text={answer.text}
    isChosen={answer.isChosen}
    answerId={answer.answerId}
    hasSubmit={props.hasSubmit}
    selectAnswer={()=>props.selectAnswer(answer.answerId,props.questionId)}>
    </Answer>
  ))

 return (
  <section className="question-item">
    <p className="trivia-question">{props.question}</p>
    <div className="trivia-answers">{choices}</div>
  </section>
  )
}
