import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
  import {HomePage} from './views/HomePage'
  import { PatientDetail } from "./views/PatientDetail"

export default function AppRoutes() {

    return (
        <Router>
            <Routes>
                <Route 
                    path="*"
                    element={
                        <HomePage/>
                    }
                />
                <Route
                    path="/patient/:id"
                    element={
                        <PatientDetail/>
                    }
                />
            </Routes>
        </Router>
    )
}