import { IsNotEmpty, IsString } from "class-validator";


export class CreateProjectDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    overView: string;
}
