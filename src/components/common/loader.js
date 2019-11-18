import React from 'react';

function Loader(props) {
    if(props.show){
        return <div><p>Loading</p></div>
    }
    return <div></div>;
};

export default Loader;