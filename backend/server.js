// const fs = require('fs');
// const crypto = require('crypto');
// const path = require("path");
// const filepath = path.join(__dirname, "../data.json");
// const sendMail = require("./mail/mail");
// const http = require('http');


// const server = http.createServer((req, res) => {

//     if (req.method === 'GET' && req.url === "task/") {
//         try {
//             const data = fs.readFileSync(filepath, 'utf8');
//             const { Task } = JSON.parse(data);
//             return res.send(Task)

//         } catch (err) {
//             console.log(`Error reading file from disk: ${err}`);
//             res.send(err)
//         }
//     }
//     else if (req.method === 'POST' && req.url === 'task/create/:userID') {
//         try {
//             // read the file
//             fs.readFile(filepath, 'utf8', async (err, data) => {

//                 if (err) {
//                     console.log(`Error reading file from disk: ${err}`);
//                     res.send({ message: err })
//                 } else {
//                     req.body.userId = req.params.userID
//                     req.body.startTime = Date.now();
//                     req.body.taskId = crypto.randomUUID();
//                     const databases = JSON.parse(data);
//                     let singleuser;

//                     for (let i = 0; i < databases.User.length; i++) {


//                         if (databases.User[i].userId == req.params.userID) {
//                             singleuser = databases.User[i];
//                             break;
//                         }
//                     }

//                     databases.Task.push(req.body);

//                     await sendMail(singleuser, req.body).then(result => console.log("email send", result))
//                         .catch((err) => console.log(err.message))



//                     // write new data back to the file

//                     fs.writeFile(filepath, JSON.stringify(databases, null, 4), (err) => {
//                         if (err) {
//                             console.log(`Error writing file: ${err}`);
//                             return res.send({ message: err.message })
//                         }
//                     });


//                     return res.send(req.body)

//                 }

//             });
//         } catch (error) {
//             return res.send({ message: error.message })
//         }
//     }
//     else if (req.method === "GET" && req.url === "task/:userId") {
//         try {
//             const data = fs.readFileSync(filepath, 'utf8');
//             let { Task } = JSON.parse(data);
//             let result = [];
//             for (let i = 0; i < Task.length; i++) {
//                 if (Task[i].userId == req.params.userId) {
//                     result.push(Task[i]);
//                 }
//             }
//             return res.send(result)
//         } catch (error) {
//             return res.send({ message: error.message })
//         }

//     } else if (req.url === "task/todo/:taskId" && req.method === "GET") {
//         try {
//             const data = fs.readFileSync(filepath, 'utf8');
//             let { Task } = JSON.parse(data);

//             for (let i = 0; i < Task.length; i++) {
//                 if (Task[i].taskId == req.params.taskId) {
//                     return res.send(Task[i]);
//                 }
//             }

//         } catch (error) {
//             return res.send({ message: error.message })
//         }
//     }
//     else if (req.method === "DELETE" && req.url === "task/:taskId") {
//         try {
//             // read the file
//             fs.readFile(filepath, 'utf8', (err, data) => {

//                 if (err) {
//                     console.log(`Error reading file from disk: ${err}`);
//                     res.send({ message: err })
//                 } else {
//                     let update = null;

//                     const databases = JSON.parse(data);
//                     for (let i = 0; i < databases.Task.length; i++) {
//                         if (databases.Task[i].taskId == req.params.taskId) {
//                             update = databases.Task.splice(i, 1);
//                             // console.log(databases, databases.Task)
//                             break;
//                         }
//                     }
//                     // write new data back to the file
//                     fs.writeFile(filepath, JSON.stringify(databases, null, 4), (err) => {
//                         if (err) {

//                             console.log(`Error writing file: ${err}`);
//                             return res.send({ message: err.message })
//                         }
//                     });
//                     console.log("yatatak", update)
//                     return res.send(update[0])
//                 }

//             });

//         } catch (error) {
//             return res.send({ "message": error.message })
//         }
//     }
//     else if (req.method === 'PATCH' && req.url === "task/:taskId") {
//         try {
//             fs.readFile(filepath, 'utf8', (err, data) => {

//                 if (err) {
//                     console.log(`Error reading file from disk: ${err}`);
//                     res.send({ message: err })
//                 } else {
//                     let update = null;
//                     const databases = JSON.parse(data);
//                     for (let i = 0; i < databases.Task.length; i++) {
//                         if (databases.Task[i].taskId == req.params.taskId) {
//                             // update = databases.Task.splice(i, 1);
//                             databases.Task[i].expiry = req.body.expiry
//                             update = databases.Task[i]
//                             console.log('databases.Task[i]', databases.Task[i])
//                             // console.log(databases, databases.Task)
//                             break;
//                         }
//                     }
//                     // write new data back to the file
//                     fs.writeFile(filepath, JSON.stringify(databases, null, 4), (err) => {
//                         if (err) {

//                             console.log(`Error writing file: ${err}`);
//                             return res.send({ message: err.message })
//                         }
//                     });
//                     return res.send(update)
//                 }

//             });

//         } catch (error) {
//             return res.send(error)
//         }
//     }
//     else if(req.method === 'GET' && req.url === 'user/'){
//         try {

//             const data = fs.readFileSync(filepath, 'utf8');
//             // parse JSON string to JSON object
//             const { User } = JSON.parse(data);
    
//             return res.send(User)
    
//         } catch (err) {
           
//             return res.send(err)
//         }
//     } 
//     else  if(req.method === 'DELETE' && req.url === 'user/:id'){
//         try {
//             // read the file
//             fs.readFile(filepath, 'utf8', (err, data) => {
    
//                 if (err) {
//                     console.log(`Error reading file from disk: ${err}`);
//                     res.send({ message: err })
//                 } else {
//                     let update = null;
//                     const databases = JSON.parse(data);
//                     for (let i = 0; i < databases.User.length; i++) {
//                         if (databases.User[i].userId == req.params.id) {
//                             update = databases.User.splice(i,1);
//                             // console.log(databases, databases.User)
//                             break;
//                         }
//                     }
//                     // write new data back to the file
//                     fs.writeFile(filepath, JSON.stringify(databases, null, 4), (err) => {
//                         if (err) {
    
//                             console.log(`Error writing file: ${err}`);
//                             return res.send({ message: err.message })
//                         }
//                     });
//                     return res.send(update)
//                 }
    
//             });
//         } catch (error) {
//             return res.send(err)
//         }
//     }
//     else  if(req.method === 'GET' && req.url === 'user/:id'){
//         try {
//             const data = fs.readFileSync(filepath, 'utf8');
//             let { User } = JSON.parse(data);
//             for (let i = 0; i < User.length; i++) {
//                 if (User[i].userId == req.params.id) {
//                     return res.send(User[i])
//                 }
//             }
//        return res.send({})
//         } catch (error) {
//             return res.send(err)
//         }
//     }
//     else if (req.method === 'POST' && req.url === '/login') {
//         try {
//             const data = fs.readFileSync(filepath, 'utf8');
//             const { User } = JSON.parse(data);
//             for (let i = 0; i < User.length; i++) {
//                 if (User[i].email == req.body.email && User[i].password == req.body.password) {
//                     return res.end({
//                         name: User[i].name,
//                         email: User[i].email,
//                         mobile: User[i].mobile,
//                         userId: User[i].userId,

//                     })
//                 }

//             }
//             return res.end({ message: "Password or email not match" })
//         } catch (error) {
//             return res.end({ message: error.message })
//         }
//     }
//     else if (req.method === 'POST' && req.url === "/register") {
//         try {
//             const data = fs.readFileSync(filepath, 'utf8');
//             let { User } = JSON.parse(data);
//             for (let i = 0; i < User.length; i++) {
//                 if (User[i].mobile == req.body.mobile) {
//                     return res.send({ message: "User is already register with same mobile Number" })
//                 }
//             }

//             // reading json data
//             fs.readFile(filepath, 'utf8', (err, data) => {


//                 if (err) {
//                     console.log(`Error reading file from disk: ${err}`);
//                     res.send({ message: err })
//                 } else {

//                     req.body.userId = crypto.randomUUID();

//                     const databases = JSON.parse(data);
//                     databases.User.push(req.body);

//                     // write new data back to the file
//                     fs.writeFile(filepath, JSON.stringify(databases, null, 4), (err) => {
//                         if (err) {

//                             console.log(`Error writing file: ${err}`);
//                             return res.send({ message: err.message })
//                         }
//                     });
//                     return res.send({
//                         name: req.body.name,
//                         email: req.body.email,
//                         mobile: req.body.mobile,
//                         userId: req.body.userId
//                     })
//                 }


//             })
//         }
//         catch (error) {
//             console.log('error', error)
//             return res.send({ message: error.message })
//         }
//     }


// })


// server.listen(3008, function() {
//     console.log("Listening on port 3008");
// });