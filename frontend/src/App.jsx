import Header from "./Components/Header/Header"
import Map from "./Components/Map/Map"
import Main from "./Components/Main/Main";
import Stats from "./Components/Stats/Stats";
import Predict from "./Components/Predict/Predict";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Main />
            </div>
          }
        />
        <Route 
          path="/map"
          element={
            <div>
              <Map />
            </div>
          }
        />
        <Route 
          path="/stats"
          element={
            <div>
              <Stats />
            </div>
          }
        />
        <Route
          path="/predict"
          element={
            <div>
                <Predict />
            </div>
          }
          />
      </Routes>
    </Router>
  );
}

export default App;
