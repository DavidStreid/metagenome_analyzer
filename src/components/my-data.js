import React, { useState } from "react";
import PieChart from "./graph";
import Card from "../resources/swab_n_seq_card.png";
import {getRecordResults} from "../services/resultsService";
import Loader from './common/loader';
function MyData(props) {
    const [id, setId] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const onChange = (evt) => {
        const val = evt.target.value;
        setId(val);
    };

    const handleSubmit = (evt) => {
        setLoading(true);
        getRecordResults(id)
            .then((data) => setData(data))
            .catch(console.log)
            .finally(() => setLoading(false));
        evt.preventDefault();
    };

    if(data.length > 0) return <div>
        <h1 className={'text-align-center'}>Sample {id}</h1>
        <PieChart
            sliceList={data}
            sampleId={''}
            width={800}
            height={550}
            showlegend={true}/>
    </div>;
    return <div>
        <p>Please enter the id found on your swabNseq card</p>
        <div className={'sid-card pos-rel'}>
            <form onSubmit={handleSubmit}
                  className={'id-entry pos-abs'}>
                <input type="text" name="name" className="id-entry-input" onChange={onChange}/>
                <input type="submit" value="Submit" />
            </form>
            <img className={'sid-card inline-block'}
                 src={Card}/>
        </div>
        <Loader show={loading}/>
    </div>
}

export default MyData;