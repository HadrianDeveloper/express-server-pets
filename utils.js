const { readdir } = require("fs/promises")


exports.createId = (folderName) => {
    const prefix = folderName === 'owners' ? 'o' : 'p';
    return readdir(`${__dirname}/data/${folderName}`)
        .then((fileList) => {
            let numArr = fileList.map((file) => parseInt(file.slice(1, -5)))
            numArr.sort((a, b) => a - b).reverse();
            return `${prefix}${numArr[0] + 1}`
        });
};
