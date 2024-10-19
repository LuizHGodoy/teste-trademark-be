import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TasksService } from './tasks.service';

@ApiTags("Tarefas")
@Controller('tarefas')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post("/criar-tarefa")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Criar uma nova tarefa" })
  @ApiResponse({ status: 201, description: "Tarefa criada" })
  @ApiResponse({ status: 409, description: "Tarefa ja existe" })
  @ApiResponse({ status: 400, description: "Falha ao criar a tarefa" })
  async create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: User): Promise<TaskEntity> {
   
    return this.tasksService.create(createTaskDto, user.uuid);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Listar todas as tarefas" })
  @ApiResponse({ status: 200, description: "Lista de tarefas" })
  @ApiResponse({ status: 404, description: "Falha ao encontrar as tarefas" })
  async findAll(@CurrentUser() user: User): Promise<Partial<TaskEntity>[]> {
    return this.tasksService.findAll(user.uuid)
  }

  @Get("/:uuid")
  async findOne(@Param('uuid') uuid: string): Promise<Partial<TaskEntity | undefined>> {
    
    return this.tasksService.findOne({uuid});
  }

  @Patch('/:uuid')
  async update(@Param('uuid') uuid: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Partial<TaskEntity>> {
    return this.tasksService.update(uuid, updateTaskDto);
  }

  @Delete('/:uuid')
  async remove(@Param('uuid') uuid: string): Promise<void> {
    return this.tasksService.remove(uuid);
  }
}
