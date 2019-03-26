import express from 'express';
import '@babel/polyfill';
import routes from './routes/route.js';


const app = express();


app.use(express.json());
app.use(routes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});


export default app;