let express = require("express")

let app = express();

const port = process.env.PORT || 4001;

app.use(express.json());

let authRoutes = require("./routes/authRoutes")
let messageRoutes = require("./routes/messageRoutes")
app.use("/", authRoutes);
app.use("/", messageRoutes);



app.listen(port, () => {
    console.log("Web server listening on port ", port)
})