
const express=require('express')
const{connectToDb,getDb}=require('./ConnectMongoDB')
const querystring = require('querystring')
const fs = require('fs')
const dt = require('./database1.js')

const app = express()
//const { ObjectId } = require('mongodb');

let db 
connectToDb((err)=>{
if(!err){
    app.listen(3000,()=>{
        console.log("Server started")
    })
db=getDb()
}
})

app.get('/courses', (req,res) =>{

let records=[]

    db.collection('courses')
    .find({"program":"Bca"})
    .sort({program:1})
    .forEach(record=>records.push(record))
    .then(()=>{

        if (records.length === 0) {
        res.send("No course data found");
        return;
    }
        res.write("<style> body { font-family: Verdana, sans-serif; } .section { margin-bottom: 20px; background-color: #f2f2f2; padding: 10px; border-radius: 5px; } .title { font-size: 20px; color: #2196F3; margin-bottom: 10px; } .content { margin-left: 20px; } .career-option { margin-bottom: 10px; background-color: #ffffff; padding: 10px; border-radius: 5px; } </style>");

        res.write("<h1 style='color: #2196F3;'>BCA WINNER PATH</h1>");
        
        res.write("<div class='section'>");
        // Program Name
        res.write("<div class='title'>Program Name</div>");
        res.write("<div class='content'>" + records[0].program + "</div>");
        res.write("</div>");

        res.write("<div class='section'>");
        res.write("<div class='title'>Image</div>");
        res.write("<img src='https://images.shiksha.com/mediadata/images/articles/1705860839phpYaPORt.jpeg' alt='Description of the image' style='max-width: 2000px; height: 600px;'>");
        res.write("</div>");
        res.write("<div class='section'>");
        res.write("<div class='title'>Image</div>");
        res.write("<img src='https://gyanjyoticollege.in/wp-content/uploads/2015/05/career-bca.jpg' alt='Description of the image' style='max-width: 1000px; height: 600px;'>");
        res.write("</div>");


        res.write("</div>");

        // Loop through each phase
        records[0].desc.forEach(phase => {
            res.write("<div class='section'>");
        
            // Phase
            res.write("<div class='title'>" + phase.phase + "</div>");
        
            // Simplified Description
            res.write("<div class='title'>Simplified Description</div>");
            res.write("<div class='content'>" + phase.simplified_description + "</div>");
        
            // Steps
            //res.write("<div class='title'>Steps</div>");
            //res.write("<div class='content'>");
        
            // Loop through each step
            //phase.steps.forEach(step => {
              //  res.write("<div>" + step + "</div>");
            //});
        
            res.write("</div>"); // Close Steps
        
            // If it's the "Exploring Career Options" phase, include Career Options
            if (phase.phase === "Exploring Career Options") {
                res.write("<div class='section'>");
                // Career Options
                res.write("<div class='title'>Career Options</div>");
                res.write("<div class='content'>");
        
                // Loop through career options and add them
                phase.options.forEach(option => {
                    res.write("<div class='career-option'><strong>" + option.career_option + "</strong>: " + option.description + "</div>");
                });
        
                res.write("</div>");
                res.write("</div>");
            }
        
            res.write("</div>"); // Close Section
        });
        
        //res.write("<table style='border-collapse: collapse; width: 100%;'><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Program code </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> "+ records[0]._id  +  "</td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Program Name </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> "  + records[0].program + "</td></tr><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Description </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>  "+records[0].desc[0].phase +" </td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Simplified Description</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>"+records[0].desc[0].simplified_description+" </td></tr><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Steps</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>"+records[0].desc[0].steps[0] + "</td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Steps 2 </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> " + records[0].desc[0].steps[1]+ "</td></tr></table>");
        res.end();
       // res.status(200).json(records)
    })
    .catch(() => {
        res.status(500).json({error:'Could not fetch the documents'})
    })
})

// app.get('/Doctor', (req,res) =>{

//     let records=[]
    
//         db.collection('Doctors_Records')
//         .find()
//         .sort({username:1})
//         .forEach(record=>records.push(record))
//         .then(()=>{
//             res.status(200).json(records)
//         })
//         .catch(() => {
//             res.status(500).json({error:'Could not fetch the documents'})
//         })
//     })

//     app.get('/Staff_Records', (req,res) =>{

//         let records=[]
        
//             db.collection('Staff_Records')
//             .find()
//             .sort({username:1})
//             .forEach(record=>records.push(record))
//             .then(()=>{
//                 res.status(200).json(records)
//             })
//             .catch(() => {
//                 res.status(500).json({error:'Could not fetch the documents'})
//             })
//         })

app.get('/courses1', (req,res) =>{

        let records=[]
        
            db.collection('courses')
            .find({"program":"BBA"})
            .sort({program:1})
             .forEach(record=>records.push(record))
             .then(()=>{

                if (records.length === 0) {
        res.send("No course data found");
        return;
    }

                res.write("<style> body { font-family: Verdana, sans-serif; } .section { margin-bottom: 20px; background-color: #f2f2f2; padding: 10px; border-radius: 5px; } .title { font-size: 20px; color: #2196F3; margin-bottom: 10px; } .content { margin-left: 20px; } .career-option { margin-bottom: 10px; background-color: #ffffff; padding: 10px; border-radius: 5px; } </style>");

res.write("<h1 style='color: #2196F3;'>BBA WINNER PATH</h1>");

res.write("<div class='section'>");
    // Program Name
    res.write("<div class='title'>Program Name</div>");
    res.write("<div class='content'>" + records[0].program + "</div>");
    res.write("</div>");

    res.write("<div class='section'>");
    res.write("<div class='title'>Image</div>");
    res.write("<img src='https://distanceeducationschool.com/wp-content/uploads/2023/07/Online-BBA-career.jpg' alt='Description of the image' style='max-width: 2000px; height: 600px;'>");
    res.write("</div>");
    res.write("<div class='section'>");
    res.write("<div class='title'>Image</div>");
    res.write("<img src='https://cache.careers360.mobi/media/articles/uploads/froala_editor/images/2024/2/2/1706858610577.png' alt='Description of the image' style='max-width: 1000px; height: 600px;'>");
    res.write("</div>");


records[0].desc.forEach(phase => {
                res.write("<div class='section'>");
            
                // Phase
                res.write("<div class='title'>" + phase.phase + "</div>");
            
                // Simplified Description
                res.write("<div class='title'>Simplified Description</div>");
                res.write("<div class='content'>" + phase.simplified_description + "</div>");
            
                // Steps
                //res.write("<div class='title'>Steps</div>");
                //res.write("<div class='content'>");
            
                // Loop through each step
                //phase.steps.forEach(step => {
                  //  res.write("<div>" + step + "</div>");
                //});
            
                res.write("</div>"); // Close Steps
            
                // If it's the "Exploring Career Options" phase, include Career Options
                if (phase.phase === "Exploring Career Options") {
                    res.write("<div class='section'>");
                    // Career Options
                    res.write("<div class='title'>Career Options</div>");
                    res.write("<div class='content'>");
            
                    // Loop through career options and add them
                    phase.options.forEach(option => {
                        res.write("<div class='career-option'><strong>" + option.career_option + "</strong>: " + option.description + "</div>");
                    });
            
                    res.write("</div>");
                    res.write("</div>");
                }
            
                res.write("</div>"); // Close Section
            });
            
            //res.write("<table style='border-collapse: collapse; width: 100%;'><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Program code </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> "+ records[0]._id  +  "</td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Program Name </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> "  + records[0].program + "</td></tr><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Description </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>  "+records[0].desc[0].phase +" </td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Simplified Description</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>"+records[0].desc[0].simplified_description+" </td></tr><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Steps</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>"+records[0].desc[0].steps[0] + "</td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Steps 2 </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> " + records[0].desc[0].steps[1]+ "</td></tr></table>");
            //res.end();

res.end();
                 //res.status(200).json(records)
             })
           .catch(() => {
                 res.status(500).json({error:'Could not fetch the documents'})
             })
         })

   app.get('/Courses2', (req,res) =>{

         let records=[]
        
         db.collection('courses')
         .find({"program":"BCom"})
         .sort({program:1})
             .forEach(record=>records.push(record))
             .then(()=>{

                if (records.length === 0) {
        res.send("No course data found");
        return;
    }

                res.write("<style> body { font-family: Verdana, sans-serif; } .section { margin-bottom: 20px; background-color: #f2f2f2; padding: 10px; border-radius: 5px; } .title { font-size: 20px; color: #2196F3; margin-bottom: 10px; } .content { margin-left: 20px; } .career-option { margin-bottom: 10px; background-color: #ffffff; padding: 10px; border-radius: 5px; } </style>");

                res.write("<h1 style='color: #2196F3;'>BCOM WINNER PATH</h1>");
                
                res.write("<div class='section'>");
                // Program Name
                res.write("<div class='title'>Program Name</div>");
                res.write("<div class='content'>" + records[0].program + "</div>");
                res.write("</div>");
                res.write("<div class='section'>");
                res.write("<div class='title'>Image</div>");
                res.write("<img src='https://qph.cf2.quoracdn.net/main-qimg-dbf2818885bba06e5e62b4d88121e457' alt='Description of the image' style='max-width: 2000px; height: 600px;'>");
                res.write("</div>");
                res.write("<div class='section'>");
                res.write("<div class='title'>Image</div>");
                res.write("<img src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEixE5j58VlMYZuHVaNJGY_Da_T4AmWPNGVFX6QOMf8YVGa-XiFpjH8DLOjRCEW0wjswX_mXCAbgDSbp0vcxopAYOoOU-KVJvsa4boMnSdW_XcsQar4VsdGkY-UPe2sEZdIGeJNXfPglCcw/s1600/bcom+career.PNG' alt='Description of the image' style='max-width: 1000px; height: 600px;'>");
                res.write("</div>");
        

            records[0].desc.forEach(phase => {
                            res.write("<div class='section'>");
                        
                            // Phase
                            res.write("<div class='title'>" + phase.phase + "</div>");
                        
                            // Simplified Description
                            res.write("<div class='title'>Simplified Description</div>");
                            res.write("<div class='content'>" + phase.simplified_description + "</div>");
                        
                            // Steps
                            //res.write("<div class='title'>Steps</div>");
                            //res.write("<div class='content'>");
                        
                            // Loop through each step
                            //phase.steps.forEach(step => {
                              //  res.write("<div>" + step + "</div>");
                            //});
                        
                            res.write("</div>"); // Close Steps
                        
                            // If it's the "Exploring Career Options" phase, include Career Options
                            if (phase.phase === "Exploring Career Options") {
                                res.write("<div class='section'>");
                                // Career Options
                                res.write("<div class='title'>Career Options</div>");
                                res.write("<div class='content'>");
                        
                                // Loop through career options and add them
                                phase.options.forEach(option => {
                                    res.write("<div class='career-option'><strong>" + option.career_option + "</strong>: " + option.description + "</div>");
                                });
                        
                                res.write("</div>");
                                res.write("</div>");
                            }
                        
                            res.write("</div>"); // Close Section
                        });
                        
                        //res.write("<table style='border-collapse: collapse; width: 100%;'><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Program code </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> "+ records[0]._id  +  "</td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Program Name </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> "  + records[0].program + "</td></tr><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Description </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>  "+records[0].desc[0].phase +" </td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Simplified Description</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>"+records[0].desc[0].simplified_description+" </td></tr><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Steps</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>"+records[0].desc[0].steps[0] + "</td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Steps 2 </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> " + records[0].desc[0].steps[1]+ "</td></tr></table>");
                        //res.end();
                res.end();
                

                 //res.status(200).json(records)
             })
             .catch(() => {
                 res.status(500).json({error:'Could not fetch the documents'})
             })
         })


         app.get('/Courses3', (req,res) =>{

            let records=[]
           
            db.collection('courses')
            .find({"program":"LLB"})
            .sort({program:1})
                .forEach(record=>records.push(record))
                .then(()=>{

                    if (records.length === 0) {
        res.send("No course data found");
        return;
    }
   
                   res.write("<style> body { font-family: Verdana, sans-serif; } .section { margin-bottom: 20px; background-color: #f2f2f2; padding: 10px; border-radius: 5px; } .title { font-size: 20px; color: #2196F3; margin-bottom: 10px; } .content { margin-left: 20px; } .career-option { margin-bottom: 10px; background-color: #ffffff; padding: 10px; border-radius: 5px; } </style>");
   
                   res.write("<h1 style='color: #2196F3;'>LLB WINNER PATH</h1>");
                   
                   res.write("<div class='section'>");
                   // Program Name
                   res.write("<div class='title'>Program Name</div>");
                   res.write("<div class='content'>" + records[0].program + "</div>");
                   res.write("</div>");
                   res.write("<div class='section'>");
                   res.write("<div class='title'>Image</div>");
                   res.write("<img src='https://pbs.twimg.com/media/DBX53baUAAEX5va?format=jpg&name=medium' alt='Description of the image' style='max-width: 5000px; height: 600px;'>");
                   res.write("</div>");
                   res.write("<div class='section'>");
                   res.write("<div class='title'>Image</div>");
                   res.write("<img src='https://rightdirectionacademy.com/images/law_roadmap.png' alt='Description of the image' style='max-width: 1000px; height: 600px;'>");
                   res.write("</div>");
           

               records[0].desc.forEach(phase => {
                               res.write("<div class='section'>");
                           
                               // Phase
                               res.write("<div class='title'>" + phase.phase + "</div>");
                           
                               // Simplified Description
                               res.write("<div class='title'>Simplified Description</div>");
                               res.write("<div class='content'>" + phase.simplified_description + "</div>");
                           
                               // Steps
                               //res.write("<div class='title'>Steps</div>");
                               //res.write("<div class='content'>");
                           
                               // Loop through each step
                               //phase.steps.forEach(step => {
                                 //  res.write("<div>" + step + "</div>");
                               //});
                           
                               res.write("</div>"); // Close Steps
                           
                               // If it's the "Exploring Career Options" phase, include Career Options
                               if (phase.phase === "Exploring Career Options") {
                                   res.write("<div class='section'>");
                                   // Career Options
                                   res.write("<div class='title'>Career Options</div>");
                                   res.write("<div class='content'>");
                           
                                   // Loop through career options and add them
                                   phase.options.forEach(option => {
                                       res.write("<div class='career-option'><strong>" + option.career_option + "</strong>: " + option.description + "</div>");
                                   });
                           
                                   res.write("</div>");
                                   res.write("</div>");
                               }
                           
                               res.write("</div>"); // Close Section
                           });
                           
                           //res.write("<table style='border-collapse: collapse; width: 100%;'><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Program code </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> "+ records[0]._id  +  "</td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Program Name </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> "  + records[0].program + "</td></tr><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Description </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>  "+records[0].desc[0].phase +" </td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Simplified Description</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>"+records[0].desc[0].simplified_description+" </td></tr><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Steps</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>"+records[0].desc[0].steps[0] + "</td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Steps 2 </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> " + records[0].desc[0].steps[1]+ "</td></tr></table>");
                           //res.end();
                   res.end();
                   
   
                    //res.status(200).json(records)
                })
                .catch(() => {
                    res.status(500).json({error:'Could not fetch the documents'})
                })
            })
   


            app.get('/Courses4', (req,res) =>{

                let records=[]
               
                db.collection('courses')
                .find({"program":"Engineering"})
                .sort({program:1})
                    .forEach(record=>records.push(record))
                    .then(()=>{

                        if (records.length === 0) {
        res.send("No course data found");
        return;
    }
       
                       res.write("<style> body { font-family: Verdana, sans-serif; } .section { margin-bottom: 20px; background-color: #f2f2f2; padding: 10px; border-radius: 5px; } .title { font-size: 20px; color: #2196F3; margin-bottom: 10px; } .content { margin-left: 20px; } .career-option { margin-bottom: 10px; background-color: #ffffff; padding: 10px; border-radius: 5px; } </style>");
       
                       res.write("<h1 style='color: #2196F3;'>Engineering WINNER PATH</h1>");
                       
                       res.write("<div class='section'>");
                       // Program Name
                       res.write("<div class='title'>Program Name</div>");
                       res.write("<div class='content'>" + records[0].program + "</div>");
                       res.write("</div>");
                       res.write("<div class='section'>");
                       res.write("<div class='title'>Image</div>");
                       res.write("<img src='https://blogassets.leverageedu.com/blog/wp-content/uploads/2019/09/26201129/Major-Engineering-Branches-1012x1024.png' alt='Description of the image' style='max-width: 2000px; height: 600px;'>");
                       res.write("</div>");
                       res.write("<div class='section'>");
                       res.write("<div class='title'>Image</div>");
                       res.write("<img src='https://qph.cf2.quoracdn.net/main-qimg-6fb496631dc47b4aff898e36fe616205-pjlq' alt='Description of the image' style='max-width: 1000px; height: 600px;'>");
                       res.write("</div>");
                       res.write("<div class='section'>");
                       res.write("<div class='title'>Image</div>");
                       res.write("<img src='https://lh3.googleusercontent.com/proxy/FszvtoNb7RKbx4MwPlt51DDb-vyEp0exgZjInsbN8Wf3kE8qIYoVKH4yFzLVcRq24vRFVlacmBudzYTgCTVvGxDk' alt='Description of the image' style='max-width: 1000px; height: 600px;'>");
                       res.write("</div>");
               

                   records[0].desc.forEach(phase => {
                                   res.write("<div class='section'>");
                               
                                   // Phase
                                   res.write("<div class='title'>" + phase.phase + "</div>");
                               
                                   // Simplified Description
                                   res.write("<div class='title'>Simplified Description</div>");
                                   res.write("<div class='content'>" + phase.simplified_description + "</div>");
                               
                                   // Steps
                                   //res.write("<div class='title'>Steps</div>");
                                   //res.write("<div class='content'>");
                               
                                   // Loop through each step
                                   //phase.steps.forEach(step => {
                                     //  res.write("<div>" + step + "</div>");
                                   //});
                               
                                   res.write("</div>"); // Close Steps
                               
                                   // If it's the "Exploring Career Options" phase, include Career Options
                                   if (phase.phase === "Exploring Career Options") {
                                       res.write("<div class='section'>");
                                       // Career Options
                                       res.write("<div class='title'>Career Options</div>");
                                       res.write("<div class='content'>");
                               
                                       // Loop through career options and add them
                                       phase.options.forEach(option => {
                                           res.write("<div class='career-option'><strong>" + option.career_option + "</strong>: " + option.description + "</div>");
                                       });
                               
                                       res.write("</div>");
                                       res.write("</div>");
                                   }
                               
                                   res.write("</div>"); // Close Section
                               });
                               
                               //res.write("<table style='border-collapse: collapse; width: 100%;'><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Program code </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> "+ records[0]._id  +  "</td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Program Name </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> "  + records[0].program + "</td></tr><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Description </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>  "+records[0].desc[0].phase +" </td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Simplified Description</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>"+records[0].desc[0].simplified_description+" </td></tr><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Steps</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>"+records[0].desc[0].steps[0] + "</td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Steps 2 </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> " + records[0].desc[0].steps[1]+ "</td></tr></table>");
                               //res.end();
                       res.end();
                       
       
                        //res.status(200).json(records)
                    })
                    .catch(() => {
                        res.status(500).json({error:'Could not fetch the documents'})
                    })
                })
       
                app.get('/Courses5', (req,res) =>{

                    let records=[]
                   
                    db.collection('courses')
                    .find({"program":"Medicine"})
                    .sort({program:1})
                        .forEach(record=>records.push(record))
                        .then(()=>{

                             if (records.length === 0) {
        res.send("No course data found");
        return;
    }
           
                           res.write("<style> body { font-family: Verdana, sans-serif; } .section { margin-bottom: 20px; background-color: #f2f2f2; padding: 10px; border-radius: 5px; } .title { font-size: 20px; color: #2196F3; margin-bottom: 10px; } .content { margin-left: 20px; } .career-option { margin-bottom: 10px; background-color: #ffffff; padding: 10px; border-radius: 5px; } </style>");
           
                           res.write("<h1 style='color: #2196F3;'>Medicine WINNER PATH</h1>");
                           
                           res.write("<div class='section'>");
                           // Program Name
                           res.write("<div class='title'>Program Name</div>");
                           res.write("<div class='content'>" + records[0].program + "</div>");
                           res.write("</div>");

                           res.write("<div class='section'>");
        res.write("<div class='title'>Image</div>");
        res.write("<img src='https://www.medschoolcoach.com/wp-content/uploads/2020/05/the-med-school-journey-infographic.jpg' alt='Description of the image' style='max-width: 2000px; height: 600px;'>");
        res.write("</div>");
        res.write("<div class='section'>");
        res.write("<div class='title'>Image</div>");
        res.write("<img src='https://www.dmsf.ph/assets/img/blog/Roadmap-To-Becoming-a-Successful-Doctor.jpg' alt='Description of the image' style='max-width: 1000px; height: 600px;'>");
        res.write("</div>");

                       records[0].desc.forEach(phase => {
                                       res.write("<div class='section'>");
                                   
                                       // Phase
                                       res.write("<div class='title'>" + phase.phase + "</div>");
                                   
                                       // Simplified Description
                                       res.write("<div class='title'>Simplified Description</div>");
                                       res.write("<div class='content'>" + phase.simplified_description + "</div>");
                                   
                                       // Steps
                                       //res.write("<div class='title'>Steps</div>");
                                       //res.write("<div class='content'>");
                                   
                                       // Loop through each step
                                       //phase.steps.forEach(step => {
                                         //  res.write("<div>" + step + "</div>");
                                       //});
                                   
                                       res.write("</div>"); // Close Steps
                                   
                                       // If it's the "Exploring Career Options" phase, include Career Options
                                       if (phase.phase === "Exploring Career Options") {
                                           res.write("<div class='section'>");
                                           // Career Options
                                           res.write("<div class='title'>Career Options</div>");
                                           res.write("<div class='content'>");
                                   
                                           // Loop through career options and add them
                                           phase.options.forEach(option => {
                                               res.write("<div class='career-option'><strong>" + option.career_option + "</strong>: " + option.description + "</div>");
                                           });
                                   
                                           res.write("</div>");
                                           res.write("</div>");
                                       }
                                   
                                       res.write("</div>"); // Close Section
                                   });
                                   
                                   //res.write("<table style='border-collapse: collapse; width: 100%;'><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Program code </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> "+ records[0]._id  +  "</td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Program Name </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> "  + records[0].program + "</td></tr><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Description </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>  "+records[0].desc[0].phase +" </td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Simplified Description</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>"+records[0].desc[0].simplified_description+" </td></tr><tr style='background-color: #f2f2f2;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Steps</td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>"+records[0].desc[0].steps[0] + "</td></tr><tr style='background-color: #ffffff;'><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> Steps 2 </td><td style='border: 1px solid #dddddd; text-align: left; padding: 8px;'> " + records[0].desc[0].steps[1]+ "</td></tr></table>");
                                   //res.end();
                           res.end();
                           
           
                            //res.status(200).json(records)
                        })
                        .catch(() => {
                            res.status(500).json({error:'Could not fetch the documents'})
                        })
                    })

                    // app.delete('/deleteRecord', (req, res) => {
                    //     const programId = req.body.programId;
                    //     const programName = req.body.programName;
                    
                    //     // Use MongoDB's deleteOne method to delete the document with the specified ID
                    //     db.collection('courses').deleteOne({ _id: ObjectId(programId) })
                    //         .then((result) => {
                    //             if (result.deletedCount === 0) {
                    //                 res.status(404).json({ error: 'Course not found' });
                    //             } else {
                    //                 res.status(200).json({ message: 'Course deleted successfully' });
                    //             }
                    //         })
                    //         .catch((error) => {
                    //             res.status(500).json({ error: 'Could not delete course', details: error });
                    //         });
                    // });

// ==================== Routes from router1.js ====================
// Serve static files from the 'public' directory
app.use(express.static('public'));

// Function to load HTML files
function loadpage(url, res) {
    fs.readFile(url, function(err, data) {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal server error');
            return;
        }
        res.write(data);
        return res.end();
    });
}

// HTML Pages Routes
app.get('/registration', (req, res) => {
    loadpage('./registration.html', res);
});

app.get('/aboutus1', (req, res) => {
    loadpage('./aboutus1.html', res);
});

app.get('/contactus', (req, res) => {
    loadpage('./contactus.html', res);
});

app.get('/display', (req, res) => {
    loadpage('./display.html', res);
});

app.get('/add', (req, res) => {
    loadpage('./add.html', res);
});

app.get('/remove', (req, res) => {
    loadpage('./remove.html', res);
});

app.get('/roadmap/BCA', (req, res) => {
    loadpage('./bca_roadmap.html', res);
});

// POST Routes - Handle form submissions
app.use(express.urlencoded({ extended: true }));

app.post('/registrationsave', (req, res) => {
    let formData = '';
    req.on('data', (chunk) => {
        formData += chunk;
    });

    req.on('end', () => {
        const postData = querystring.parse(formData);
        var passdata = JSON.stringify({username: postData.txtname, email: postData.txtemail, password: postData.txtpwd, age: postData.txtage, levelofstudy: postData.txtug});
        var status = dt.registrationinsert(passdata);
        res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Successful</title>
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #ADD8E6;
      color: #333;
    }
    .message {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .message h1 {
      color: #007bff;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="message">
    <h1>Registration successful!</h1>
  </div>
</body>
</html>
        `);
    });
});

app.post('/addsave', (req, res) => {
    let formData = '';
    req.on('data', (chunk) => {
        formData += chunk;
    });

    req.on('end', () => {
        const postData = querystring.parse(formData);
        var passdata = JSON.stringify({_id: postData.id, program: postData.program, description: postData.description, shorttermgoal: postData.shorttermgoals, longtermgoal: postData.longtermgoals, careerexploration: postData.careerexploration, competitiveexam: postData.competitiveexam});
        var status = dt.coursesinsert(passdata);
        res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Updated</title>
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #ADD8E6;
      color: #333;
    }
    .message {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .message h1 {
      color: #007bff;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="message">
    <h1>Updated</h1>
  </div>
</body>
</html>
        `);
    });
});

app.post('/contactsave', (req, res) => {
    let formData = '';
    req.on('data', (chunk) => {
        formData += chunk;
    });

    req.on('end', () => {
        const postData = querystring.parse(formData);
        var passdata = JSON.stringify({username: postData.txtname, email: postData.txtemail, number: postData.txtnum});
        var status = dt.contactinsert(passdata);
        res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Will Get Back</title>
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #ADD8E6;
      color: #333;
    }
    .message {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .message h1 {
      color: #007bff;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="message">
    <h1>We Will Get Back</h1>
  </div>
</body>
</html>
        `);
    });
});
                    