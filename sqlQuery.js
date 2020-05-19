var sqlQuery = function (action) {
    //select the alignments table
    //then select the required action and apply it into the mate1_position on the same reference_id 
    var sql = "SELECT reference_id," + action + "(mate1_position) FROM 'alignments' GROUP BY reference_id";
    return sql;
}

//export the function
module.exports = sqlQuery;