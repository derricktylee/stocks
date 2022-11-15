
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import StockOverviewPage from './pages/StockOverviewPage';
import StockDetailsPage from './pages/StockDetailsPage';
import { AppProvider } from './Context';


function App() {
  return (
    <AppProvider>
    <main className='container'>
      <Router>
        <Routes>
          <Route exact path='/' element={<StockOverviewPage/>}/>
          <Route path='/detail/:symbol' element={<StockDetailsPage/>}/>
        </Routes>
      </Router>
    </main>
    </AppProvider>
  )
}

export default App;
