import crypto from "node:crypto";

const algorithm = "aes-256-ctr";
const iv = ()=> crypto.randomBytes(16);

export const encrypt = (text: string): Hash => {
  const secretKey = process.env.CRYPTO_SECRET_KEY; // Random secret key
  if (!secretKey) throw new Error("No secret");
  const cipher = crypto.createCipheriv(
    algorithm,
    crypto
      .createHash("sha256")
      .update(String(secretKey))
      .digest("base64")
      .slice(0, 32),
    iv()
  );

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv().toString("hex"),
    content: encrypted.toString("hex")
  };
};

export const decrypt = (hash: Hash): string => {
  const secretKey = process.env.CRYPTO_SECRET_KEY;
  if (secretKey) {
    const decipher = crypto.createDecipheriv(
      algorithm,
      crypto
        .createHash("sha256")
        .update(String(secretKey))
        .digest("base64")
        .slice(0, 32),
      Buffer.from(hash.iv, "hex")
    );
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(hash.content, "hex")),
      decipher.final()
    ]);
    return decrpyted.toString();
  }
  throw Error("No secret key");
};

export interface Hash {
  iv: string;
  content: string;
}
