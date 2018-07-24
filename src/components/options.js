import React from 'react';
import Option from './option';

const Options = (props) => (
        <div>
            <div className='widget-header'>
                <h3 className='widget-header__title'>Your Options</h3>
                <button onClick={props.handleDeleteOptions} className='button button--link'>Remove all</button>
            </div>
            {props.options.length == 0 && <p className='widget-message widget'>Please add an option</p>}
                {
                    props.options.map((option, index) => (
                        <Option
                            key={option}
                            value={option}
                            count={index+1}
                            handleDeleteOption={props.handleDeleteOption}
                        />
                    ))
                }
        </div>
);


export default Options;