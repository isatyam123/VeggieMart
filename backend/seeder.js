import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';
import bcrypt from 'bcryptjs';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('123456', 10), // Hashed manually just for seeding speed if needed, but model handles it. Let's provide raw to trigger hook or use Model.insertMany which doesn't trigger hook!
        isAdmin: true,
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('123456', 10),
      }
    ]);
    
    // Mongoose insertMany doesn't trigger pre-save hook, so we must hash manually in seeder or use create.
    // wait, I used Model.create, it MIGHT trigger hook if passed an array. 
    // It's safer to pre-hash or just pass the objects to `insertMany` if we pre-hash. We did pre-hash.

    // Let's drop the hook for seeding by manually setting password or just using the model hook properly.
    // Let's just create an admin user manually.
    await User.deleteMany();
    const adminUser = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password', // will be hashed by pre save
        isAdmin: true,
    });
    const createdAdmin = await adminUser.save();

    const sampleProducts = products.map((p) => {
      return { ...p, user: createdAdmin._id };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
