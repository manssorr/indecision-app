import React from 'react';

// Option -> Option Component here
const Option = (props) => (
        <div className="option">
            <p className="option__text">{props.count}. {props.optionText}</p>
            
            <button
                className="button button--link"
                onClick={(e) => { props.handleDeleteOption(props.optionText) }}
            >
                Remove
            </button>
        </div>
);

export { Option } ;