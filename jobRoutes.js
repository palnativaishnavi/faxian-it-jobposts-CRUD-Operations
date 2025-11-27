import express from 'express'
import mysql from "mysql";

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
    console.log("Connected to MySQL Database for Jobs");
  }
});


const router = express.Router();


// 1. Create Job Post 
router.post('/jobs/add',(req,res)=>{
    const{
        job_title,
    salary,
    role,
    experience,
    status,
    work_auth,
    location,
    required_skills,
    preferred_skills,
    job_type,
    job_description,
    responsibilities,
    } = req.body; 

    const sql=`INSERT INTO job_postings(job_title,salary, role, experience, status, work_auth, location, required_skills,
    preferred_skills, job_type, job_description, responsibilities) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
        sql,[
      job_title,
      salary,
      role,
      experience,
      status,
      work_auth,
      location,
      required_skills,
      preferred_skills,
      job_type,
      job_description,
      responsibilities,
        ],
        (err,result)=>{
            if(err) return res.status(500).json({message:"Error inserting job",error:err});
            res.status(201).json({message:"Job Added Successfully",id:result.insertId});
                console.log("Job Add Successfully")
        }
    );

})

// **********************************
// ***************************************************

// 2. Get All Job Posts

router.get("/jobs/getAll",(req,res)=>{
    const sql="SELECT * FROM job_postings";

    db.query(sql,(err,data)=>{
        if(err) return res.status(500).json({message:"Error Fetching Jobs",error:err});
        res.json(data);
    
    })
})

// 3. Get Single Job Post

router.get("/jobs/:id",(req,res)=>{
    const {id} = req.params;
    const sql = `Select * FROM job_postings WHERE post_id=${id}`;
    db.query(sql,(res,[id],(err,data)=>{
        if(err) return res.status(500).json({message:"Error Fetching Single Job",error:err});

        if(data.length===0){
            return res.status(404).json({message:"Job not found"})
        }
        res.json(data[0]);

    }))

})


// **************************
// ***************************************

// 4. Delete Job Post

router.delete("/job/:id",(req,res)=>{
    const {id} = req.params;
    const sql = `Delete from job_postings where post_id= ${id}`;

    db.query(sql,[id],(err,result)=>{
        if (err) return res.status(500).json({message:"Error Deleting Job",error:err})
            res.json({message:"Job Deleted Successfully"})
        console.log("Deleted Sussussfully");
    })

})

// ****************************************
// ***************************************************

// 5. Update Job Post
router.put("/job/:id", (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const sql = "UPDATE job_postings SET ? WHERE post_id = ?";

  db.query(sql, [updatedData, id], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error Updating Job", error: err });

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Job not found" });

    res.json({ message: "Job updated successfully" });
    console.log("Updated Successfully")
  });
});

// ***************** Four CURD Opertions Completed ****************
// *********************************************************************

// 6. Get Status of a Single Job

router.get("/job/:id/status", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT status FROM job_postings WHERE post_id = ?";

  db.query(sql, [id], (err, data) => {
    if (err)
      return res.status(500).json({
        message: "Error fetching job status",
        error: err,
      });

    if (data.length === 0)
      return res.status(404).json({ message: "Job not found" });

    res.json({
      post_id: id,
      status: data[0].status,
    });
  });
});


// 7. Get count of active job postings

router.get("/jobs/active/count", (req, res) => {
  const sql = `SELECT COUNT(*) AS active_count FROM job_postings WHERE status = 'Active'`;

  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error Fetching Active Job Count", error: err });
    }

    res.json({ active_jobs: data[0].active_count });
  });
});

// 8. Get count of Closed job postings
router.get("/jobs/closed/count", (req, res) => {
  const sql = `SELECT COUNT(*) AS closed_count FROM job_postings WHERE status = 'Closed'`;

  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error Fetching Closed Job Count", error: err });
    }

    res.json({ closed_jobs: data[0].closed_count });
  });
});

// 9. Get All count of job postings
router.get("/jobs/all/count", (req, res) => {
  const sql = `SELECT COUNT(*) AS allJob FROM job_postings`;

  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error Fetching All Job Count", error: err });
    }

    res.json({ all_jobs: data[0].allJob });
  });
});

// 10. Get Decending Order Job posts

router.get("/jobs/getAll/desc",(req,res)=>{
    const sql = `select * From job_postings order by post_id DESC`;
    db.query(sql,(err,data)=>{
        if(err) return res.status(500).json({message:"Descending Order Job Posts",error:err});

        res.json(data);

    })

})

export default router;
