// generate 100 users with the field role set to true
const User = require("../db/schemas/users.js");
const randomStringGenearator = function (length = 20) { 
    for (var i = 0, randomString = ''; i < length; i++) 
        randomString += Math.random().toString(36).substr(2, 1);
    return randomString;
}
for (let i = 0; i < 100; i++){
    let roleValue = Math.random() > 0.5 ? true : false;
    let degreeGot = roleValue ? randomStringGenearator(10) : null;
    User.create({
        name: randomStringGenearator(10),
        email: randomStringGenearator(10) + "@gmail.com",
        password: randomStringGenearator(10),
        phone: randomStringGenearator(10),
        role: roleValue,
        degree : degreeGot,
        experience: 0
    })
    .then((user) => {
        console.log(user);
    })
}