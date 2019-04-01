import express from 'express';
// import '@babel/polyfill';
import routes from './routes/route';

const app = express();

app.use(express.json());
app.use(routes);

export default app;
