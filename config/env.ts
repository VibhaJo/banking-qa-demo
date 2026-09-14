function required(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.sample to .env and fill it in.`,
    );
  }
  return value;
}

const username = required("PARABANK_USER");
const password = required("PARABANK_PASS");

export const env = { username, password };
