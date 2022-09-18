import './Quiz.css';
import './Quiz-mobile.css';
import {useEffect, useState} from "react";
import right from "../../ressources/image/right.png";
import left from "../../ressources/image/left.png";
import db from "../../firebase";
import { collection, addDoc,getDocs } from "firebase/firestore";
import {questions} from "../../data_mock";
import useAnalyticsEventTracker from "../../useAnalyticsEventTracker";


function Quiz() {
    const gaEventTracker = useAnalyticsEventTracker('Quiz');
    const [questionNumber,setQuestionNumber] = useState(0);
    const [showResponse, setShowResponse] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [image, setImage] = useState(false);

    const toggleImage = ()=>{
        gaEventTracker(`zoming`);
        setImage(!image);
    }


    const fetchQuestion = async() => {
        const querySnapshot = await getDocs(collection(db, "questions"));
        const questions = [];
        querySnapshot.forEach((doc) => {
            questions.push(doc.data());
        });
        setQuestions(questions);
    }


    useEffect(()=>{
        fetchQuestion();
    },[])


    const previousQuestion = async () =>{
        setShowResponse(false);
        setQuestionNumber(questionNumber-1);
    }

    const nextQuestion = () =>{
        gaEventTracker(`question ${questionNumber+1}`);
        setShowResponse(false);
        setQuestionNumber(questionNumber+1);
    }

    const showPreviousButton = () => {
        return questionNumber>0;
    }

    const showNextButton = () => {
        return questionNumber<questions.length-1;
    }

    return (
        questions.length>0 &&
                <div className="quiz-container">
                    <div className="quiz-question-container">
                        <div className="quiz-question">
                            { questions[questionNumber].question }
                        </div>
                    </div>

                    {
                        showResponse &&
                        <div className="quiz-response-container">
                            <div className="quiz-response">
                                { questions[questionNumber].response }
                            </div>
                            {   questions[questionNumber].response2 &&
                                <div className="quiz-response">
                                    { questions[questionNumber].response2 }
                                </div>
                            }
                            {   questions[questionNumber].response3 &&
                                <div className="quiz-response">
                                    {questions[questionNumber].response3}
                                </div>
                            }
                            {   questions[questionNumber].response4 &&
                                <div className="quiz-response">
                                    {questions[questionNumber].response4}
                                </div>
                            }
                            { questions[questionNumber].img &&
                                <div className={image?"quiz-response-image-full":"quiz-response-image"} onClick={toggleImage}>
                                    <img className="quiz-image"  src={questions[questionNumber].img} alt="left" />
                                </div>
                            }
                        </div>
                    }
                    {
                        !showResponse &&
                        <div className="quiz-response-button"
                             onClick={()=>setShowResponse(true)}>
                            Réponse
                        </div>
                    }
                    <div className="question-controller">
                        {showPreviousButton() &&
                            <img className="controller" src={left} alt="left" onClick={previousQuestion}/>
                        }
                        {!showPreviousButton() &&
                            <div className="controller"/>
                        }
                        <div className="quiz-question-number">
                            { questionNumber }
                        </div>
                        {showNextButton() &&
                            <img className="controller" src={right} alt="right" onClick={nextQuestion}/>
                        }
                        {!showNextButton() &&
                            <div className="controller"/>
                        }
                    </div>

                </div>
    );
}

export default Quiz;

