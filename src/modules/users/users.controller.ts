import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IsPublic } from "src/common/decorators/is-public.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user-entity";
import { UsersService } from "./users.service";

@ApiTags("Usuario")
@Controller("usuarios")
export class UserController {
  constructor(private readonly userService: UsersService) {}
  

  @Post("/criar-usuario")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Criar um novo usuario" })
  @ApiResponse({ status: 201, description: "Usuario criado" })
  @ApiResponse({ status: 409, description: "Usuario ja existe" })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

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
  async findOne(@Param('uuid') uuid: string): Promise<UserEntity | undefined> {
    return this.userService.findOne({uuid});
  }
}
