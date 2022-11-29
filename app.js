const express = require("express");
const app = express();
const reader = require('xlsx')
const { v4: uuidv4 } = require('uuid')
const router = express.Router();
const cors=require("cors");

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
};

app.use(cors(corsOptions));
app.use(express.json({
    extended: false
}));
app.use(express.urlencoded({ extended: false }));

app.use(`/api/`, router);

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

router.get('/todos', (req, res) => {
	const file = reader.readFile('todo.xlsx')
	  
	let data = []
	  
	const sheets = file.SheetNames
	  
	for(let i = 0; i < sheets.length; i++)
	{
	   const temp = reader.utils.sheet_to_json(
	        file.Sheets[file.SheetNames[i]])
	   temp.forEach((res) => {
	      data.push(res)
	   })
	}
  
	res.json(data);
});

router.post('/todos', (req, res) => {
	const file = reader.readFile('todo.xlsx')
	  
	let todo = {
		test: req.body,
		task: req.body.task,
		id: uuidv4(),
		isCompleted: false
	};
	  
	console.log(todo);

	res.json(todo);
	// const ws = reader.utils.json_to_sheet(student_data)
	  
	// reader.writeFile(file,'test.xlsx');
});

//Listen for incoming requests
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started, listening PORT ${PORT}`))