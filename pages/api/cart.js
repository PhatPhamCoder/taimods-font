import { mongooseConnect } from "@/lib/mongoose";
import { Game } from "@/models/Game";

export default async function handle(req, res) {
  await mongooseConnect();
  const ids = req.body.ids;
  res.json(await Game.find({ _id: ids }));
}
