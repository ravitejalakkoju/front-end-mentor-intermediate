const express = require('express');

const app = express();
const reader = require('xlsx')
const { v4: uuidv4 } = require('uuid')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static('public'));

app.get('/api/todos', (req, res) => {
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

app.post('/api/todos', (req, res) => {
	const file = reader.readFile('todo.xlsx')
	  
	let todo = req.body;
	todo.isCompleted = false;
	todo.id = uuidv4();
	  
	console.log(todo);

	res.json(todo);
	// const ws = reader.utils.json_to_sheet(student_data)
	  
	// reader.writeFile(file,'test.xlsx');
});

//Listen for incoming requests
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started, listening PORT ${PORT}`))