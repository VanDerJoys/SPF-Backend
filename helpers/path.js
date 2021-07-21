function choosePath(project_name){
    if (project_name == "Tchopetyamo") {
        return "../../model/Tchopetyamo/sheet";
    }else if (project_name == "Femme-fatale") {
        return "../../model/Femme-fatale/sheet"
    } else if(project_name == "Cub"){
        return "../../model/Tchopetyamo/sheet";
    }
}

module.exports = choosePath;