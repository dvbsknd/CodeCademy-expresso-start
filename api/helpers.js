module.exports.parameterise = function(object) {
    const entries = Object.entries(object);
    let params = {};
    entries.map((entry) => {
        params[`$${entry[0]}`] = entry[1];
    });
    return params;
};

module.exports.validate = function(object, type) {
    switch(type) {
        case 'Employee':
            console.log(`${type} is valid`);
            return (object.name && object.position && object.wage) ? true : false;
            break;
        default:
            return false;
    }
}
