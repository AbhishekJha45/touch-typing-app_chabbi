import React, { useState, useEffect } from 'react';
import './TypingUI.css';

const keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];

const TypingUI = () => {
  const [inputVal, setInputVal] = useState('');
  const [initialValue, setInitialValue] = useState(
    keys[Math.floor(Math.random() * keys.length)]
  );
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [inputFieldError, setInputFieldError] = useState(false);
  const [questionedKeys, setQuestionedKeys] = useState([]);
  const [answeredKeys, setAnsweredKeys] = useState([]);
  const [testCompleted, setTestCompleted] = useState(false);
  let intervalId = null;
  useEffect(() => {

    if (inProgress && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (inProgress && seconds === 0) {
      if (minutes === 0) {
        clearInterval(intervalId);
        setTestCompleted(true);
      } else {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      }
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [inProgress, minutes, seconds]);

  const searchValChange = (event) => {
    setInputVal(event.target.value);
  };

  const verifyKey = (event) => {
    if (event.key !== 'Backspace') {
      setQuestionedKeys((prevQuestionedKeys) => [
        ...prevQuestionedKeys,
        initialValue,
      ]);

      if (initialValue === event.key) {
        setInitialValue(keys[Math.floor(Math.random() * keys.length)]);
        setInputVal('');
        setInputFieldError(false);
        setAnsweredKeys((prevAnsweredKeys) => [
          ...prevAnsweredKeys,
          initialValue,
        ]);
      } else {
        setInputFieldError(true);
        setInputVal('');
      }
    }
  };

  const startBtn = () => {
    setInProgress(true);
  };

  const restartBtnClicked = () => {
    setInputVal('');
    setInitialValue(keys[Math.floor(Math.random() * keys.length)]);
    setMinutes(5);
    setSeconds(0);
    setInProgress(false);
    setInputFieldError(false);
    setQuestionedKeys([]);
    setAnsweredKeys([]);
    setTestCompleted(false);
    clearInterval(intervalId);
  };

  const stopBtnClicked = () => {
    setInputVal('');
    setInitialValue(keys[Math.floor(Math.random() * keys.length)]);
    setMinutes(5);
    setSeconds(0);
    setInProgress(false);
    setInputFieldError(false);
    setQuestionedKeys([]);
    setAnsweredKeys([]);
    setTestCompleted(false);
    clearInterval(intervalId);
  };

  const renderResultView = () => {
    let accuracy = 0;
    let wpm = 0;
    let kpm = 0;

    if (minutes === 0 && seconds === 0) {
      if (answeredKeys.length === 0) {
        accuracy = 0;
      } else {
        accuracy = Math.ceil((answeredKeys.length / questionedKeys.length) * 100);
      }
      wpm = answeredKeys.length;
      kpm = Math.ceil(wpm / 5);
      console.log(accuracy, wpm);
    }

    return (
      <>
        <h1 className="resultsHeading">Results</h1>
        <ul className="resultsList">
          <li className="resultItem">
            <p className="resultsTextCSS">Total Keys Pressed: {wpm}</p>
          </li>
          <li className="resultItem">
            <p className="resultsTextCSS">Accuracy: {accuracy}%</p>
          </li>
          <li className="resultItem">
            <p className="resultsTextCSS">
              K<span className="spanTextCSS">eys </span>P
              <span className="spanTextCSS">er </span>M
              <span className="spanTextCSS">inute</span>: {kpm}
            </p>
          </li>
        </ul>
        <button
          type="button"
          className="startBtn"
          onClick={restartBtnClicked}
        >
          RESTART
        </button>
      </>
    );
  };
  const renderNonResultView = () => {
  
        return inProgress?renderTestWindow():renderMainScreenView();
  };
  
  const renderTestWindow = () => {
    const inputClass = inputFieldError ? 'redText' : 'blackText';

    return (
      <>
        <div className="stopContainer">
          <button type="button" className="stopBtn" onClick={stopBtnClicked}>
            QUIT PRACTICE
          </button>
        </div>
        <p className="questionKeyCSS">
          Enter the following key:
          <span className="quesKeyCSS"> {initialValue}</span>
        </p>
        <input
          onChange={searchValChange}
          onKeyDown={verifyKey}
          className={inputClass}
          placeholder="Type here..."
          value={inputVal}
        />
      </>
    );
  };

  const renderMainScreenView = () => (
    <>
      <p className="descriptionCSS">
      Touch typing is a method of typing on a keyboard without looking at the keys. It involves using all fingers and placing them on the home row (the middle row of the keyboard where the letters "A", "S", "D", "F", "J", "K", "L", and ";"/":" are located). 
      From the home row, touch typists are able to locate and press the keys accurately and efficiently without the need to visually locate each key.
      Touch typing relies on muscle memory and repetitive practice to develop speed and accuracy. By keeping their eyes on the screen or text, touch typists are able to type quickly and effortlessly, as their fingers naturally move to the correct keys.
      Learning touch typing can significantly increase typing speed and productivity, as well as reduce the strain on your fingers and wrists. It is a valuable skill for anyone who regularly uses a computer or keyboard for work, studies, or personal use.
      </p>
      <div className="cardContainer">
        <h1 className="textCSS">Let's Start Practicing with Orthodox Hand Position</h1>
        <img
          src="https://cdn.dribbble.com/users/35367/screenshots/488745/media/a4cf536c2c9e037fd973c34665a6760c.png"
          alt="handsPosition"
          className="positionCSS"
        />
        <button onClick={startBtn} className="startBtn" type="button">
          START
        </button>
      </div>
    </>
  );

  return (
    <div className="mainContainer">
      <div className="headingAndTimerContainer">
        <h1 className="mainHeading">Touch Typing</h1>
        <div className="timerContainer">
          {minutes === 0 && seconds === 0 ? (
            <h1 className="timerTextCSS">Time Out!</h1>
          ) : (
            <h1 className="timerTextCSS">
              <span className="minutesSpanCSS">Time Left: </span> 0{minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </h1>
          )}
        </div>
      </div>

      <div className="subContainer">
        {testCompleted ? renderResultView() : renderNonResultView()}
      </div>
    </div>
  );
};

export default TypingUI;
