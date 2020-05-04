var express = require('express');
var app = express();  
const http=require('http');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
var mysql = require('mysql');
var path = require('path');
var fs = require('fs');
var myModule = require('./public/scripts/script');
var cors = require('cors');
const multer = require('multer');
app.use(express.static(path.join(__dirname, 'public')))


// var dir = './public/datastore';
//   if (!fs.existsSync(dir)){
//           fs.mkdirSync(dir);
//       }

// var subject = "";
//  const multerConfig = {
//     //specify diskStorage (another option is memory)
//     storage: multer.diskStorage({

//       //specify destination
//       destination: function(req, file, next){
//       		var dir = './public/datastore/'+subject;
//   			if (!fs.existsSync(dir)){
//           	fs.mkdirSync(dir);
//       			}
//         next(null, './public/datastore/'+subject);
//       },

//       //specify the filename to be unique
//       filename: function(req, file, next){
//        // console.log(file);
//         //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
//         //const ext = file.mimetype.split('/')[0];
//         //set the file fieldname to a unique name containing the original name, current datetime and the extension.
//         next(null, file.originalname);
//       }
//     }),
//   };


var session = require('express-session')

//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:5555'}));

var sess;

var connection = mysql.createConnection({
	  host: "localhost",
	  user: "shashank",
	  password: "shashank",
	  database: "Outgoing"
	});
connection.connect(function(err) {
	  if (err) throw err
	  console.log('You are now connected...');
});


app.get('/', (req, res) => {
    res.redirect('/login');
});

app.route('/login')
    .get((req, res) => {
    	res.set('Content-Type', 'text/html')
        res.sendFile(__dirname + '/public/index.html');
    });

// app.route('/logout')
//     .get((req, res) => {
//     	req.session.destroy();
//     	res.set('Content-Type', 'text/html')
//         res.sendFile(__dirname + '/public/index.html');
//     });

// app.route('/login2')
// 	.post((req, res) => {
// 		console.log(req.body.username);
//        	res.set('Content-Type', 'text/html')
// 	    res.sendFile(__dirname + '/public/student_dashboard.html');
// 	});

// app.route('/login2')
// 	.get(myModule.isauthenticated, (req, res) => {
//        	res.set('Content-Type', 'text/html')
// 	    res.sendFile(__dirname + '/public/profile.html');
// 	});
// app.route('/login3')
// 	.get(myModule.isauthenticated, (req, res) => {
//        	res.set('Content-Type', 'text/html')
// 	    res.sendFile(__dirname + '/public/editProfile.html');
// 	});

// app.route('/user')
// 	.get(myModule.isauthenticated, (req, res) => {
//        	res.set('Content-Type', 'text/html')
// 	    res.sendFile(__dirname + '/public/dashboard.html');
// 	});
// app.route('/login4')
// 	.get(myModule.isauthenticated, (req, res) => {
//        	res.set('Content-Type', 'text/html')
// 	    res.sendFile(__dirname + '/public/dashboard1.html');
// 	});
app.route('/checkrole')
	.post((req, res) => {
		
		email=req.body.email;
		pass=req.body.pass;
		console.log(email);
		console.log(pass);
		var q = "SELECT role from Login WHERE email = ? AND password = ?";
		connection.query(q, [email,pass], function (err, result) {
		if (err){
			res.end(err);
		} else {
			       	
				if (result.length){
					console.log(result);
					sess = req.session;
					sess.email=req.body.email;
					if(result[0].role=='student'){
					res.set('Content-Type', 'text/html')
	   				res.sendFile(__dirname + '/public/student_dashboard.html');
	   				}
	   			else if(result[0].role=='warden'){
					res.set('Content-Type', 'text/html')
	   				res.sendFile(__dirname + '/public/warden_dashboard.html');
	   				}
	   			else if(result[0].role=='guard'){
					res.set('Content-Type', 'text/html')
	   				res.sendFile(__dirname + '/public/guard_dashboard.html');
	   				}
				}
				else
					{
					res.set('Content-Type', 'text/html')
    			    res.sendFile(__dirname + '/public/index.html');	
				}
		 	};
		 });			
			
		});
	

// app.route('/update_folder')
// 	.post((req, res) => {
//        queries = Number(req.body.cid);
//        	console.log(queries);
//        	console.log("update folder ke andar agya");
//        	subject = queries;
//        	console.log('now subject is');
//        	console.log(subject);
// 		});

// app.route('/userData')
// 	.post((req, res) => {
// 	var sid = 1;
// 		var q = "SELECT * from user_data WHERE  id = ?";
// 		connection.query(q, [sess.userid], function (err, result) {
// 		if (err){
// 			res.end(err);
// 		} 
// 		else {
// 			console.log('user data picked up');
// 			console.log(result);
// 				res.json(result);
// 			}
// 		});
// 		});



// app.route('/username')
// 	.post((req, res) => {
// 		var q = "SELECT name from user_data WHERE  id = ?";
// 		connection.query(q, [sess.userid], function (err, result) {
// 		if (err){
// 			res.end(err);
// 		} 
// 		else {
// 			console.log('user data picked up');
// 			console.log(result);
// 				res.json(result);
// 			}
// 		});
// 		});
//  //[sess.email,name,address,occupation,phone]

// app.post('/insert_details', function (req, res) {
// 		console.log('Inside insert function');

// 		var name = req.body.name;
// 		console.log(name);
// 		var address = req.body.addr;
// 		var phone = req.body.phone;
// 		var occupation = req.body.occ;
// 		console.log(address);
// 		console.log(phone);
// 		console.log(occupation);
// 		sess.occ=occupation;

// 			var z = "INSERT INTO roles (gmail,permission) VALUES(?,?)";
// 					var permission = occupation;
// 					connection.query(z, [sess.email,permission], function (err, result) {
// 					if (err)
// 						res.end(err);
// 					else{
// 						console.log(occupation);
// 						console.log('added in roles table');
						

// 					var q="SELECT id from roles WHERE gmail=?";
// 					connection.query(q, [sess.email], function (err, result) {
// 					if (err){
// 						res.end(err);
// 					} else {
// 						sess.userid=result[0].id;
// 						//sess.id=result[0]
// 					}
// 				});
// 					}
// 				});

// 		var q = "INSERT INTO user_data VALUES(?,?,?,?,?,?)";
// 		connection.query(q,[null,sess.email,name,address,occupation,phone], function (err, result) {
// 		if (err){
// 			console.log("Error occurred");
// 			res.end(err);
// 		} 
// 		else {
// 			console.log(occupation);
// 			console.log(' data inserted successfully');
// 		res.set('Content-Type', 'text/html')
// 		if(occupation == 'user')
// 	    res.sendFile(__dirname + '/public/dashboard.html');
// 		if(occupation == 'teacher')
// 		res.sendFile(__dirname + '/public/dashboard1.html');
// 			}
// 		});
//    });


// app.post('/update_details', function (req, res) {
// 		console.log('Inside update function');

// 		var name = req.body.name;
// 		console.log(name);
// 		var address = req.body.addr;
// 		var phone = req.body.phone;
// 		console.log(address);
// 		console.log(phone);
// 		var q = "UPDATE user_data SET name = ? , addr = ?, phn = ? where id = ?";
// 		connection.query(q,[name,address,phone,sess.userid], function (err, result) {
// 		if (err){
// 			console.log(err);
// 			res.end(err);
// 		} 
// 		else {
// 			console.log(sess.occ);
// 			console.log(' data updated successfully');
// 		res.set('Content-Type', 'text/html')
// 		var occupation = sess.occ;
// 		if(occupation == 'user')
// 	    res.sendFile(__dirname + '/public/dashboard.html');
// 		if(occupation == 'teacher')
// 		res.sendFile(__dirname + '/public/dashboard1.html');
// 			}
// 		});
//    });






// function getDirectories(path) {
//   return fs.readdirSync(path).filter(function (file) {
//     return fs.statSync(path+'/'+file).isDirectory();
//   });
// }

// app.route('/getMaps')
// 	.get((req, res) => {
// 		var i;
// 		var archive='';
// 		var txt;
// 		var id;
// 		// var basedir = path.join(__dirname, 'data/admin/facet')
// 		// var dirs = getDirectories(basedir);
// 		var q = "SELECT id,description FROM map_ids";
// 		connection.query(q,function (err, result) {
// 		if (err){
// 			console.log(err);
// 			res.end(err);
// 		} else {
// 			var i;
// 			var length = result.length-1;
// 			for(i=0;i<=length;i++){
// 				txt = result[i]["description"].split('_').join(' ');
// 				id = result[i]["id"];
// 				console.log('uth ke aya');
// 				console.log(id);
// 				txt = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
// 				archive += "<a href='#' id="+id+" class='' onclick='callMap(" +id+");'>"+ txt+" Competency & Path</a>END";
// 			}
// 			res.end(archive);
// 		}
// 		});
// 	});

// app.route('/getmyMaps')
// 	.get((req, res) => {
// 		var i;
// 		var archive='';
// 		var txt;
// 		var id;
// 		// var basedir = path.join(__dirname, 'data/admin/facet')
// 		// var dirs = getDirectories(basedir);
// 		var q = "SELECT id,description FROM map_ids";
// 		connection.query(q,function (err, result) {
// 		if (err){
// 			console.log(err);
// 			res.end(err);
// 		} else {
// 			var i;
// 			var length = result.length-1;
// 			for(i=0;i<=length;i++){
// 				txt = result[i]["description"].split('_').join(' ');
// 				id = result[i]["id"];
// 				console.log('uth ke aya');
// 				console.log(id);
// 				txt = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
// 				archive += "<a href='#' id="+id+" class='list-group-item list-group-item-action bg-light' onclick='callMap(" +id+");'>"+ txt+" Competency & Path</a>END";
// 			}
// 			res.end(archive);
// 		}
// 		});
// 	});

// app.route('/getmyMaps1')
// 	.get((req, res) => {
// 		var i;
// 		var archive='';
// 		var txt;
// 		var id;
// 		// var basedir = path.join(__dirname, 'data/admin/facet')
// 		// var dirs = getDirectories(basedir);
// 		var q = "SELECT id,description FROM map_ids WHERE id IN (SELECT course_id from file_uploads where user_id = ?)";
// 		connection.query(q,[sess.userid],function (err, result) {
// 		if (err){
// 			console.log(err);
// 			res.end(err);
// 		} else {
// 			var i;
// 			var length = result.length-1;
// 			for(i=0;i<=length;i++){
// 				txt = result[i]["description"].split('_').join(' ');
// 				id = result[i]["id"];
// 				console.log('uth ke aya');
// 				console.log(id);
// 				txt = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
// 				archive += "<a href='#' id="+id+" class='list-group-item list-group-item-action bg-light' onclick='callMap(" +id+");'>"+ txt+" Competency & Path</a>END";
// 			}
// 			res.end(archive);
// 		}
// 		});
// 	});
// app.route('/getmyuploads1')
// 	.get((req, res) => {
// 		var i;
// 		var archive='';
// 		var txt;
// 		var id;
// 		// var basedir = path.join(__dirname, 'data/admin/facet')
// 		// var dirs = getDirectories(basedir);
// 		var q = "SELECT id,description FROM map_ids";
// 		connection.query(q,function (err, result) {
// 		if (err){
// 			console.log(err);
// 			res.end(err);
// 		} else {
// 			var i;
// 			var length = result.length-1;
// 			for(i=0;i<=length;i++){
// 				txt = result[i]["description"].split('_').join(' ');
// 				id = result[i]["id"];
// 				console.log('uploads');
// 				console.log(id);
// 				txt = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
// 				archive += "<a href='#' id="+id+" class='list-group-item list-group-item-action bg-light' onclick='upload_it(" +id+");'>"+ txt+" EXTERNAL UPLOADS</a>END";
// 			}
// 			console.log('loop finish archive start');
// 			//console.log(archive);
// 			res.end(archive);
// 		}
// 		});
// 	});

// 	// var r = "SELECT * FROM file_uploads where user_id = ? AND course_id = ?";
// 	// 			connection.query(r,[sess.userid,id], function(err1,result1){
// 	// 				console.log(result1);
// 	// 				if(err)
// 	// 				{
// 	// 					console.log('1');
// 	// 					console.log(err);
// 	// 					res.end(err);
// 	// 				}
// 	// 				else{
// 	// 					if(result1.length)
// 	// 					{
// 	// 						console.log('2');
// 	// 						archive += "<a href='#' id="+id+" class='list-group-item list-group-item-action bg-light' onclick='upload_it(" +id+");'>"+ txt+" EXTERNAL UPLOADS**</a>END";
// 	// 					}
// 	// 					else
// 	// 					{
// 	// 						console.log('3');
// 	// 						archive += "<a href='#' id="+id+" class='list-group-item list-group-item-action bg-light' onclick='upload_it(" +id+");'>"+ txt+" EXTERNAL UPLOADS</a>END";
// 	// 					}
// 	// 				}	
// 	// 			});
// 	// 			console.log('query finish');
// app.route('/getmyuploads')
// 	.get((req, res) => {
// 		var i;
// 		var archive='';
// 		var txt;
// 		var id;
// 		// var basedir = path.join(__dirname, 'data/admin/facet')
// 		// var dirs = getDirectories(basedir);
// 		var q = "SELECT id,description FROM map_ids";
// 		connection.query(q,function (err, result) {
// 		if (err){
// 			console.log(err);
// 			res.end(err);
// 		} else {
// 			var i;
// 			var length = result.length-1;
// 			for(i=0;i<=length;i++){
// 				txt = result[i]["description"].split('_').join(' ');
// 				id = result[i]["id"];
// 				console.log('uth ke aya');
// 				console.log(id);
// 				txt = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
// 				archive += "<a href='#' id="+id+" class='list-group-item list-group-item-action bg-light' onclick='upload_it(" +id+");'>"+ txt+" EXTERNAL UPLOADS</a>END";
// 			}
// 			res.end(archive);
// 		}
// 		});
// 	});
// app.route('/My_uploads')
// 	.get((req, res) => {
// 		var i;
// 		var archive='';
// 		var txt;
// 		var id;
// 		// var basedir = path.join(__dirname, 'data/admin/facet')
// 		// var dirs = getDirectories(basedir);
// 		var q = "SELECT id,description FROM map_ids where id in (select course_id from uploads where user_id = ? )";
// 		connection.query(q,[sess.userid],function (err, result) {
// 		if (err){
// 			console.log(err);
// 			res.end(err);
// 		} else {
// 			var i;
// 			var length = result.length-1;
// 			for(i=0;i<=length;i++){
// 				txt = result[i]["description"].split('_').join(' ');
// 				id = result[i]["id"];
// 				console.log('uth ke aya');
// 				console.log(id);
// 				txt = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
// 				archive += "<a href='#' id="+id+" class='' onclick='upload_it(" +id+");'>"+ txt+" EXTERNAL UPLOADS</a>END";
// 			}
// 			res.end(archive);
// 		}
// 		});
// 	});

// app.post('/all_courses', function (req, res) {
// 		console.log("In server2 js file under all_courses");  
// 		var q = "SELECT cname FROM courses";
// 		connection.query(q, function (err, result) {
// 		if (err){
// 			res.end(err);
// 		} else {
// 			console.log('displayed all courses');
// 			res.json(result);
// 		}
// 		});
//    });
// app.route('/getpath')
// 		.post((req, res) => {
// 			var id = req.body.id;
// 			var q = "SELECT dir FROM map_ids WHERE id=?";
// 			console.log("into getpath");
// 			connection.query(q, [id], function (err, result) {
// 			if (err){

// 				res.end(err);
// 			} else {

// 				res.end(result[0].dir);
// 			}
// 			});
// 		});

// app.route('/add_link')
// 		.post((req, res) => {
// 			var cid = req.body.cid;
// 			var title = req.body.title_l;
// 			var link = req.body.link;
// 			var q = "INSERT INTO uploads VALUES(?,?,?,?,?)";
// 			console.log("into add_link");
// 			connection.query(q, [null,sess.userid,cid,link,title], function (err, result) {
// 			if (err){

// 				res.end(err);
// 			} else {
// 				console.log("link inserted");
// 			}
// 			});
// 		});

// app.route('/show_link')
// 	.post((req, res) => {
//        queries = Number(req.body.cid);
//        	console.log(queries);
//        	console.log("show link ke andar agya");
// 		var q = "SELECT link,title from uploads WHERE  course_id = ? and user_id = ?";
// 		connection.query(q, [queries,sess.userid], function (err, result) {
// 		if (err){
// 			res.end(err);
// 		} 
// 		else {
// 			console.log('all links of this subject for this user picked up');
// 			console.log(result);
// 			res.json(result);
// 			}
// 		});
// 		});

// app.post('/upload', multer(multerConfig).array('photo',10),function(req, res){
//        var cid = subject;
//        console.log(cid);
//        const files = req.files;
//        console.log(files);
//        var filename="";
//        for(i=0;i<files.length;i++)
//        {
//        	filename+=files[i].originalname+",";
//        } 
// 			var desc = req.body.desc;
// 			var q = "INSERT INTO file_uploads VALUES(?,?,?,?,?)";
// 			console.log("into uploads_file");
// 			connection.query(q, [null,sess.userid,cid,filename,desc], function (err, result) {
// 			if (err){

// 				res.end(err);
// 			} else {
// 				console.log("link inserted");
// 			}
// 			});
//         res.set('Content-Type', 'text/html')
// 	    res.sendFile(__dirname + '/public/dashboard1.html');
//   }

// );
// app.route('/create_map')
// 		.post((req, res) => {
// 			var map = req.body.mapname;
// 			var q = "INSERT INTO map_ids VALUES(?,?,?)";
// 			console.log("into create map");
// 			console.log(map);
// 			var path = "/home/shashank/Documents/Gooru/data/admin/facet/"+map;
// 			console.log(path);
// 			connection.query(q, [null,map,path], function (err, result) {
// 			if (err){

// 				res.end(err);
// 			} else {
// 				console.log("map inserted");
// 				var r = "SELECT MAX(id) as newid FROM map_ids";
// 				connection.query(r,function(err1, result1)
// 				{
// 					if(err){res.end(err);}
// 					else{ subject = result1[0].newid; 
// 						console.log("subject initialized");
// 						console.log(result1);}
// 				});
// 				// res.set('Content-Type', 'text/html')
// 	  	// 		  res.sendFile(__dirname + '/public/dashboard1.html');
// 			}
// 			});
// 		});


// app.route('/uploadresource')
// 	.post((req, res) => {
// 		var form = new formidable.IncomingForm();
// 		form.parse(req, function (err, fields, files) {

// 			var dir = files.competency.name.split('_').slice(0,-1).join('_')
// 			var newdir = path.join(__dirname,'data/admin/facet', dir)
// 			!fs.existsSync(newdir) && fs.mkdirSync(newdir);

// 			var oldpathcomp = files.competency.path;
// 			var filepathcomp = path.join(newdir,files.competency.name);
// 			fs.rename(oldpathcomp, filepathcomp, function (err) {
// 		        if (err) {
// 		        	res.end(err);
// 		        } else {
// 			        res.end('Uploaded');
// 							var q = "INSERT INTO map_ids (description,dir) VALUES (?,?)";
// 							connection.query(q, [dir,newdir], function (err, result) {
// 							if (err){
// 								res.end(err);
// 							} else {
// 								console.log('New Data Inserted');
// 								res.end("Successful Insertion Of DATA");
// 							}
// 							});
// 		        }
// 		      });


// 			fs.copyFile(filepathcomp, path.join(__dirname, 'public', files.competency.name), (err) => {
// 			  if (err) throw err;
// 			  console.log('copied MAP to desired LOC');
// 			});




// 			var oldpathlpath = files.lpath.path;
// 			var filepathlpath = path.join(newdir,files.lpath.name);

// 			console.log(oldpathlpath);
//                         console.log(filepathlpath);

// 			fs.rename(oldpathlpath, filepathlpath, function (err) {
// 		        if (err) {
// 		        	res.end(err);
// 		        } else {
//                                 console.log('uploaded');
// 			        res.end('Uploaded');
// 		        }

// 		      });
//                        fs.copyFile(filepathlpath, path.join(__dirname, 'public', files.lpath.name), (err) => {
// 			  if (err) throw err;
// 			  console.log('copied PATH to desired LOC');
// 			});

// 		});
// 	});







var server = app.listen(5555, function () {
    console.log('Node server is running..');
    console.log('Browser to http://127.0.0.1: 5555');
});
