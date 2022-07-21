import jwt from 'jsonwebtoken';

function generateToken<T>(id: T): string {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '24h',
  });
  return token;
}
export { generateToken };
