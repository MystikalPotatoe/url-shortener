'use strict';
import React from 'react';

const Instructions = function(props) {
    return (
        <div>
            <h2>Instructions</h2>
            <h3>Get new short url</h3>
            <p> Add your url to the <code>HOMEPAGE-URL/new/</code> url</p>
            <h3>Output</h3>
            <p>Valid requests will result in object returned. Use the 'shorturl' value and you will be redirected</p>
        </div>
    );
};

export default Instructions;