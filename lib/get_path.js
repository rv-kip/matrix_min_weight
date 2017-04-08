function getPath(matrix, rowPos, colPos, path, path_weight_map){
    var columnsCount = matrix[0].length,
        rowsCount = matrix.length;

    if (rowPos == rowsCount || colPos == columnsCount) {
        if (path.length === rowsCount) {
            weight = path.reduce(function(a, b) { return a + b; }, 0);
            path_weight_map[weight] = path;
        }
        return;
    }

    path = path.concat([matrix[rowPos][colPos]]);
    if (colPos >= 1) {
        getPath(matrix, rowPos + 1, colPos - 1, path, path_weight_map);
    }

    if (colPos < columnsCount) {
        getPath(matrix, rowPos + 1, colPos + 1, path, path_weight_map);
    }
    getPath(matrix, rowPos + 1, colPos, path, path_weight_map);
}
module.exports = getPath;
