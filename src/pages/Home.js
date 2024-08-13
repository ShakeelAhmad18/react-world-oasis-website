import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="relative flex items-center justify-center h-screen">
      <img src="./bg.png" placeholder="blur" alt="Mountains and forests with two cabins" className="absolute inset-0 w-full h-full object-cover object-top" />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          to="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 mt-4 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </section>
  );
}
