const express = require("express");
const app = express();
const reader = require('xlsx')
const { v4: uuidv4 } = require('uuid')
const router = express.Router();
const cors=require("cors");
const spread_sheet = require('spread_sheet');

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
};

app.use(cors(corsOptions));

var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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
	const fileName = 'todo.xlsx';
	const workbook = reader.readFile(fileName);
	  
	let todo =  {
					id: uuidv4(),
					task: req.body.task,
					isCompleted: false
				};

	let todos = reader.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
	todos.push(todo);
	
	const workSheet = reader.utils.sheet_add_json(workbook.Sheets[workbook.SheetNames[0]], todos);

	const s = reader.writeFile(workbook, fileName);

	res.json(todo);
});

router.delete('/todos/:id', (req, res) => {
	const fileName = 'todo.xlsx';
	const workbook = reader.readFile(fileName);
	const workSheet = workbook.Sheets[workbook.SheetNames[0]];

	res.json(req.params.id);
});

//Listen for incoming requests
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started, listening PORT ${PORT}`))