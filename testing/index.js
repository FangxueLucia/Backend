import express from 'express';
import {suma} from './function.js'

const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    const { a, b } = req.body;
    // validate inputs simply
    if (typeof a !== 'number' || typeof b !== 'number') {
        return res.status(400).json({ error: 'a and b must be numbers' });
    }
    const result = suma(a, b);
    // respond with JSON so tests can assert easily
    return res.status(200).json({ result });
})


app.listen(3000, () => {
    console.log("puerto 3000")
})

export default app