import { readProjects } from '@pnpm/filter-workspace-packages';

export async function getPackageFolders(folder) {
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

  return filteredItems;
}
