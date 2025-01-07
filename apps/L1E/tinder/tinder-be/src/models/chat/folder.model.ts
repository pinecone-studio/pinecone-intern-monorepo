import { Schema, model, Document, models } from 'mongoose';

interface IFolder extends Document {
  userOne: Schema.Types.ObjectId; // Reference to a user
  userTwo: Schema.Types.ObjectId; // Reference to a user
  createdAt: Date;
}

const folderSchema = new Schema<IFolder>({
  userOne: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  userTwo: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  createdAt: { type: Date, default: Date.now },
});

folderSchema.index({ userOne: 1, userTwo: 1 }, { unique: true });
folderSchema.index({ userTwo: 1, userOne: 1 });

const FolderModel = models.Folder || model<IFolder>('Folder', folderSchema);

export default FolderModel;
