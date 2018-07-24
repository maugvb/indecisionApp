import React from 'react';

const Option = (props) => (
    
        <div className='option'>
            <p className='option__text'>{props.count}. {props.value}</p>
            <button onClick={() => { props.handleDeleteOption(props.value) }}
            className='button button--link'
            >
                Remove
            </button>
        </div>
);


export default Option;