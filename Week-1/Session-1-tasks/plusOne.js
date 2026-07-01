var plusOne = function(digits) {
    let x = "";
    for (d of digits){
        x += d;}
    x = parseInt(x) + 1;
    let final = [];
    for (let i = 0; i < x.toString().length; i++){
        final.push(parseInt(x.toString()[i]));
    }
    return final;
};

// function plusOne(digits) {
//     let x = digits.join('');
//     return String(Number(x) + 1).split('').map(Number);
// }