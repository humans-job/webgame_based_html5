class MusicScoreGenerator{
    static readFile(filePath){
        return fetch(filePath)
            .then(response => response.text())
            .then(data => {
                // 处理文件并把数据传入二维数组中
                let rows = data.split(/[\r?\n]/)
                rows = rows.filter(row => row.trim() !== '')
                let twoArray = []
                rows.forEach(row => {
                    const columns = row.split(' ')
                    twoArray.push(columns)
                })

                // 数据类型转换
                for (let i = 0;i < twoArray.length;i++){
                    for (let j = 0;j < twoArray[0].length;j++){
                        twoArray[i][j] = Number(twoArray[i][j])
                    }
                }
                return twoArray
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
