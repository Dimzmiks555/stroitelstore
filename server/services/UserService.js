
// import GoodModel from '../models/GoodModel.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Sequelize from "sequelize";
import { GroupModel, UserModel } from '../models/models.js';
 

const sequelize = new Sequelize("1c_base", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
  });

const secret_key = 'SPAIN'


class UserService {

    async registration(body) {

        const { password, name, surname, phone, role} = body

        if (!phone || !password) {
            return
        }

        const candidate = await UserModel.findOne({where: {phone}})

        if (candidate) {
            return
        }

        
        const hashPassword = await bcrypt.hash(password, 5)

        const user = await UserModel.create({
            role, 
            password: hashPassword, 
            phone, 
            name, 
            surname
        })

        const token = jwt.sign(
            {
                id: user.id, 
                name,
                surname,
                role,
                
                phone: user.phone
            },
            secret_key,
            {
                expiresIn: '24h'
            }
        )

        return token


    }

    async login(body) {

        const {phone, password} = body


        const user = await UserModel.findOne({where: {phone}})

        if (!user) {
            return {message: 'Пользователя не существует' }
        }

        let comparePassword = bcrypt.compareSync(password, user.password)


        if(!comparePassword) {
            return {message: 'Неверный пароль' }
        }

        
        console.log(comparePassword)
        const token = jwt.sign(
            {
                id: user.id, 
                phone: phone,
                name: user.name,
                surname: user.surname,
                role: user.role,
                
            },
            secret_key,
            {
                expiresIn: '24h'
            }
        )

        return token


    }


    async check(body) {

        const {phone, password} = body

        const user = await UserModel.findOne({where: {phone}})
        
        
        const token = jwt.sign(
            {
                id: user.id, 
                name: user.name,
                surname: user.surname,
                role: user.role,
                phone: phone
            },
            secret_key,
            {
                expiresIn: '24h'
            }
        )

        return token


    }

}


export default new UserService();