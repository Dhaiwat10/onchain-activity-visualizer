import { FC, useEffect, useState } from 'react';

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

const monthNameToNumber = (month: string) => {
  switch (month) {
    case 'January':
      return 1;
    case 'February':
      return 2;
    case 'March':
      return 3;
    case 'April':
      return 4;
    case 'May':
      return 5;
    case 'June':
      return 6;
    case 'July':
      return 7;
    case 'August':
      return 8;
    case 'September':
      return 9;
    case 'October':
      return 10;
    case 'November':
      return 11;
    case 'December':
      return 12;
    default:
      return 0;
  }
};

interface IGridProps {
  walletAddress: string;
}

const Square = ({ active }: { active: boolean }) => {
  return (
    <div
      className={`${
        active ? 'bg-green-500' : 'bg-gray-500'
      } w-12 h-12 rounded-md`}
    ></div>
  );
};

const Month = ({
  month,
  transactions,
}: {
  month: string;
  transactions: any[];
}) => {
  const daysOfTheMonthWhereTransactionsOccurred = transactions
    .filter((transaction) => {
      const date = new Date(transaction.timeStamp * 1000);
      return date.getMonth() === monthNameToNumber(month);
    })
    .map((transaction) => {
      const date = new Date(transaction.timeStamp * 1000);
      return date.getDate();
    });

  console.log(daysOfTheMonthWhereTransactionsOccurred);

  return (
    <div className='flex flex-col'>
      <h1 className='text-xl font-bold'>{month}</h1>
      <div className='grid grid-cols-7 gap-4'>
        {/* depending on the month, render a square each for all days of the month */}
        {Array.from(
          Array(daysInMonth(monthNameToNumber(month), 2021)).keys()
        ).map((day) => (
          <Square
            key={`${day}-${month}`}
            active={daysOfTheMonthWhereTransactionsOccurred.includes(day)}
          />
        ))}
      </div>
    </div>
  );
};

export const Grid: FC<IGridProps> = ({ walletAddress }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const res = await fetch(
        `/api/transactions?walletAddress=${walletAddress}`
      );
      const json = await res.json();
      setTransactions(json.transactions);
    };
    getTransactions();
  }, [walletAddress]);

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <Month month='January' transactions={transactions} />
      <Month month='February' transactions={transactions} />
      <Month month='March' transactions={transactions} />
      <Month month='April' transactions={transactions} />
      <Month month='May' transactions={transactions} />
      <Month month='June' transactions={transactions} />
      <Month month='July' transactions={transactions} />
      <Month month='August' transactions={transactions} />
      <Month month='September' transactions={transactions} />
      <Month month='October' transactions={transactions} />

      <Month month='November' transactions={transactions} />
      <Month month='December' transactions={transactions} />
    </div>
  );
};
