import React from 'react';

const Option = (props) => {
    return (
        <li>
            {props.value}
            <button onClick={() => { props.handleDeleteOption(props.value) }}
            >
                Remove
            </button>
        </li>
    );
};

export default Option;