import './App.css';
import {Home, Vitality, StockAnalysis, Sentiment} from './Pages'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import {SocketContext, Socket} from './Context/socket'
import Header from './Components/Header'

function App() {
  return (
      <SocketContext.Provider value={Socket}>
        <BrowserRouter>
          <Header/>
          <div className="App">
            <Switch>
              <Route path="/Vitality" exact component={Vitality} />
              <Route path="/StockAI" exact component={StockAnalysis}/>
              <Route path="/Sentiment" exact component={Sentiment}/>
              <Route exact path="/" component={Home}/>
            </Switch>
          </div>
        </BrowserRouter>
      </SocketContext.Provider>

  );
}

export default App;
