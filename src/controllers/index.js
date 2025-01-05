function getIndex(req, res) {
    res.sendFile('path/to/your/index.html'); // Adjust the path as necessary
}

module.exports = {
    getIndex
};