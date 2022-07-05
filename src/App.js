import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import './App.css';

function App() {
  // console.log('rendering app')

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
