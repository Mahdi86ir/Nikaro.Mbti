import React, { useState } from 'react' 
import { useNavigate } from 'react-router-dom' 
import './Question.css' 
import data from './../JSON/questionsData.json' 

type QuestionTempleProps = {
  id: number 
  dataFormulaOp1: string 
  dataFormulaOp2: string 
  valueOp1: number 
  valueOp2: number 
  question: string 
  option1: string 
  option2: string 
  calc: (value: number, actionTrigger: boolean, data: string) => void 
  isUnanswered: boolean 
} 

interface SelectedOp {
  option: string 
  value: number 
  dataId: string 
}

const QuestionTemple: React.FC<QuestionTempleProps> = ({id,dataFormulaOp1,dataFormulaOp2,valueOp1,valueOp2,question,option1,option2,calc,isUnanswered,}) => {
  const [selectedOp, setSelectedOp] = useState<SelectedOp | null>(null) 

  function calcOpVals(event: React.MouseEvent<HTMLInputElement>, newOption: string, data: string) {
    let value = Number(event.currentTarget.value) 
    let actionTrigger = true
    

    if (selectedOp != null) {
      actionTrigger = false 
      calc(selectedOp.value, actionTrigger, selectedOp.dataId) 
      setSelectedOp(null) 
    } else {
      setSelectedOp({
        option: newOption,
        value,
        dataId: data,
      }) 
    }

    calc(value, actionTrigger, data) 
  }

  return (
    <div>
      <div className="question">
        <span className="question-number">{id}.</span>
        <h2>{question}</h2>
      </div>
      <div className="options">
        <span className="op1">
          <label>{option1}</label>
          <input
            className="cyberpunk-checkbox"
            type="radio"
            name={'op' + id}
            value={valueOp1}
            onClick={(e) => calcOpVals(e, 'option1', dataFormulaOp1)}
          />
        </span>
        <span className="op2">
          <label>{option2}</label>
          <input
            className="cyberpunk-checkbox"
            type="radio"
            name={'op' + id}
            value={valueOp2}
            onClick={(e) => calcOpVals(e, 'option2', dataFormulaOp2)}
          />
        </span>
        {isUnanswered && <p className="err">لطفا به این سوال پاسخ بدهید!</p>}
      </div>
    </div>
  ) 
} 

type ScoreItem = { id: number , nameId: string , value: number } 

export default function Question() {
  const [score, setScore] = useState<{ formulaArr: ScoreItem[] }>({
    formulaArr: [
      { id: 1, nameId: 'P', value: 0 },
      { id: 2, nameId: 'J', value: 0 },
      { id: 3, nameId: 'F', value: 0 },
      { id: 4, nameId: 'T', value: 0 },
      { id: 5, nameId: 'N', value: 0 },
      { id: 6, nameId: 'S', value: 0 },
      { id: 7, nameId: 'I', value: 0 },
      { id: 8, nameId: 'E', value: 0 },
    ],
  }) 

  const [unansweredQuestions, setUnansweredQuestions] = useState<number[]>([]) 

  const calcFunc = (point: number, isPlus: boolean, dataFormula: string) => {
    setScore((prevScore) => {
      const updatedFormula = prevScore.formulaArr.map((item) =>
        item.nameId === dataFormula ? { ...item, value: item.value + (isPlus ? point : -point) } : item
      ) 
      return { formulaArr: updatedFormula } 
    }) 
  } 

  const navigate = useNavigate() 

  const submitingData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() 

    const unanswered = data.filter((item) => !document.querySelector(`input[name='op${item.id}']:checked`)) 

    if (unanswered.length > 0) {
      setUnansweredQuestions(unanswered.map((q) => q.id))
    } else {
      setUnansweredQuestions([]) 
      score.formulaArr.sort((a, b) => (a.value < b.value ? 1 : -1)) 
      let newScores = score.formulaArr.splice(0, 4) 
      for (let i = 0 ; i < 2 ; i++) {
        newScores.map((item1, index) => {
          newScores.map((item2) => {
            if (item1.nameId === 'E' && item2.nameId === 'I') {
              changingNameId(index, newScores) 
            } else if (item1.nameId === 'S' && item2.nameId === 'N') {
              changingNameId(index, newScores) 
            } else if (item1.nameId === 'T' && item2.nameId === 'F') {
              changingNameId(index, newScores) 
            } else if (item1.nameId === 'J' && item2.nameId === 'P') {
              changingNameId(index, newScores) 
            }
          }) 
        }) 
      }
      orderingNameIds(newScores) 
      localStorage.setItem('token', 'true') 
      localStorage.setItem('result', results) 
      navigate('/Result') 
    }
  } 

  const changingNameId = (nameIndex: number, mainScores: ScoreItem[]) => {
    mainScores.splice(nameIndex, 1) 
    const newNameId = score.formulaArr.splice(0, 1)
    mainScores.push(newNameId[0])
  } 

  let e = false
  let i = false
  let s = false
  let n = false
  let t = false
  let f = false
  let j = false
  let p = false
  let results:string
  const orderingNameIds = (finalNameId: ScoreItem[]) => {

      finalNameId.map((item)=>{
        if(item.nameId == 'E'){
            e = true
        }else if(item.nameId == 'I'){
            i = true
        }else if(item.nameId == 'P'){
            p = true
        }else if(item.nameId == 'J'){
            j = true
        }else if(item.nameId == 'F'){
            f = true
        }else if(item.nameId == 'T'){
            t = true
        }else if(item.nameId == 'N'){
            n = true
        }else if(item.nameId == 'S'){
            s = true
        }
      })
      if(i && n && f && p){
        results = 'INFP'
      }else if(i && s && t && j){
        results = 'ISTJ'
      }else if(i && s && f && j){
        results = 'ISFJ'
      }else if(e && s && t && p){
        results = 'ESTP'
      }else if(e && s && f && p){
        results = 'ESFP'
      }else if(i && n && t && j){
        results = 'INTJ'
      }else if(i && n && t && j){
        results = 'INFJ'
      }else if(e && n && t && p){
        results = 'ENTP'
      }else if(e && n && f && p){
        results = 'ENFP'
      }else if (i && s && t && p){
        results = 'ISTP'
      }else if(i && n && t && p){
        results = 'INTP'
      }else if(e && s && t && j){
        results = 'ESTJ'
      }else if(e && n && t && j){
        results = 'ENTJ'
      }else if(i && s && f && p){
        results = 'ISFP'
      }else if(e && s && f && j){
        results = 'ESFJ'
      }else if(e && n && f && j){
        results = 'ENFJ'
      }
  }

  return (
    <form onSubmit={submitingData}>
      {data.map((item) => (
        <div className="question-box" key={item.id}>
          <QuestionTemple
            {...item}
            calc={calcFunc}
            isUnanswered={unansweredQuestions.includes(item.id)}
          />
        </div>
      ))}
      <div className="btn-parent">
        <span>
          <button className="btn">تایید</button>
        </span>
      </div>
    </form>
  ) 
}
