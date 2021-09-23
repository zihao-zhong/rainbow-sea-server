import { promises } from 'fs';

export const initModels = async function () {
  const files = await promises.readdir('../models');
  const models = [];
  for (let i = 0; i < files.length; i++) {
    const Model = await import(`../models/${files[i]}`).then(({ default: Model }) => Model);
    models.push(Model);
  }
  return models;
};
