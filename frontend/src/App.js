import './App.css';
import Home from './Pages/Home'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './Components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
