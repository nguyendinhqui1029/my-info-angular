import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import env from '../config/env';
import userRoutes from '../routes/userRoutes';

 class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.config();
    this.routes();
    this.connectToDatabase();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use('/api/users', userRoutes);
    // Add more routes as needed
  }

  private async connectToDatabase(): Promise<void> {
    try {
      await mongoose.connect(env.MONGODB_URI.replace('<username>', env.MONGOOSE_USER).replace('<password>', env.MONGOOSE_PASS), {
        bufferCommands: true,
        // dbName: string;
        // user?: string;
        // pass?: string;
        autoIndex: true,
        autoCreate: true
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}
export default App;