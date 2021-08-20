import OneCModel from "./OneCModel.js";
import fs from 'fs'
import XMLParser from 'xml2js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { DOMParser }  from 'xmldom';
import fetch from 'node-fetch';
import { response } from "express";

const __dirname = dirname(fileURLToPath(import.meta.url));
class OneCService {
    // async create(tenders) {
    //     const createdTenders = await Tenders.create(...post);
    //     return createdTenders;
    // }
    async create(json) {
        
        let data = json

        let classificator = data['Классификатор']
        let catalog = data['Каталог']

        classificator[0]['Группы'][0]['Группа'].forEach(item => {
            console.log(item['Ид']) 
            console.log(item['Наименование'])

            OneCModel.create({
                guid: item['Ид'][0],
                title: item['Наименование'][0]
            })
            .then((result)=>{
                console.log(result)
            })
            .catch(err=>console.log(err));

        })

        

    }
    // async getAll() {
    //     const tenders = await Tenders.find();
    //     return tenders;
    // }
    // async getOne(id) {
    //     if (!id) {
    //         throw new Error('не указан ID')
    //     }
    //     const tender = await Tenders.findOne({id: id});
    //     return tender;
    // }

    // async update(tenders) {
    //     if (!tender._id) {
    //         throw new Error('не указан ID')
    //     }
    //     const updatedTenders = await Tenders.updateOne(
    //         {id: tenders.id},
    //         {
    //             $set: {
    //                 'pos.1' : { start_price : tenders.start_price }
    //             }
    //         }
    //     )
    //     return updatedTenders;
    // }

    // async delete(id) {
    //         if (!id) {
    //             throw new Error('не указан ID')
    //         }
    //         const post = await Tenders.findByIdAndDelete(id);
    //         return post;
    // }
}


export default new OneCService();