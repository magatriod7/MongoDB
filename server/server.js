import app from "./app";
import config from "./config/index";

const { PORT, JWT_SECRET, MONGO_URI } = config;

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
  console.log(`JWT_SECRET ${JWT_SECRET}`);
  console.log(`MONGO_URI ${MONGO_URI}`);

});
