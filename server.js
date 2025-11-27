import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import jobRoutes from "./jobRoutes.js"
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// allow React frontend to communicate
app.use(
  cors({
    origin: ["http://localhost:3036","http://localhost:3000"], // React app URL
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(cookieParser());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "faxianit",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});

const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json({Message:"We need token please provide it."})
    }else{
        jwt.verify(token,"our-jsonwebtoken-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Message:"Authentication Error."})
            }else{
                req.name=decoded.name
                next();
            }   
        })
    }
}


app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ Status: "Succuss", name: req.name });
});

// Logout api 

app.get("/logout",(req,res)=>{
    res.clearCookie("token",{
        httpOnly: true,
         secure: false,
          sameSite: "lax",
          path:"/",
    });
    return res.json({ Status: "Success" });

})


// API route for admin login
app.post("/admin-login", (req, res) => {
  const sql = "SELECT * FROM admins WHERE email=? AND password=?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error("MySQL error:", err);
      return res.status(500).json({ Message: "Server Side Error" });
    }

    if (data.length > 0) {
      const name = data[0].name;
      const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        httpOnly: true, 
        secure: false, // set true if using https
        sameSite: "lax",
         path: "/" 
      });

      return res.json({ Status: "Success" });
    } else {
      return res.json({ Message: "Incorrect Credentials" });
    }
  });
});

// ************************************
// ********************************************************

app.use("/api/",jobRoutes);




// Start server
app.listen(8081, () => {
  console.log("Server running on port 8081...");
});
