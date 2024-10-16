import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header/Header.tsx";
import Home from "./pages/home/Home.tsx";
import Quiz from "./pages/quiz/Quiz.tsx";

function App() {
  return (
    <Router>
      <Header />
      <div className="p-4 bg-nearWhite">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="quiz" element={<Quiz />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
