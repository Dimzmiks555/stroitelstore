
import { GroupModel, AttributeModel, ImageModel } from '../models/models.js';
import multer from 'multer'
import nodemailer from 'nodemailer'


class MailService {

    async create(body) {
        
        const {to, subject, text} = body

        console.log(body)

        const transporter = nodemailer.createTransport({
            // port: 465,               // true for 465, false for other ports
            service: "Mail.ru",
            auth: {
                user: 'stroitelstore@mail.ru',
                pass: 'aewZhHzuJtvmfV4wAY7w',
                },
            // secure: true,
            });

            const mailData = {
                from: 'stroitelstore@mail.ru',
                to: to,
                subject: subject,
                text: text
            }

            console.log(mailData)

            transporter.sendMail(mailData, (err, info) => {
                if (err) {
                    console.log(err)
                }

                console.log('sended')
            } )
    }

    


    async getOne(params ,result) {
    
    }
}


export default new MailService();