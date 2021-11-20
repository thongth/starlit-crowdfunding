// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res
    .status(200)
    .json([
      { address: "0xa123456789123456789123" },
      { address: "0xb123456789123456789123" },
      { address: "0xc123456789123456789123" },
      { address: "0xd123456789123456789123" },
      { address: "0xe123456789123456789123" },
    ]);
}
