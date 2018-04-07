import fs from 'fs';
import path from 'path';

export default async (db) => {
  const basename = path.basename(module.filename);
  const repos = {};
  return fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-8) === '.repo.js')
    .reduce(async (reposObj, file) => {
      const fileExport = await import(path.join(__dirname, file));
      const repo = fileExport.default(db);
      const repoName = `${file.slice(0, -8)}Repo`;
      return { ...reposObj, [repoName]: repo };
    }, repos);
};
