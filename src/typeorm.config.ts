import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: "localhost",
    port: 3000,
    username: "root",
    password: "HaGunHAVART!@",
    database: "HAVART",
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
};