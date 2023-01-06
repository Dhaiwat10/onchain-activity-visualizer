import type { NextApiRequest, NextApiResponse } from 'next';

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const walletAddress = req.query.walletAddress as string;

  if (!walletAddress) {
    res.status(400).json({ error: 'Missing wallet address' });
    return;
  }

  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // only return transactions from 2022
      const transactions = data.result.filter((tx: any) => {
        const date = new Date(parseInt(tx.timeStamp) * 1000);
        return date.getFullYear() === 2022;
      });
      return transactions;
    })
    .then((transactions) => {
      res.status(200).json({
        transactions,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}
