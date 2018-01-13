
const express = require('express');
const hbs = require('hbs');
const fs = require("fs");
var app = express();

const port = process.env.PORT || 3000; // Heroku setz die Variable

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=> {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
      if (err) {
        console.log('Unable to append to server.log');
        
      }
  });
    
  next();
});

app.use((req,res,next)=> {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance page',
      //  currentYear: new Date().getFullYear()
    });
});

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

console.log(__dirname );

app.use(express.static(__dirname + '/public'));


app.get('/', ((req, res) => {
  //  res.send('<h1>hello Express!</h1>');
  res.render('home.hbs', {
     welcomeMessage: 'Moin, moin herzlich willkommen' ,
     pageTitle: 'Home page',
  });
}));

app.get('/about', ((req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
      //  currentYear: new Date().getFullYear()
    });
})
);

app.get('/bad', ((req,res) => {
   res.send({

       errorMessage : 'Error way'
   });
}))

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

