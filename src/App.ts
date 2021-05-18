import path from "path";
import express from "express";

// FIXME: JUST TO TEST
import cors from "cors";

import dotenv from "dotenv";
import connectMongoDB from "./repositories/db/mongo/mongoConnect";
import productRoutes from "./adapters/routes/product/products";
import userRoutes from "./adapters/routes/user/users";
import orderRoutes from "./adapters/routes/order/order";
import uploadRoutes from "./adapters/routes/upload/upload";
import { notFound, errorHandler } from "./adapters/middleware/errorMiddleware";

dotenv.config();
connectMongoDB();

const app = express();

// ATTENTION: JUST TO TEST
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running port ${PORT}`));
