import React, {useState} from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import './App.css';
import MyData from './components/my-data.js';
import AllGraphs from './all-graphs.js';
import Description from './components/description.js';
import data from './test_data/dist__hits_gte30_blastn_out_06000_GB_111.bam_vs_nt_output';
import Logo from './resources/igo-logo-partial.png';
import { getAllResults, getRecordResults } from "./services/resultsService";
import config from './config.js';

function App() {
    const [summary, setSummary] = useState([]);
    const [results, setResults] = useState([]);

    const allData = getAllResults()
        .then((resp) => {
            const s = resp.summary;
            const r = resp.results;
            if(s) setSummary(s);
            if(r) setResults(r);
        })
        .catch(console.log);

  return (
    <div>
        <Router>
            <header className="App-header">
                <div className={"margin-left-40"}>
                    <Link className={"header-tab"} to={`${config.root}`}>
                        <p className={'white'}>Home</p>
                    </Link>
                    <Link className={"header-tab"} to={`${config.root}/my-data`}>
                        <p className={'white'}>My Data</p>
                    </Link>
                    <Link className={"header-tab"} to={`${config.root}/description`}>
                        <p className={'white'}>Description</p>
                    </Link>
                </div>
                <div className={'logo-container'}>
                    <p className={'logo-text inline-block'}>Integrated Genomics Operations</p>
                    <img className={'logo inline-block'}
                         src={Logo}/>
                </div>
            </header>
            <div className={"body-container margin-top-15 padding-hor-5per"}>
                <Switch>
                    <Route exact path={`/${config.root}`}
                           render={(props) =>
                               <AllGraphs {...props}
                                          graphs={results}
                                          summaryGraph={summary}/>
                           }
                    />
                    <Route
                        path={`/${config.root}my-data`}
                        render={(props) => <MyData {...props}
                                                   myData={data.selected}
                                                   sampleName={'1006'}/>}
                    />
                    <Route path={`/${config.root}description`}
                           render={(props) =>
                               <Description/>
                           }
                    />
                </Switch>
            </div>
        </Router>

    </div>
  );
}

export default App;
