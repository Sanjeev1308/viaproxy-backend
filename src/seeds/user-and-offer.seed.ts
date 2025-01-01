import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectToDB } from '../config/mongoose';
import OfferModel from '../models/offer.model';
import UserModel from '../models/user.model';

// Generate a random date between start and end
const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

// Generate user data
const generateUsers = async (count: number) => {
  const users = [];
  const roles = ['student', 'eco-citizen', 'merchant'] as const;

  const hashedPassword = await bcrypt.hash('12345678', 10);

  for (let i = 0; i < count; i++) {
    const user = {
      _id: new mongoose.Types.ObjectId(),
      password: hashedPassword,
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      country: faker.location.country(),
      city: faker.location.city(),
      school: faker.company.name() + ' University',
      category: faker.helpers.arrayElement([
        'Individual',
        'Organization',
        'Business',
      ]),
      isActive: faker.datatype.boolean(0.9),
      emailVerified: faker.datatype.boolean(0.8),
      profilePicture: faker.image.avatar(),
      otpCode: faker.string.numeric(6),
      otpExpires: Date.now() + 3600000,
      resetPasswordToken: faker.string.alphanumeric(20),
      resetPasswordExpires: Date.now() + 86400000,
      role: faker.helpers.arrayElement(roles),
    };
    users.push(user);
  }
  return users;
};

// Generate offer data
const generateOffers = (count: number, users: any[]) => {
  const offers = [];
  const proposedItems = ['service', 'product', 'buy'] as const;
  const exchangeTypes = ['exchange', 'sale', 'donate'] as const;
  const paymentTypes = ['lump sum', 'per day', 'per hour'] as const;
  const paymentMethods = [
    'delivered',
    'hand to hand',
    'paid on collection',
    'delivered after payment',
  ] as const;
  const status = ['pending', 'completed', 'expired', 'cancelled'] as const;

  for (let i = 0; i < count; i++) {
    const startDate = randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31));
    const endDate = new Date(
      startDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
    ); // Up to 30 days after start

    const offer = {
      _id: new mongoose.Types.ObjectId(),
      offerTitle: faker.commerce.productName(),
      proposedItem: faker.helpers.arrayElement(proposedItems),
      concernedProductService: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      offerImage: faker.image.url(),
      offerStartDate: startDate,
      offerEndDate: endDate,
      exchangeType: faker.helpers.arrayElement(exchangeTypes),
      paymentType: faker.helpers.arrayElement(paymentTypes),
      estimatedPrice: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
      paymentMethod: faker.helpers.arrayElement(paymentMethods),
      geographicArea: faker.location.state(),
      city: faker.location.city(),
      campus: faker.company.name() + ' Campus',
      specialConditionsFile: faker.system.filePath(),
      deliveryTermsDescription: faker.lorem.paragraph(),
      termsAndConditions: faker.lorem.paragraphs(2),
      status: faker.helpers.arrayElement(status),
      createdBy: faker.helpers.arrayElement(users)._id,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };
    offers.push(offer);
  }
  return offers;
};

async function seedUserAndUser() {
  try {
    // Connect to MongoDB
    await connectToDB();
    const users = await generateUsers(50);
    const offers = generateOffers(500, users);
    await UserModel.insertMany(users);
    await OfferModel.insertMany(offers);
    //   await UserModel.deleteMany({});
    //   await OfferModel.deleteMany({});
  } catch (error) {
    console.error('Error seeding user and user', error);
  } finally {
    mongoose.connection.close();
  }
}

seedUserAndUser();
