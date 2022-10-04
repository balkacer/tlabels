export async function createEmptyFile(filePath: string): Promise<void> {
  try {
    const fs = require('fs');
    await fs.writeFile(filePath, '{ "es": {} }', (err: any) => {
      if (err) {
        throw err;
      }
    });
  } catch (error) {
    throw error;
  }
}

export async function readFile(filePath: string): Promise<{ [key: string]: any } | null> {
  try {
    return new Promise(async (resolve) => {
      const fs = require('fs');

      fs.exists(filePath, async (exists: boolean) => {
        if (exists) {
          fs.readFile(filePath, (err: any, data: any) => {
            if (err) {
              throw err;
            }
            resolve(JSON.parse(data));
          });
        } else {
          await createEmptyFile(filePath);
          readFile(filePath).then((data) => {
            resolve(data);
          });
        }
      });
    });
  } catch (error) {
    return null;
  }
}

export async function writeFile(filePath: string, data: any): Promise<void> {
  try {
    return new Promise((resolve) => {
      const fs = require('fs');
      fs.writeFile(filePath, JSON.stringify(data), (err: any) => {
        resolve();
      });
    });
  } catch (error) {
    throw error;
  }
}
