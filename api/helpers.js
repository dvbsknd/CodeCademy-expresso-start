module.exports.parameterise = function(object) {
    const entries = Object.entries(object);
    let params = {};
    entries.map((entry) => {
        params[`$${entry[0]}`] = entry[1];
    });
    return params;
};
