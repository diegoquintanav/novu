import { readProjects } from '@pnpm/filter-workspace-packages';
import * as fs from 'fs';

export async function getPackageFolders(folder) {
  const cachePath = '/' + folder + '-changes-cache.json';

  const isCacheExists = fs.existsSync(cachePath);
  if (isCacheExists) {
    const cache = fs.readFileSync(cachePath, 'utf8');

    return JSON.parse(cache);
  }

  const path = process.cwd();
  const content = await readProjects(path, [{
    parentDir: folder,
  }], {
    engineStrict: false
  });

  const filteredItems = content.allProjects.filter((project) => {
    const contains =  project.dir.includes(folder + '/');

    return contains;
  } ).map((project) => project.manifest.name);

  // store results in cache file for later use
  fs.writeFileSync(cachePath, JSON.stringify(filteredItems));

  return filteredItems;
}
