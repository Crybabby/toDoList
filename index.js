import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let newTexts = ['Read the book', 'Kill russian chilldren'];
let newTextsWork = ['papa', 'gima', 'body'];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("styles"));
app.use(express.static("img"));

function formatCurrentDate(date) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  return `${dayOfWeek}, ${month} ${dayOfMonth}`;
}



app.get("/nav-today", (req, res) => {
  const currentDate = new Date(); 
  res.render("today.ejs", {currentDate, formatCurrentDate, newTexts});

})

app.get("/nav-work", (req, res) => {
  res.render("work.ejs", {newTextsWork});
})

app.post("/addText", (req, res) =>{
  let newText = req.body.newText;
  newTexts.push(newText);
  res.redirect('/nav-today');
})

app.post("/addTextWork", (req, res) =>{
  let newTextWork = req.body.newTextWork;
  newTextsWork.push(newTextWork);
  res.redirect('/nav-work');
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  