import fs from 'fs';
import multer, { Options } from 'multer';
import path from 'path';

const ONE_MB = 1024 * 1024;
const MIME_TYPE = ['image/gif'];

const options = {
  storage: multer.diskStorage({
    destination: path.join(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'images',
      'exercise'
    ),
    filename: async (req, file, callback) => {
      try {
        const exerciseName = req.body.name;

        const fileExtension = path.extname(file.originalname);

        const existingFileNames = fs.readdirSync(
          path.join(__dirname, '..', '..', '..', 'public', 'images', 'exercise')
        );

        const count = existingFileNames.filter((name) =>
          name.startsWith(exerciseName.replace(/\s/g, '_'))
        ).length;

        const fileName = `${exerciseName.replace(/\s/g, '_')}.v${
          count + 1
        }${fileExtension}`;
        callback(null, `${fileName}`);
      } catch (error: any) {
        callback(null, error);
      }
    },
  }),
  limits: {
    fileSize: ONE_MB,
  },
  fileFilter: (req, file, callback) => {
    if (!MIME_TYPE.includes(file.mimetype)) {
      return callback(null, false);
    }
    callback(null, true);
  },
} as Options;

export const upload = multer(options);

export const removeLocalFiles = (files: Express.Multer.File[]) => {
  files.forEach((file) => {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'images',
      'exercise',
      file.filename
    );
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to remove file: ${filePath}`);
      }
    });
  });
};
