import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Surrounding, SurroundingDocument } from "../model/surrounding";
import { SurroundingAddDTO, SurroundingAddDTOResponse } from "./dto/surrounding.add.dto";

@Injectable()
export class SurroundingService {
  constructor(
    @InjectModel(Surrounding.name) private surroundingModel: Model<SurroundingDocument>
  ) {
  }

  async add (data: SurroundingAddDTO) {
    let response = new SurroundingAddDTOResponse()
    let resModel = new this.surroundingModel(data)
    const res = await resModel.save().then(async returning => {
      return await returning
    })

    if (res) {
      response.message = 'Surrounding added successfully'
      response.status = HttpStatus.OK
      response.returning = await res
    } else {
      response.message = 'Surrounding failed to add'
      response.status = HttpStatus.BAD_REQUEST
    }
    return response
  }
}