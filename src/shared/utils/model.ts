import { Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class BaseModel extends Document {
  @Prop({ default: true })
  isActive: boolean

  @Prop({ default: false })
  isDeleted: boolean
}
