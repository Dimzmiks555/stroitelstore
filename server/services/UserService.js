
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

        const {email, password, name, surname, phone, role} = body

        if (!email || !password) {
            return
        }

        const candidate = await UserModel.findOne({where: {email}})

        if (candidate) {
            return
        }

        const hashPassword = await bcrypt.hash(password, 5)

        const user = await UserModel.create({
            email, 
            role, 
            password: hashPassword, 
            phone, 
            name, 
            surname
        })

        const token = jwt.sign(
            {
                id: user.id, 
                email: email,
                role,
            },
            secret_key,
            {
                expiresIn: '24h'
            }
        )

        return token


    }

    async login(body) {

        const {email, password} = body


        const user = await UserModel.findOne({where: {email}})

        if (!user) {
            return
        }

        let comparePassword = bcrypt.compareSync(password, user.password)

        
        let token;

        if(!comparePassword) {
            return
        }
        const token = jwt.sign(
            {
                id: user.id, 
                email: email,
                role,
            },
            secret_key,
            {
                expiresIn: '24h'
            }
        )

        return token


    }


    async check(body) {

        const {email, password} = body


        
        
        const token = jwt.sign(
            {
                id: user.id, 
                email: email,
                role,
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