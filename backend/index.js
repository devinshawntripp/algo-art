const express = require('express')
// const bodyParser = require('body-parser')
const cors = require('cors')

// const db = require('./db')
// const bookRouter = require('./routes/book-router')
// const userRouter = require('./routes/user-router')
// const copyRouter = require('./routes/copy-router')
// const requestRouter = require('./routes/request-router')
const path = require('path');
require('dotenv').config();
//require('dotenv').config({ path: path.resolve(__dirname, '/home/STUDENTS/CSELibrary/unt-library-system/server/.env') });


const app = express()
const PORT = process.env.PORT || 8174

app.use(express.static(path.join(__dirname, '../client/build')))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors())
// app.use(bodyParser.json())
// app.use(express.json())

// db.on('error', console.error.bind(console, 'MongoDB connection error:'))



// app.get('/', (req, res) => {
// 	res.send('Hello People!')
// })


//set up routes
// app.use('/copies', copyRouter)
// app.use('/api', bookRouter)
// app.use('/user', userRouter)
// app.use('/request', requestRouter)


// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
//       if (err) {
//         res.status(500).send(err)
//       }
//   })
// })






/* Running a command Example */
// const execSync = require('child_process').execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules
//const output = execSync('dir', { encoding: 'utf-8' });  // the default is 'buffer'
//console.log('Output was:\n', output);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
