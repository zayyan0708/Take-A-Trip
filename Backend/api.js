// Before running this file in new project make sure to install express
// npm install express --save
// after that install body parser
// npm install -body-parser --save

const client = require('./connection.js')
const express = require('express');

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(8800, ()=>{
    console.log("Sever is now listening at port 3300\nGo to=> http://localhost:3300/expenseIndiviualDateO/12");
})

client.connect();

// Expenses I
app.get('/expenseIndiviualDateO/:userid',(req,res)=>{
    client.query(`Select expense_id as id,exp_title as title,exp_amount as amount,exp_type as type,exp_description as description,exp_date as date from expenses_indivual where u_id='${req.params.userid}' ORDER BY exp_date ASC`,(err,result)=>{
        if(!err){
            // console.log(result.rows);
            res.send(result.rows);
        }
    })
    client.end;
});
app.get('/expenseIndiviualDateL/:userid',(req,res)=>{
    client.query(`Select expense_id as id,exp_title as title,exp_amount as amount,exp_type as type,exp_description as description,exp_date as date from expenses_indivual where u_id='${req.params.userid}' ORDER BY exp_date DESC`,(err,result)=>{
        if(!err){
            // console.log(result.rows);
            res.send(result.rows);
        }
    })
    client.end;
});
app.get('/expenseIndiviualPriceH/:userid',(req,res)=>{
    client.query(`Select expense_id as id,exp_title as title,exp_amount as amount,exp_type as type,exp_description as description,exp_date as date from expenses_indivual where u_id='${req.params.userid}' ORDER BY exp_amount DESC`,(err,result)=>{
        if(!err){
            // console.log(result.rows);
            res.send(result.rows);
        }
    })
    client.end;
});
app.get('/expenseIndiviualPriceL/:userid',(req,res)=>{
    client.query(`Select expense_id as id,exp_title as title,exp_amount as amount,exp_type as type,exp_description as description,exp_date as date from expenses_indivual where u_id='${req.params.userid}' ORDER BY exp_amount ASC`,(err,result)=>{
        if(!err){
            // console.log(result.rows);
            res.send(result.rows);
        }
    })
    client.end;
});
app.get('/getBudget/:userid',(req,res)=>{
    client.query(`Select budget from user_info where user_id='${req.params.userid}'`,(err,result)=>{
        if(!err){
            // console.log(result.rows);
            res.send(result.rows[0]);
        }
    })
    client.end;
});
app.get('/getSpent/:userid',(req,res)=>{
    client.query(`select sum(exp_amount) as spent from expenses_indivual where u_id ='${req.params.userid}'`,(err,result)=>{
        if(!err){
            // console.log(result.rows);
            res.send(result.rows[0]);
        }
    })
    client.end;
});
app.post('/expenseIndiviualPost',async (req,res)=>{
    const user = req.body;
    let insertQuery=`INSERT INTO expenses_indivual(u_id, exp_title, exp_amount, exp_type, exp_description, exp_date)
        VALUES ('${user.uid}', '${user.title}', '${user.expAmount}', '${user.expValue}', '${user.expDescrip}','${user.expDate}')`;
    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
//SELECT ALL USERS
app.get('/essentials', (req, res)=>{
    client.query(`Select * from essentials`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
// //INSERT USER INTO TABLE
app.get('/user_info/:id',(req,res)=>{
    try
    {
        client.query(`select * from user_info where email='${req.params.id}'`,(err,result)=>{
        console.log(result.rows[0].email);
        console.log(req.params.id.toString());
            if(!err){
              
                if(result.rows[0].email==req.params.id.toString())
                {
                    console.log('true');
                    res.send(result.rows);
                }  
                else
                {
                    console.log('false');
                    res.send(false);
                }
            }
        });
        client.end;
    }
    catch(err)
    {
        res.send(false);
    }

})



app.post('/user_info', async (req, res)=> {
        const user = req.body;
        let insertQuery = `insert into user_info(fname,lname,ucity,ucountry,profilepic,email,pass) 
                           values('${user.fn}','${user.ln}','${user.ucity}','${user.ucountry}','${user.profilepic}','${user.email}','${user.pass}')`
        client.query(insertQuery, (err, result)=>{
            if(!err){
                res.send('Insertion was successful')
            }
            else{ console.log(err.message) }
        })
        client.end;
})


app.post('/plantrip', async (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into plantrip(userid,startdate,enddate,cityname,policy) 
                       values('${user.userid}','${user.sDate}','${user.eDate}','${user.cName}','${user.upolicy}')`
    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


app.post('/essentials', async (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into essentials(item_name,temperature,user_id) 
                       values('${user.i_name}','${user.temp}','${user.user_id}')`
    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

app.get('/allpeople/:userid/:startdate/:enddate/:policy/:city', async (req, res) => {
    try {
      const userId = req.params.userid;
      const startDate = req.params.startdate.toString();
      const endDate = req.params.enddate.toString();
      const policy = req.params.policy.toString();
      const city = req.params.city.toString();
  
      const query = `
      SELECT DISTINCT user_info.*
      FROM plantrip
      INNER JOIN user_info ON plantrip.userid = user_info.user_id
      WHERE (plantrip.startdate >= '${startDate}' OR plantrip.enddate <= '${endDate}')
        AND plantrip.policy = '${policy}'
        AND plantrip.cityname = '${city}'
        AND plantrip.userid!='${userId}'
        AND NOT EXISTS (
          SELECT 1
          FROM friend
          WHERE friend.userid = user_info.user_id
            OR friend.friendid = user_info.user_id
        )
    `;
  
      const result = await client.query(query);
      res.send(result.rows);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }
  });
app.get('/recvreq/:userid', async (req, res) => {
    try {
      const userId = req.params.userid;
      const query = `
        SELECT user_info.*
        FROM friend_request
        INNER JOIN user_info ON friend_request.sender_id = user_info.user_id
        WHERE friend_request.recv_id = ${userId}
      `;
      const result = await client.query(query);
      res.send(result.rows);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.get('/sendreq/:userid', async (req, res) => {
    try {
        const userId = req.params.userid;
        const query = `
          SELECT user_info.*
          FROM friend_request
          INNER JOIN user_info ON friend_request.recv_id = user_info.user_id
          WHERE friend_request.sender_id = ${userId}
        `;
        const result = await client.query(query);
        res.send(result.rows);
      } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      }
  });
  app.get('/allfriends/:userid', async (req, res) => {
    try {
      const userId = req.params.userid;
      const query = `
        SELECT user_info.*
        FROM friend
        INNER JOIN user_info ON friend.friendid = user_info.user_id
        WHERE friend.userid = ${userId}
      `;
      const result = await client.query(query);
      res.send(result.rows);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/groupfriends/:userid', async (req, res) => {
    try {
      const userId = req.params.userid;
      const query = `SELECT DISTINCT u.*,m.gid as GIDZ
FROM members m
INNER JOIN user_info u ON (m.mid = u.user_id OR m.aid = u.user_id)
WHERE m.gid IN (SELECT gid FROM members WHERE aid = ${userId} OR mid = ${userId})`;

      const result = await client.query(query);
      console.log(result.rows[0].gidz);
      res.send(result.rows);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  app.post('/friend/:userid/:fid', async (req, res) => {
    const userId = req.params.userid;
    const friendId = req.params.fid;
  
    const insertQuery = `INSERT INTO friend_request (sender_id, recv_id) VALUES (${userId}, ${friendId})`;
  
    client.query(insertQuery, (err, result) => {
      if (!err) {
        res.send('Insertion was successful');
      } else {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      }
    });
  });

//   app.post('/acceptFriend/:userid/:fid', async (req, res) => {
//     const userId = req.params.userid;
//     const friendId = req.params.fid;
  
//     const insertQuery = `INSERT INTO friend (userid, friendid) VALUES (${userId}, ${friendId})`;
//     const insertQuery2 = `INSERT INTO friend (userid, friendid) VALUES (${friendId}, ${userId})`;
    

//     const deleteQuery = `DELETE FROM friend_request WHERE sender_id = ${friendId} AND recv_id = ${userId}`;
  
//     client.query(insertQuery, (err, result) => {
//       if (err) {
//         console.error(err.message);
//         res.status(500).send('Internal Server Error');
//         return;
//       }
//       client.query(insertQuery2, (err, result) => {
//         if (!err) {
//           res.send('Friend request accepted');
//         } else {
//           console.error(err.message);
//           res.status(500).send('Internal Server Error');
//         }
//       });
  
//       client.query(deleteQuery, (err, result) => {
//         if (!err) {
//           res.send('Friend request accepted and record deleted successfully');
//         } else {
//           console.error(err.message);
//           res.status(500).send('Internal Server Error');
//         }
//       });
//     });
//   });
  


app.post('/acceptFriend/:userid/:fid', async (req, res) => {
    const userId = req.params.userid;
    const friendId = req.params.fid;
  
    const insertQuery = `INSERT INTO friend (userid, friendid) VALUES (${userId}, ${friendId})`;
    const insertQuery2 = `INSERT INTO friend (userid, friendid) VALUES (${friendId}, ${userId})`;
    const deleteQuery = `DELETE FROM friend_request WHERE sender_id = ${friendId} AND recv_id = ${userId}`;
  
    // Check if the group exists
    const checkGroupQuery = `SELECT id,adminid FROM mygroup WHERE adminid = ${friendId} OR id IN (SELECT gid FROM members WHERE mid = ${friendId}) `;


    client.query(checkGroupQuery, (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // If the group exists, insert records into members table
      if (result.rows.length > 0) {
        const groupId = result.rows[0].id;
        const adminId=result.rows[0].adminid;
        const insertMembersQuery = `INSERT INTO members (gid, mid, aid) VALUES (${groupId},${userId}, ${adminId})`;
  
        client.query(insertQuery, (err, result) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
          }
  
          client.query(insertQuery2, (err, result) => {
            if (err) {
              console.error(err.message);
              res.status(500).send('Internal Server Error');
              return;
            }
  
            client.query(deleteQuery, (err, result) => {
              if (err) {
                console.error(err.message);
                res.status(500).send('Internal Server Error');
                return;
              }
  
              client.query(insertMembersQuery, (err, result) => {
                if (!err) {
                  res.send('Friend request accepted, record deleted, and added to the group successfully');
                } else {
                  console.error(err.message);
                  res.status(500).send('Internal Server Error');
                }
              });
            });
          });
        });
      } else {
        // If the group does not exist, create a new group and insert records into group and members table
        const createGroupQuery = `INSERT INTO mygroup (adminid) VALUES (${friendId}) RETURNING id`;
  
        client.query(createGroupQuery, (err, result) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
          }
  
          const groupId = result.rows[0].id;
          const insertMembersQuery = `INSERT INTO members (gid, mid, aid) VALUES (${groupId}, ${userId}, ${friendId})`;
  
          client.query(insertQuery, (err, result) => {
            if (err) {
              console.error(err.message);
              res.status(500).send('Internal Server Error');
              return;
            }
  
            client.query(insertQuery2, (err, result) => {
              if (err) {
                console.error(err.message);
                res.status(500).send('Internal Server Error');
                return;
              }
  
              client.query(deleteQuery, (err, result) => {
                if (err) {
                  console.error(err.message);
                  res.status(500).send('Internal Server Error');
                  return;
                }
  
                client.query(insertMembersQuery, (err,  result) => {
                    if (!err) {
                      res.send('Friend request accepted, record deleted, and added to the group successfully');
                    } else {
                      console.error(err.message);
                      res.status(500).send('Internal Server Error');
                    }
                  });
                });
              });
            });
          });
        }
      });
    });
    










  app.post('/removeFriend/:userid/:fid', async (req, res) => {
    const userId = req.params.userid;
    const friendId = req.params.fid;

    const deleteQuery = `DELETE FROM friend WHERE userid = ${userId} AND friendid = ${friendId}`;
    const deleteQuery2 = `DELETE FROM friend WHERE userid = ${friendId} AND friendid = ${userId}`;
      client.query(deleteQuery, (err, result) => {
        if (!err) {
          res.send('Record deleted successfully');
        } else {
          console.error(err.message);
          res.status(500).send('Internal Server Error');
        }
      });
      client.query(deleteQuery2, (err, result) => {
        if (!err) {
          res.send('Record deleted successfully');
        } else {
          console.error(err.message);
          res.status(500).send('Internal Server Error');
        }
      });
  });
  app.post('/removeSent/:userid/:fid', async (req, res) => {
    const userId = req.params.userid;
    const friendId = req.params.fid;

    const deleteQuery = `DELETE FROM friend_request WHERE sender_id = ${userId} AND recv_id = ${friendId}`;
 
  
      client.query(deleteQuery, (err, result) => {
        if (!err) {
          res.send('Record deleted successfully');
        } else {
          console.error(err.message);
          res.status(500).send('Internal Server Error');
        }
      });
  });

  app.post('/reviews', async (req, res) => {
    const { review, rating, city, userName, profilePic, user_id } = req.body;
    console.log(review, rating, city, userName, profilePic, user_id);
    try {
      const query = 'INSERT INTO reviews_city(review,rating,city_name,username,profilepic,user_id) VALUES($1, $2, $3, $4, $5, $6)';
      const values = [review, rating, city, userName, profilePic, user_id];
  
      await client.query(query, values);
  
      res.send('Record Inserted Successfully');
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.get('/reviews/:city', async (req, res) => {
    const city = req.params.city;
  
    try {
      const query = 'SELECT * FROM reviews_city WHERE city_name = $1';
      const values = [city];
  
      const result = await client.query(query, values);
  
      res.send(result.rows);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.post('/reviews', async (req, res) => {
    const { review, rating, city, userName, profilePic, user_id } = req.body;
    console.log(review, rating, city, userName, profilePic, user_id);
    try {
      const query = 'INSERT INTO reviews_city(review,rating,city_name,username,profilepic,user_id) VALUES($1, $2, $3, $4, $5, $6)';
      const values = [review, rating, city, userName, profilePic, user_id];
  
      await client.query(query, values);
  
      res.send('Record Inserted Successfully');
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.post('/itinerary', async (req, res) => {
    const { userID, itineraryList, itineraryDay } = req.body;
    // console.log(userID, itineraryList, itineraryDay);
    try {
        // const itineraryListJsonb = JSON.stringify(itineraryList);
        const query = `INSERT INTO itinearary(userid,itineararylist,itineararyday) VALUES($1, $2, $3)`;
        const values = [userID, itineraryList, itineraryDay];
        await client.query(query, values);
        res.send('Record Inserted Successfully');
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
    });
    app.get('/itinerary/:uid', async (req, res) => {
        const uid = req.params.uid;
      
        try {
          const query = 'SELECT * FROM itinearary WHERE userid = $1';
          const values = [uid];
      
          const result = await client.query(query, values);
      
          res.send(result.rows);
        } catch (error) {
          console.error('Error executing query:', error);
          res.status(500).json({ error: 'An error occurred' });
        }
      });
  

// Sign Up
// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
// app.post('/userz', (req, res)=> {
//         const user = req.body;
//         var hash = bcrypt.hashSync(user.userpassword, salt);
//         let insertQuery = `insert into userz(username, useremail, userpassword) 
//                            values('${user.username}', '${user.useremail}', '${hash}')`
    
//         client.query(insertQuery, (err, result)=>{
//             if(!err){
//                 res.send('Insertion was successful')
//             }
//             else{ console.log(err.message) }
//         })
//         client.end;
//     })
// Log IN 
// app.get('/userz/:useremail/:userpassword',(req,res)=>{
//     // const user = req.body;
//     console.log(req.params.useremail.toString()+' '+req.params.userpassword.toString());
//     client.query(`select userpassword from userz where useremail='${req.params.useremail}'`,(err,result)=>{
//         if(!err){
//             // res.send(result.rows);
//             console.log(result.rows[0].userpassword);
//             bcrypt.compare(req.params.userpassword, result.rows[0].userpassword, function(err, resp) {
//                 if(resp==true){
//                     console.log('true');
//                     res.send(true);
//                 }
//             });   
//         }
//         else{
//             console.log(err);
//         }
//     });
//     client.end;
// })

// GET ALL USERS
// app.get('/user_info', (req, res)=>{
//     // Select * from users order by userid ASC 
//     // Select * from users u JOIN user_l l ON u.id=l.u_id
//     client.query(`Select * from user_info order by user_id ASC`, (err, result)=>{
//         if(!err){
//             // console.log(result.rows[0].profilepic);
//             // console.log(result.rows[0].user_id);
//             var img = result.rows[0].profilepic;
//             var img = img.substring(2);
//             var bin = parseInt(img,16).toString(2);
//             var fs = require('fs');
//             fs.writeFile("E:/filez.jpg",atob(bin),'binary',function(err){console.log('File saved');})
//             res.send(result.rows);
//         }
//     });
//     client.end;
// })

// GET SINGLE SELECTED USER type http://localhost:3300/users/1
// app.get('/users/:id', (req, res)=>{
//     client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
//         if(!err){
//             res.send(result.rows);
//         }
//     });
//     client.end;
// })

// ADD USER
// app.post('/users', (req, res)=> {
//     const user = req.body;
//     let insertQuery = `insert into users(id, firstname, lastname, location) 
//                        values(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}')`

//     client.query(insertQuery, (err, result)=>{
//         if(!err){
//             res.send('Insertion was successful')
//         }
//         else{ console.log(err.message) }
//     })
//     client.end;
// })

// UPDATE USER
// app.put('/users/:id', (req, res)=> {
//     let user = req.body;
//     let updateQuery = `update users
//                        set firstname = '${user.firstname}',
//                        lastname = '${user.lastname}',
//                        location = '${user.location}'
//                        where id = ${user.id}`

//     client.query(updateQuery, (err, result)=>{
//         if(!err){
//             res.send('Update was successful')
//         }
//         else{ console.log(err.message) }
//     })
//     client.end;
// })

// DELETE USER
// app.delete('/users/:id', (req, res)=> {
//     let insertQuery = `delete from users where id=${req.params.id}`

//     client.query(insertQuery, (err, result)=>{
//         if(!err){
//             res.send('Deletion was successful')
//         }
//         else{ console.log(err.message) }
//     })
//     client.end;
// })