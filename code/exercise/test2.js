/**
 * @param {number[][]} grid
 * @return {number}
 */

var maxAreaOfIsland = function(grid) {
    let len1 = grid.length;
    if(!len1) return 0;
    let len2 = grid[0].length;
    if(!len2) return 0;
    let dfs = function(i, j, grid, len1, len2){
        if(i >= len1 || j >= len2 || i < 0 || j < 0 || grid[i][j] === 0) return 0;
        grid[i][j] = 0;
        return 1 + dfs(i, j - 1, grid, len1, len2) + dfs(i, j + 1, grid, len1, len2) + dfs(i + 1, j, grid, len1, len2) + dfs(i - 1, j, grid, len1, len2);
    }
    let max = 0;
    for(let i = 0; i < len1; i++){
        for(let j = 0; j < len2; j++){
            let t = dfs(i, j, grid, len1, len2);
            if(t > max) max = t;
        }
    }
    return max;
};
console.log(maxAreaOfIsland([[0, 1]]))