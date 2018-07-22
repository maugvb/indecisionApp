import React from 'react';
import Option from './option';

const Options = (props) => (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove all</button>
            {props.options.length == 0 && <p>Please add an option</p>}
            <ol>
                {
                    props.options.map((option) => (
                        <Option
                            key={option}
                            value={option}
                            handleDeleteOption={props.handleDeleteOption}
                        />
                    ))
                }
            </ol>
        </div>
);


export default Options;