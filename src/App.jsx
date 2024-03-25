import { useState, useEffect } from "react";
import "./App.css";

const options = ["rock", "scissor", "paper", "spock", "lizard"];

function App() {
  const [userOption, setUserOption] = useState(null);
  const [computerOption, setComputerOption] = useState(null);
  const [result, setResult] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [readyToAnimate, setReadyToAnimate] = useState(false); // New state for synchronization
  const [showCenterContent, setShowCenterContent] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility

  // Define a unique prefix for this app's local storage
  const localStoragePrefix = "rockPaperScissorsBonus_";

  // Initialize score state with the value retrieved from local storage or default to 0
  const [score, setScore] = useState(
    parseInt(localStorage.getItem(localStoragePrefix + "score")) || 0
  );

  useEffect(function () {
    // Change the page title when the component mounts
    document.title = "ROCK PAPER SCISSORS BONUS";
  }, []);

  function eventUserOption(option) {
    const computerOption = options[Math.floor(Math.random() * options.length)];
    setUserOption(option);

    setTimeout(function () {
      setComputerOption(computerOption);
    }, 2000);
  }

  useEffect(
    function () {
      if (userOption !== null && computerOption !== null) {
        setReadyToAnimate(true);

        if (userOption === computerOption) {
          setResult("Tie");
        } else if (
          ((userOption === "spock" || userOption === "rock") &&
            computerOption === "scissor") ||
          ((userOption === "scissor" || userOption === "lizard") &&
            computerOption === "paper") ||
          ((userOption === "paper" || userOption === "spock") &&
            computerOption === "rock") ||
          ((userOption === "rock" || userOption === "scissor") &&
            computerOption === "lizard") ||
          ((userOption === "paper" || userOption === "lizard") &&
            computerOption === "spock")
        ) {
          setResult("You Win");
          setTimeout(function () {
            // Update score and store it in local storage
            const updatedScore = score + 1;
            setScore(updatedScore);
            localStorage.setItem(localStoragePrefix + "score", updatedScore);
          }, 1000);
        } else {
          setResult("You Lose");
          setTimeout(function () {
            // Update score and store it in local storage
            const updatedScore = score - 1;
            setScore(updatedScore);
            localStorage.setItem(localStoragePrefix + "score", updatedScore);
          }, 1000);
        }

        // Trigger pulse effect after comparing options
        setTimeout(function () {
          setAnimate(true);
          setShowCenterContent(true);
        }, 1000);
      }
    },
    [userOption, computerOption]
  );

  //function to reset game
  function resetGame() {
    setUserOption(null);
    setComputerOption(null);
    setResult(null);
    setAnimate(false);
    setReadyToAnimate(false);
    setShowCenterContent(false);
  }

  // Function to handle modal toggle
  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <section className="container">
        <div className="header-wrapper">
          <div className="title">
            <img src="images/logo-bonus.svg" title="Rock Paper Scissors"></img>
          </div>
          <div className="score">
            <p className="score-title">SCORE</p>
            <p className="score-number">{score}</p>
          </div>
        </div>
        {!userOption && (
          <div className="content-wrapper">
            <img
              className="pentagon"
              src="images/bg-pentagon.svg"
              alt="Pentagon"
            ></img>
            <div className="options-col">
              <div
                className="border scissor"
                onClick={() => eventUserOption("scissor")}
              >
                <div className="border2">
                  <img src="images/icon-scissor.svg" alt="Scissor"></img>
                </div>
                <span></span>
              </div>
            </div>
            <div className="options-col-2">
              <div
                className="border spock"
                onClick={() => eventUserOption("spock")}
              >
                <div className="border2">
                  <img src="images/icon-spock.svg" alt="Spock"></img>
                </div>
                <span></span>
              </div>
              <div
                className="border paper"
                onClick={() => eventUserOption("paper")}
              >
                <div className="border2">
                  <img src="images/icon-paper.svg" alt="Paper"></img>
                </div>
                <span></span>
              </div>
            </div>
            <div className="options-col-3">
              <div
                className="border lizard"
                onClick={() => eventUserOption("lizard")}
              >
                <div className="border2">
                  <img src="images/icon-lizard.svg" alt="Lizard"></img>
                </div>
                <span></span>
              </div>
              <div
                className="border rock"
                onClick={() => eventUserOption("rock")}
              >
                <div className="border2">
                  <img src="images/icon-rock.svg" alt="Rock"></img>
                </div>
                <span></span>
              </div>
            </div>
          </div>
        )}
        {userOption && (
          <div className="result-wrapper">
            <div className="result-col">
              <div className="result-title">
                <h2
                  className={`user-picked ${
                    animate && readyToAnimate ? "move-left" : ""
                  }`}
                >
                  YOU PICKED
                </h2>
                <h2
                  className={`computer-picked ${
                    animate && readyToAnimate ? "move-right" : ""
                  }`}
                >
                  THE HOUSE PICKED
                </h2>
              </div>
              <div className="result-option">
                <div className="user-pending-col">
                  <div
                    className={`userOption ${
                      animate && readyToAnimate ? "move-left" : ""
                    }`}
                  >
                    <div
                      className={`resultBorder ${userOption} ${
                        result === "You Win" ? "pulse" : ""
                      }`}
                    >
                      <div className="resultBorder2">
                        {userOption === "rock" && (
                          <img src="images/icon-rock.svg" alt="Rock" />
                        )}
                        {userOption === "paper" && (
                          <img src="images/icon-paper.svg" alt="Paper" />
                        )}
                        {userOption === "scissor" && (
                          <img src="images/icon-scissor.svg" alt="Scissors" />
                        )}
                        {userOption === "lizard" && (
                          <img src="images/icon-lizard.svg" alt="Lizard" />
                        )}
                        {userOption === "spock" && (
                          <img src="images/icon-spock.svg" alt="Spock" />
                        )}
                      </div>
                      <span className="pulse-delay"></span>
                      <span className="pulse-delay"></span>
                      <span className="pulse-delay"></span>
                    </div>
                  </div>
                  <div
                    className={`pendingOption ${
                      animate && readyToAnimate ? "move-right" : ""
                    }`}
                  >
                    <div className="pendingBorder">
                      <div className="pendingBorder2"></div>
                    </div>
                  </div>
                  {computerOption && (
                    <div
                      className={`computerOption ${
                        animate && readyToAnimate ? "move-right" : ""
                      }`}
                    >
                      <div
                        className={`resultBorder ${computerOption} ${
                          result === "You Lose" ? "pulse" : ""
                        }`}
                      >
                        <div className="resultBorder2">
                          {computerOption === "rock" && (
                            <img src="images/icon-rock.svg" alt="Rock" />
                          )}
                          {computerOption === "paper" && (
                            <img src="images/icon-paper.svg" alt="Paper" />
                          )}
                          {computerOption === "scissor" && (
                            <img src="images/icon-scissor.svg" alt="Scissors" />
                          )}
                          {computerOption === "lizard" && (
                            <img src="images/icon-lizard.svg" alt="Lizard" />
                          )}
                          {computerOption === "spock" && (
                            <img src="images/icon-spock.svg" alt="Spock" />
                          )}
                        </div>
                        <span className="pulse-delay"></span>
                        <span className="pulse-delay"></span>
                        <span className="pulse-delay"></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {result && (
              <div
                className={`result ${
                  showCenterContent && readyToAnimate ? "show" : ""
                }`}
              >
                <p className="result-text">{result}</p>
                <button className="replay-button" onClick={resetGame}>
                  PLAY AGAIN
                </button>
              </div>
            )}
          </div>
        )}
        <div className="rules-wrapper">
          {/* Button to toggle modal visibility */}
          <button className="rules-button" onClick={toggleModal}>
            RULES
          </button>
          {/* Modal */}
          {showModal && (
            <div>
              <div className="dialog-backdrop" onClick={toggleModal}></div>
              <div id="modal" className="dialog">
                <div className="dialog-header">
                  <h1>RULES</h1>
                  <div className="dialog-img">
                    <img src="images/image-rules-bonus.svg" alt="Rules"></img>
                  </div>
                  <button
                    id="closeModal"
                    className="close-button"
                    onClick={toggleModal}
                  >
                    <img src="images/icon-close.svg" alt="Close"></img>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
