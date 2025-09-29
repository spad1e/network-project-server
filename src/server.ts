import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
