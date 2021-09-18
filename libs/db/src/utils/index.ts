import { promises } from 'fs';
import { resolve } from 'path';

export const initModels = async function() {
  const files = await promises.readdir(resolve(__dirname, '../models'));
  const models = [];
  for (let i = 0; i < files.length; i++) {
    const Model = await import(resolve(__dirname, '../models/', files[i]))
      .then(({ default: Model }) => Model);
    models.push(Model);
  }
  return models;
}