import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/db/mongo';
import User from '@/models/User';
import { loginSchema } from '@/validators/auth.schema';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                try {
                    // 1. Validate Input
                    const result = loginSchema.safeParse(credentials);
                    if (!result.success) {
                        throw new Error('Invalid input');
                    }
                    const { email, password } = result.data;

                    // 2. Connect DB
                    await dbConnect();

                    // 3. Find User
                    // We must Select '+password' because it makes it excluded by default in schema
                    const user = await User.findOne({ email }).select('+password');

                    if (!user || !user.password) {
                        throw new Error('Invalid credentials');
                    }

                    // 4. Verify Password
                    const isValid = await bcrypt.compare(password, user.password);

                    if (!isValid) {
                        throw new Error('Invalid credentials');
                    }

                    // 5. Return User (without password)
                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
