import './App.css';
import './App-mobile.css';
import Navbar from "./components/Navbar/Navbar";
import Quiz from "./components/Quiz/Quiz";
import {useState} from "react";
import ReactGA from 'react-ga';
import useAnalyticsEventTracker from "./useAnalyticsEventTracker";

const TRACKING_ID = "G-1KTYXD273E";
ReactGA.initialize(TRACKING_ID);


function App() {
    const [tutorial ,setTutorial] = useState(true);
    const gaEventTracker = useAnalyticsEventTracker('main-page');

  return (
    <div className="App">
      <Navbar setTutorial={setTutorial}/>
        {
            tutorial&&
            <div className="tutorial-container">
                <div className="tutorial-header">
                    Questionnaire de préparation  à l'entretien d'assimilation
                </div>
                <div className="tutorial-secondary">
                    plus de 100 questions recueillies grâce à des retours d'éxperiences
                </div>
                <div className="start-button"
                     onClick={()=>
                         {
                             gaEventTracker('start-quiz');
                             setTutorial(false);
                         }
                     }>
                    Commencer
                </div>
            </div>
        }
        {
            !tutorial&&<Quiz/>
        }
    </div>
  );
}

export default App;
