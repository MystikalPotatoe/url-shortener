'use strict';
import React from 'react';

const MainContainer = function(props){
    
    const outputStyles = {
        fontFamily:'Raleway, sans-serif',
        margin: '0 auto',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        background: '#B5E1E3',
        padding:'30px',
        boxSizing: 'border-box',
        boxShadow: '5px 5px 5px #333'
    };
    
    return (
        <div style={ outputStyles }>
            {props.children}
        </div>
    );
};

export default MainContainer;
