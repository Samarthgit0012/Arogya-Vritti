import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Register AI assistant route


// ... rest of the server code ... 