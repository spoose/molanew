import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Questionnaire from "./components/questionarie";
import Home from "./components/home";

const App = () => {
    return (
        <div>
            {/*<Navbar />*/}
            <Routes>
                <Route exact path="/" element={<Home />} />
                {/*<Route exact path="/" element={<RecordList />} />*/}
                {/*<Route path="/edit/:id" element={<Edit />} />*/}
                {/*<Route path="/create" element={<Create />} />*/}
                <Route path="/ques" element={<Questionnaire />} />
            </Routes>
        </div>
    );
};

export default App;