import { Injectable } from '@nestjs/common';
import e, { raw } from 'express';
const fs = require('fs');
const path = require('path');

@Injectable()
export class JsonService {

    async getAllJson(): Promise<string> {
        let fileList = await fs.readdirSync(`${path.resolve(__dirname, '')}/../../src/json/files`);
        let filterFileList = fileList.map(file => file.replace('.json', ''));
        let outputJson = {
            status: "1000",
            data: {
                boards: filterFileList
            }
        }
        return JSON.stringify(outputJson);
    }
    
    async getDataFromJson(id: string): Promise<string> {
        let rawData = await fs.readFileSync(`${path.resolve(__dirname, '')}/../../src/json/files/${id}.json`);
        let rawJson = JSON.parse(rawData.toString());

        let boards = [];
        rawJson.columns.forEach(element => {
            boards.push({title: element.value, cards: []});
        });

        rawJson.messages.forEach(element => {
            let comments = [];
            if (element.comments) {
                element.comments.forEach(comment => {
                    comments.push({message: comment.text, likeCount: 0});
                });
            }

            let card = {
                message: element.text,
                likeCount: element.votes ? element.votes.length : 0,
                comments: comments
            }

            boards[element.type.id - 1].cards.push(card);
        });

        let outputJson = {
            status: "1000",
            data: {
                boards: boards
            }
        }
        return JSON.stringify(outputJson);
    }
}
