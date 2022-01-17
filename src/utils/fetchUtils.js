export const fetchFile = (fileName) => {
    return fetch(fileName).then(function(response) {
        return response
    }).then(function(data) {
        return data.text()
    })
};
