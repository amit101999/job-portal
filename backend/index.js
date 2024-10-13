const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDb = require('./utils/db')
const userRoute = require('./Routes/userRoutes')
const companyRoute = require('./Routes/companyRoutes')
const jobRoute = require('./Routes/jobsRoutes')
const applicantRoute = require('./Routes/applicationRoute')
const dotenv = require('dotenv')

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const options = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(options))

const port = process.env.PORT || 3000;

app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/job', jobRoute)
app.use('/api/v1/application', applicantRoute)

app.listen(port, () => {
    connectDb()
    console.log(`Server running on port ${port}`);
});