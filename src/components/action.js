import React from 'react';

const Action = (props) => {
    return (
        <div>
            <p>Test</p>
            <button onClick={props.select} disabled={!props.hasOptions}>
                What should i do?
            </button>
        </div>
    );
};

export default Action;