import React from "react"

export default function Question(props) {

  const styles= {
    backgroundColor: props.hasSubmit ? (props.isChosen ?(props.value ? "rgb(90 190 115)" : "rgb(255, 194, 194)" ) : (props.value ? "rgb(90 190 115)" : "white")): (props.isChosen ? "rgb(157, 165, 237)" : "white"),
    opacity: !props.hasSubmit ? 1 : props.value ? 1 : .5,
    border: ((props.value && props.hasSubmit) && "none") || (props.isChosen && "none")
  }

  return (
  <button className="btn-answer" style={styles} onClick={()=>props.selectAnswer()}>{props.text}</button>
  )
}