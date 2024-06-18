import { Schema, model, Document } from 'mongoose'

import { UserType } from '@modules/users/domain/schemas/user.schema'

export interface UserDocument extends Document, UserType {}

const userSchema = new Schema<UserDocument>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  securityStamp: { type: String, required: false, default: null },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role', default: null }],
  isActive: { type: Boolean, default: true }
})

export const UserModel = model<UserDocument>('User', userSchema)
