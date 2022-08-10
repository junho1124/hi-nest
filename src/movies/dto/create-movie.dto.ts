import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {
    @IsString()
    readonly title: string;
    @IsNumber()
    readonly year: number;
    // 리스트의 경우 각각의 element를 체크한다는 의미로 each: true
    @IsOptional()
    @IsString({each: true})
    readonly genres: string[];
}