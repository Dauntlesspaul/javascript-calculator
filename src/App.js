import React from 'react';
import './App.css';
import { useState } from 'react';
function App() {

        const[formula,setFormula] = useState('')
        const[input,setInput] = useState('0')
        const valueInput = (e)=>{
          
          const userInput = e.target.innerText;
          const check = formula.split('').filter((equals)=> equals==='=').length;
          if(check>0){
            if(userInput==="+" || userInput==="-" || userInput==="x" || userInput==="/"){
            setFormula(()=>input + userInput)
            setInput(()=>  userInput)
            }
            else{
              if(userInput==='.'){
                setFormula(()=> '0.')
                setInput(()=> '0.')
              }
              else{
                setFormula(()=> userInput)
                setInput(()=> userInput)
              }
            }
          }
          else{

          if(formula.length<28 && input.length<28){
          const userInput = e.target.innerText;
          if(formula===''){

          if(input==='0' && userInput==='.') {
              setFormula(()=>'0.')
              setInput(()=>'0.')
          }
          else{
            if(userInput!=='/' && userInput!=='+' && userInput!=='x'){
              setInput((input)=>{
              let newValue= input+=userInput
                if(newValue.length>1 && newValue[0]==='0' && newValue[1]!=='.'){
                  return newValue.slice(1)
                }
                else{
                return newValue
                }
              })
              setFormula((formula)=>{
                let newValue= formula+=userInput
                if(input[0]===0 && formula===''){
                return userInput
                }
                else{
                return newValue 
                }
              })
            }
          }
        }
  
  else{

        const regexOp = /\D/
        const check = regexOp.test(userInput)
        const check2 = regexOp.test(input)

        if( check2 && !check && input.length===1){
            setInput(()=> userInput )
            setFormula((formula)=> formula+=userInput)
            }
        else{
        if(check2 && input.length===1 && userInput==='.'){
          setInput(()=> "0.")
          setFormula((formula)=> formula + "0.")
        }
        else{
        const lastDigit = input.length -1
        const regexOp = /\D/
        const check = regexOp.test(userInput)

        if(input.length>=1 && input[lastDigit]!=='.' && check && userInput!=='.'&& input[lastDigit]!=='-'){
          const fLastD = formula.length-1
          if(formula[fLastD]==='x' && userInput==='-'){
            setInput(()=> userInput)
            setFormula((formula)=> formula + userInput)
                }
          else{
          const formulaL= formula.length -1
          if(formula[formulaL]==='-' || formula[formulaL]==='+' || formula[formulaL]==='x' || formula[formulaL]==='/' ){
            setInput(()=>userInput)
            setFormula(()=>{
            return formula.substring(0,formula.length-1) + userInput
          })
            }
        else{
          setInput(()=>userInput)
          setFormula((formula)=> formula+=userInput)
          }
        }
        }
        else{

          if(input==="-" && input.length===1){
            if(userInput==="-" || userInput==="." ){

              setInput((input)=> input)
              setFormula((formula)=> formula)
              }
              else
              {
              if(formula[formula.length-2] === 'x'){

                setInput(()=> userInput)
                setFormula((formula)=> formula.substring(0,formula.length-2) + userInput)
              }
              else{
              setInput(()=> userInput)
              setFormula((formula)=> formula.substring(0,formula.length-1) + userInput)}
              }
            }
          else{
            const lastDigit = input.length -1
            const regexOp = /\D/
            const check = regexOp.test(userInput)
              if(input[lastDigit]==='.' && check){
                setFormula((formula)=>formula)
                setInput((input)=>input)
              }
          else{
                const verify = input.split('').filter((dots)=>dots===".").length
                if(userInput==="." && verify>0) {
                    setInput((input)=> input)
                    setFormula((formula)=>formula)
                  }
          else{
              setInput((input)=>{
              let newValue= input+=userInput
              if(newValue.length>1 && newValue[0]==='0' && newValue[1]!=='.'){
                  return newValue.slice(1)
                }
          else{
                return newValue
              }
            })
              setFormula((formula)=>{
              let newValue= formula+=userInput
              if(newValue.length>1 && newValue[0]==='0' && newValue[1]!=='.'){
              return newValue.slice(1)
            }
      else{
              return newValue 
              }
            })
            }
          }
        }
      }
     }
    }
    }
  }
  }
}


  const reset = ()=>{
    setFormula('')
    setInput('0')
  }
  
  const cal = ()=>{
    const check = formula.split('').filter((equals)=> equals==='=').length;
    const lastDigit = input.length -1
    const regexOp = /\D/
    const checkSign = regexOp.test(input[lastDigit])
    if(!check>0 && !checkSign && formula!==''){
    const result = formula
    const modifiedR = result.replace(/x/,'*')
    // eslint-disable-next-line
    const answer = String(eval(modifiedR)).split('')
    const decimals = answer.includes('.')
     if(decimals){
    // eslint-disable-next-line 
      const dPlace = String(eval(modifiedR)).split('.')[1].length
      if(dPlace>4){
    // eslint-disable-next-line
    setInput(()=> eval(modifiedR).toFixed(4))
     // eslint-disable-next-line
    setFormula((formula)=> formula + '=' + eval(modifiedR).toFixed(4))
      }
      else{
    // eslint-disable-next-line
    setInput(()=> eval(modifiedR))
    // eslint-disable-next-line
   setFormula((formula)=> formula + '=' + eval(modifiedR))
      }
     }else{
      // eslint-disable-next-line
    setInput(()=> eval(modifiedR))
     // eslint-disable-next-line
    setFormula((formula)=> formula + '=' + eval(modifiedR))
    }
  }
  }
  return (
    <div className='container' >
      <div className='frame'>
        <div className="screen"><div>{formula}</div><div id="display">{input}</div></div>
        <div className='control-grid'>
          <button 
          onClick={reset} 
          id='clear'>AC
          </button>
          <button 
          onClick={valueInput} 
          id='divide'>/
          </button>
          <button 
          onClick={valueInput} 
          id='multiply'>x
          </button>
          <button 
          onClick={valueInput} 
          id='seven'>7
          </button>
          <button 
          onClick={valueInput} 
          id='eight'>8 
          </button>
          <button 
          onClick={valueInput} 
          id='nine'>9
          </button>
          <button 
          onClick={valueInput}
           id='subtract'>-
          </button>
          <button 
          onClick={valueInput}
           id='four'>4
          </button>
          <button 
          onClick={valueInput}
           id='five'>5
          </button>
          <button 
          onClick={valueInput} 
          id='six'>6
          </button>
          <button 
          onClick={valueInput}
           id='add'>+
          </button>
          <button
           onClick={valueInput} 
           id='one'>1
          </button>
          <button 
          onClick={valueInput} 
          id='two'>2
          </button>
          <button 
          onClick={valueInput} 
          id='three'>3
          </button>
          <button  
          onClick={cal} 
          id='equals'>=
          </button>
          <button 
          onClick={valueInput} 
          id='zero'>0
          </button>
          <button
           onClick={valueInput}
            id='decimal'>.
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
