const express = require('express')
const connect = require('./Dbconfig/db')
const cors=require('cors')
const app = express()
app.use(express.json())


app.use(cors())

//DATA BASE CONNECTION
connect()





//DEFINE ROUTES
app.use('/api/login',require('./routes/login'))
app.use('/api/register',require('./routes/register'))
app.use('/api/declaration',require('./routes/declaration'))
app.use('/api/check',require('./routes/check'))







const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log('SERVER IS RUNNING')
})