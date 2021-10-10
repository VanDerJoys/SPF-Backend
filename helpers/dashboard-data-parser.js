function dataParser(data){
    let dataDashboard = [];
    data.forEach(item => {
        dataDashboard.push([item.post.name, item.order]);
    });
    return dataDashboard;
}

module.exports = dataParser;