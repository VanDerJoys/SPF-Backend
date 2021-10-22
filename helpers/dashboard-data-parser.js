function dataParser(data){
    let dataDashboard = [];
    data.forEach(item => {
        dataDashboard.push([item.post.name, item.calls]);
    });
    return dataDashboard;
}

module.exports = dataParser;