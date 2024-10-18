import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { IsPublic } from "src/common/decorators/is-public.decorator";
import { UserEntity } from "./entities/user-entity";
import { UsersService } from "./users.service";

@ApiTags("Usuario")
@Controller("usuarios")
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Listar todos os usuarios" })
  @ApiResponse({ status: 200, description: "Lista de usuarios" })
  @ApiResponse({ status: 404, description: "Falha ao encontrar os usuarios" })
  async findAll(): Promise<Partial<UserEntity>[]> {
    return this.userService.findAll();
  }

  @IsPublic()
  @Get("/:uuid")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Listar um usuario pelo uuid" })
  @ApiResponse({ status: 200, description: "Usuario encontrado" })
  @ApiResponse({ status: 404, description: "Usuario nao encontrado" })
  async findOne(@Query() createUserDto: Partial<User>) {
    return this.userService.findOne(createUserDto);
  }
}
