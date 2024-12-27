import { object, string } from 'zod';

export const registerUserSchema = object({
  body: object({
    firstName: string({ required_error: 'Should have first name' })
      .min(1, { message: 'First name should have at least 1 character' })
      .max(20, { message: 'First name should have at most 20 characters' }),
    lastName: string({ required_error: 'Should have last name' })
      .min(1, { message: 'Last name should have at least 1 character' })
      .max(20, { message: 'Last name should have at most 20 characters' }),
    email: string({ required_error: 'Should have email' }).email({
      message: 'Invalid email address',
    }),
    password: string({ required_error: 'Should have password' }).min(6, {
      message: 'Password should have at least 6 characters',
    }),
    role: string({ required_error: 'Should have role' }),
  }),
});

export const verifyEmailSchema = object({
  body: object({
    email: string({ required_error: 'Should have email' })
      .email({ message: 'Invalid email address' })
      .optional(),
    otpCode: string({ required_error: 'Should have verification code' }),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'Should have email' })
      .email({ message: 'Invalid email address' })
      .optional(),
    password: string({ required_error: 'Should have password' }),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({ required_error: 'Should have email' })
      .email({ message: 'Invalid email address' })
      .optional(),
  }),
});

export const resetPasswordSchema = object({
  body: object({
    email: string({ required_error: 'Should have email' })
      .email({ message: 'Invalid email address' })
      .optional(),
    passwordResetCode: string({
      required_error: 'Should have password reset code',
    }),
    password: string({ required_error: 'Should have password' }),
  }),
});

export const changePasswordSchema = object({
  body: object({
    email: string({ required_error: 'Should have email' }).email({
      message: 'Invalid email address',
    }),
    password: string({ required_error: 'Should have password' }),
  }),
});
