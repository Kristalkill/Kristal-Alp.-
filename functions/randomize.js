exports.randomize = function(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
};


использование:
randomize(10, 30)
