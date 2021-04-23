import { Schema, model, Document, Types, Mongoose } from "mongoose";

const ColectivoSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  vacuna: { type: String },
});

export default model("Colectivo", ColectivoSchema);