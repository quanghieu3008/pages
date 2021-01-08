
// import React, { useEffect, useState } from "react"

// import { Modal, Form, Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';

// import Menu from "../components/menu";
// import callApiGet from '../fetchAPI/getAPI'
// import "../style/blog.css"
// import updateUserAPI from "../fetchAPI/updateUserAPI"
// import { Link } from "gatsby"

// const AdminImg = () => {

//     const http = require("http");
//     const path = require("path");
//     const fs = require("fs");

//     const express = require("express");

//     const app = express();
//     const httpServer = http.createServer(app);

//     const PORT = process.env.PORT || 3000;

//     httpServer.listen(PORT, () => {
//         console.log(`Server is listening on port ${PORT}`);
//     });

//     // put the HTML file containing your form in a directory named "public" (relative to where this script is located)
//     app.get("/", express.static(path.join(__dirname, "./public")));


//     const multer = require("multer");

//     const handleError = (err, res) => {
//         res
//             .status(500)
//             .contentType("text/plain")
//             .end("Oops! Something went wrong!");
//     };

//     const upload = multer({
//         dest: "/path/to/temporary/directory/to/store/uploaded/files"
//         // you might also want to set some limits: https://github.com/expressjs/multer#limits
//     });


//     app.post(
//         "/upload",
//         upload.single("file" /* name attribute of <file> element in your form */),
//         (req, res) => {
//             const tempPath = req.file.path;
//             const targetPath = path.join(__dirname, "./uploads/image.png");

//             if (path.extname(req.file.originalname).toLowerCase() === ".png") {
//                 fs.rename(tempPath, targetPath, err => {
//                     if (err) return handleError(err, res);

//                     res
//                         .status(200)
//                         .contentType("text/plain")
//                         .end("File uploaded!");
//                 });
//             } else {
//                 fs.unlink(tempPath, err => {
//                     if (err) return handleError(err, res);

//                     res
//                         .status(403)
//                         .contentType("text/plain")
//                         .end("Only .png files are allowed!");
//                 });
//             }
//         }
//     );
//     return (
//         <div>

//             <Form method="post" enctype="multipart/form-data" action="/upload">
//                 <input type="file" name="file" />
//                 <input type="submit" value="Submit" />
//             </Form>


//         </div>
//     );
// }



// export default AdminImg;

