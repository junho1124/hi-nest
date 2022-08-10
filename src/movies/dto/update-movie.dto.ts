import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

///PartialType: 상위의 DTO의 데이터를 선택적으로 받을 수 있도록 종속할 수 있다.
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}