function greaterThan(array, value) {

    // return array.filter(item => item > value);

    let greaterThanArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] > value) {
            greaterThanArray.push(array[i]);
        }
    }
    return greaterThanArray;
}