let arr = [1, 2, 3, 4, 5, 6];
let target = 10;

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
        for (let k = 0; k < arr.length; k++) {
            if (arr[i] + arr[j] + arr[k] === target) {
                console.log(`${arr[i]} + ${arr[j]} + ${arr[k]} = ${target}`);
            }
        }
    }
}
