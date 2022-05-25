import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

let app = express();

app.use(express.json())

let PORT = process.env.PORT || 3000;

const users = []

app.get('/users', (req, res) => {
    res.status(200).json(users);
})

app.post('/users', async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = { name: req.body.name, password: hashedPass};
        users.push(user);
        res.status(201).send();
    } catch (error) {
        res.status(501).send()
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name);
    if(user == null) {
        return res.status(400).send("Cannot find user");
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("success");
        } else {
            res.send('Wrong Password');
        }
    } catch {
        res.status(500).send()
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});