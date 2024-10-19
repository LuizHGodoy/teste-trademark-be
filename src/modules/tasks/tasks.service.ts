import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Task } from "@prisma/client";
import { PrismaService } from "src/services/prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskEntity } from "./entities/task.entity";

@Injectable()
export class TasksService {
	constructor(private prisma: PrismaService) {}

	async create(
		createTaskDto: CreateTaskDto,
		userUuid: string,
	): Promise<TaskEntity> {
		const data = {
			...createTaskDto,
			completed: false,
			userUuid: userUuid,
		};

		const createdTask = await this.prisma.task.create({ data });

		return new TaskEntity(createdTask);
	}

	async findAll(userUuid: string): Promise<Partial<TaskEntity>[]> {
		const tasks = await this.prisma.task.findMany({
			where: {
				userUuid,
			},
		});

		return tasks.map((task) => ({
			...new TaskEntity(task),
			userUuid: undefined,
		}));
	}

	async findOne(
		where: Partial<Task>,
	): Promise<Partial<TaskEntity | undefined>> {
		const task = await this.prisma.task.findFirst({ where });

		if (!task) {
			throw new HttpException("Tarefa não encontrada", HttpStatus.NOT_FOUND);
		}

		return await this.prisma.task.findFirst({ where });
	}

	async update(
		uuid: string,
		updateTaskDto: UpdateTaskDto,
	): Promise<Partial<TaskEntity>> {
		const taskExists = await this.prisma.task.findFirst({ where: { uuid } });

		if (!taskExists) {
			throw new HttpException("Task não encontrado", HttpStatus.NOT_FOUND);
		}

		const updatedTask = await this.prisma.task.update({
			where: {
				uuid,
			},
			data: updateTaskDto,
		});

		return new TaskEntity(updatedTask);
	}

	async remove(uuid: string): Promise<void> {
		const deletedTask = await this.prisma.task.delete({
			where: {
				uuid,
			},
		});

		if (!deletedTask) {
			throw new HttpException("Task não encontrado", HttpStatus.NOT_FOUND);
		}

		return;
	}
}
