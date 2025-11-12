import express from "express";
import { UserController } from "./controller/user";
import { PixController } from "./controller/pix";
import { BoletoController } from "./controller/boleto";
import { CartaoController } from "./controller/cartao";
import { CrmController } from "./controller/crm";

export const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

UserController();
PixController();
BoletoController();
CartaoController();
CrmController();

app.listen(3008, () => {
  console.log("Server is running on port 3008");
});
