import './App.css';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import Register from './util/Registration/Register';
import Attendance from './util/Attendance/Attendance';
import FirstPage from './util/FirstPage/FirstPage';

function App() {
  return (
    <div className="App">   
           <BrowserRouter>
              <Routes>
                    <Route path='/'  element={<FirstPage />}/>
                    <Route path='/register'  element={<Register />}/>
                    <Route path='/attendance'  element={<Attendance />}/>
              </Routes>
             
          </BrowserRouter>
    </div>
  );
}

export default App;
