import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import AuthRoot from './pages/auth';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AuthRoot /> }></Route>
      </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App
