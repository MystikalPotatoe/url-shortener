const urlExtractor = (fullString) => {
    if(typeof fullString !== 'string') return {};
    let start = fullString.indexOf('http');
    let output = {};
    output.path = start === -1 ? fullString : fullString.slice(0,start);
    output.url = start === -1 ? null : fullString.slice(start);
    return output;
};

export default urlExtractor;