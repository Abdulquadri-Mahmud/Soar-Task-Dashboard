import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

import QuickTransfer from '../components/QuickTransfer';
import BalanceHistory from '../components/BalanceHistory';
import WeeklyActivity from '../components/WeeklyActivity';
import ExpensesStatistics from '../components/ExpensesStatistics';

const Dashboard = () => {

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mb-6 gap-6">
        {/* Card 1 */}
        <div className="">
          <h2 className="text-gray-600 font-semibold mb-4">My Cards</h2>
          <div className="bg-gradient-to-br from-zinc-600 to-zinc-950 text-white rounded-2xl h-[200px] w-full lg:max-w-sm group transition transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="px-6 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300 font-semibold">Balance</p>
                  <p className="text-2xl font-medium">$5,756</p>
                </div>
                <div>
                  <img src="/card_chip2.png" alt="card-chip" className="max-w-10" />
                </div>
              </div>
              <div className="my-4 flex items-center justify-between max-w-[80%]">
                <div>
                  <p className="text-sm font-medium text-gray-400">CARD HOLDER</p>
                  <p className="font-medium">Eddy Cusuma</p>
                </div>
                <div>
                  <p className="mt-2 text-sm font-medium text-gray-400">VALID THRU</p>
                  <p className="font-medium">12/22</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-gradient-to-br from-zinc-600 to-zinc-900 px-6 py-3 rounded-b-2xl">
              <p className="text-xl font-semibold tracking-widest">3778 **** **** 1234</p>
              <div className="flex -space-x-4">
                <p className="w-8 h-8 rounded-full bg-gradient-to-r from-zinc-400 to-zinc-200 opacity-90"></p>
                <p className="w-8 h-8 rounded-full bg-gradient-to-l from-zinc-400 to-zinc-200 opacity-80"></p>
              </div>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="">
          <h2 className="md:text-end text-gray-600 font-semibold mb-4 hover:text-blue-800 duration-300"><Link to={'/'}>See All</Link></h2>
          <div className="bg-white rounded-2xl h-[210px] shadow w-full lg:max-w-sm group transition transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="px-6 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300 font-semibold">Balance</p>
                  <p className="text-2xl font-medium">$5,756</p>
                </div>
                <div>
                  <img src="/card_chip1.png" alt="card-chip" className="max-w-10" />
                </div>
              </div>
              <div className="my-4 flex items-center justify-between max-w-[80%]">
                <div>
                  <p className="text-sm font-medium text-gray-400">CARD HOLDER</p>
                  <p className="font-medium">Eddy Cusuma</p>
                </div>
                <div>
                  <p className="mt-2 text-sm font-medium text-gray-400">VALID THRU</p>
                  <p className="font-medium">12/22</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center border-t px-6 py-3 rounded-b-2xl">
              <p className="text-xl font-semibold tracking-widest">3778 **** **** 1234</p>
              <div className="flex -space-x-4">
                <p className="w-8 h-8 rounded-full bg-gradient-to-r from-zinc-300 to-zinc-300 opacity-90"></p>
                <p className="w-8 h-8 rounded-full bg-gradient-to-l from-zinc-300 to-zinc-400 opacity-80"></p>
              </div>
            </div>
          </div>
        </div>
        {/* Recent Transactions */}
        <div className="">
          <h2 className={'text-gray-600 font-semibold mb-4'}>Recent Transaction</h2>
          <div className="bg-white p-6 rounded-2xl shadow group transition transform duration-300 hover:scale-105 hover:shadow-lg">
            <ul className="space-y-4 text-gray-700">

              {/* Deposit from my Card */}
              <li className='flex gap-3'>
                <div className="w-10 h-10 bg-pink-50 flex justify-center items-center rounded-full">
                  <img src="/donation.png" alt="" className=''/>
                </div>
                <p className="flex flex-col">
                  Deposit from my Card
                  <span className="text-gray-400 text-sm">28 January 2021</span>
                </p>
                <span className="text-red-500 font-medium">-$850</span>
              </li>

              {/* Deposit Paypal  */}
              <li className='flex gap-3'>
                <div className="w-10 h-10 flex justify-center items-center bg-gray-100 rounded-full">
                  <img src="/paypal.png" alt="" className=''/>
                </div>
                <p className="flex flex-col">
                  Deposit Paypal 
                  <span className="text-gray-400 text-sm">28 January 2021</span>
                </p>
                <span className="text-green-500 font-medium">+$2,500</span>
              </li>

              {/* Jemi Wilson */}
              <li className='flex gap-3'>
                <div className="w-10 h-10 bg-green-200 flex justify-center items-center rounded-full">
                  <img src="/dollar.png" alt="" className=''/>
                </div>
                <p className="flex flex-col">
                  Jemi Wilson
                  <span className="text-gray-400 text-sm">28 January 2021</span>
                </p>
                 <span className="text-green-500 font-medium">+$5,400</span>
                </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-0">
        {/* Weekly Activity */}
        <WeeklyActivity/>
        {/* Expense Statistics */}
        <ExpensesStatistics/>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col justify-between md:flex-row gap-4 mt-8">
        {/* Quick Transfer Section */}
        <QuickTransfer/>

      {/* Balance History Section */}
        <BalanceHistory/>
      </div>
    </div>
  );
};

export default Dashboard