import app from "./app";
import config from "./config/index";

const { PORT } = config;

app.get('/', (req, res) => {
    res.send(`start`);
})

app.listen(PORT, () => {
  console.log(`connected port ${PORT}`);
});