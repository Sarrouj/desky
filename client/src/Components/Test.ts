const double = (x : number, y: number) => x * y;
const res = double(2, 1);

// default params value 
function greet(person : string =  "zayd") {
    return `Hello ${person}`;
}

