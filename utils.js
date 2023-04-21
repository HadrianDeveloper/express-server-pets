const { readdir } = require("fs/promises")


exports.createId = () => {
    return readdir(`${__dirname}/data/owners`)
        .then((fileList) => {
            let numArr = fileList.map((file) => parseInt(file.slice(1, -5)))
            numArr.sort((a, b) => a - b).reverse();
            return `o${numArr[0] + 1}`
        });
}