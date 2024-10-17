import { connect } from 'mongoose';
import { SecretGroupModel } from './_models';

export async function GET() {
  await connect(process.env.MONGO_URI as string);

  const data = await SecretGroupModel.find();

  return Response.json(data);
}
