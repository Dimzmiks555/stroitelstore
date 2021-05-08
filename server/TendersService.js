import Tenders from "./Tenders.js";
import fs from 'fs'
import XMLParser from 'xml2js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { DOMParser }  from 'xmldom';
import fetch from 'node-fetch';
import { response } from "express";

const __dirname = dirname(fileURLToPath(import.meta.url));
class TendersService {
    // async create(tenders) {
    //     const createdTenders = await Tenders.create(...post);
    //     return createdTenders;
    // }
    async create(file) {
        let filePath = file.path;
        let fileName = file.filename;
        let id = parseInt(fileName.match(/\d+/))
        
        

        

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log("err")
            } else {
                let file = data.toString();
                var xmlStringSerialized = new DOMParser().parseFromString(file, "text/xml");
                XMLParser.parseString(xmlStringSerialized, (err, result) => {
                    let positions = result.tenderposition_import.tenderpositions[0].tenderposition;
                    for (let i = 0; i < positions.length; i++){
                        positions[i] = Object.assign(positions[i], {
                            buy_price: 0,
                            analog_name: '',
                            percent: 0
                        })
                    };
                    async function getTender(id, positions){
                        const res = await fetch(`http://www.tender.pro/api/_tender.info.json?_key=1732ede4de680a0c93d81f01d7bac7d1&company_id=001&id=${id}`);
                        const json = await res.json();
                        let data = json.result.data;
                        Tenders.create({
                            id: id,
                            pos: positions,
                            data: data
                        });
                    }
                    getTender(id, positions);
                    
                });
                
            }
        })
    }
    async getAll() {
        const tenders = await Tenders.find();
        return tenders;
    }
    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const tender = await Tenders.findOne({id: id});
        return tender;
    }

    async update(tenders) {
        if (!tender._id) {
            throw new Error('не указан ID')
        }
        const updatedTenders = await Tenders.updateOne(
            {id: tenders.id},
            {
                $set: {
                    'pos.1' : { start_price : tenders.start_price }
                }
            }
        )
        return updatedTenders;
    }

    // async delete(id) {
    //         if (!id) {
    //             throw new Error('не указан ID')
    //         }
    //         const post = await Tenders.findByIdAndDelete(id);
    //         return post;
    // }
}


export default new TendersService();