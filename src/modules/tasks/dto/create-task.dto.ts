import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTaskDto {
	@ApiProperty({
		required: true,
		description: "Titulo da tarefa.",
		example: "Task 1",
	})
	@IsString()
	title: string;

	@ApiProperty({
		description: "Descrição da tarefa.",
		example: "Requisitos para a tarefa: 1, 2, 3",
	})
	@IsString()
	description: string;

	@ApiProperty({
		description: "Prioridade da tarefa.",
		example: "Low",
	})
	@IsString()
	priority: string;

	@ApiProperty({
		description: "Status da tarefa.",
		example: false,
	})
	completed?: boolean;
}
