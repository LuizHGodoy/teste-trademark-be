import { Task } from "@prisma/client";

export class TaskEntity {
	uuid: string;
	title: string;
	priority: string;
	description: string;
	completed: boolean;
	userUuid: string;

	constructor(partial: Partial<Task>) {
		Object.assign(this, partial);
	}
}
