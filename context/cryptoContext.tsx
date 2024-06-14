'use client';
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import axios from 'axios';
import next from 'next';

type CryptoPriceListType = {
  id: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  image: string;
};

const CRYPTOContext = createContext({
  cryptoPriceList: [] as CryptoPriceListType[],
  watchList: [] as string[],
  loading: false,
  addToWatchList: (id: string) => {},
  removeFromWatchList: (id: string) => {},
  sortCryptoPriceList: (searchValue: string) => {},
  page: 1,
  nextPage: () => {},
  previousPage: () => {},
});

export function useCRYPTOContext() {
  return useContext(CRYPTOContext);
}

interface CRYPTOContextProviderProps {
  children: ReactNode;
}

export function CRYPTOContextProvider({ children }: CRYPTOContextProviderProps) {
  const [cryptoPriceList, setCryptoPriceList] = useState<CryptoPriceListType[]>([] as CryptoPriceListType[]);
  const [page, setPage] = useState(1);
  const [watchList, setWatchList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': process.env.API_KEY,
        },
        params: {
          vs_currency: 'usd',
          //   ids: 'bitcoin,ethereum',
        },
      })
      .then((response) => {
        console.log('Data fetched: ', response.data);

        setCryptoPriceList(response.data);
        setLoading(false);

        // get watchList from local storage
        const watchList = localStorage.getItem('watchList');
        if (watchList) {
          setWatchList(JSON.parse(watchList));
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);

  function sortCryptoPriceList(searchValue: string) {
    setCryptoPriceList((prevCryptoPriceList) => {
      if (!prevCryptoPriceList) {
        return [];
      }
      setPage(1);
      return prevCryptoPriceList
        .map((crypto) => {
          const matches = crypto.name.toLowerCase().includes(searchValue.toLowerCase());
          return { ...crypto, matches };
        })
        .sort((a, b) => {
          if (a.matches && !b.matches) return -1;
          if (!a.matches && b.matches) return 1;
          return 0;
        })
        .map((crypto) => {
          const { matches, ...rest } = crypto;
          return rest;
        });
    });
  }

  function addToWatchList(id: string) {
    setWatchList([...watchList, id]);
    // save to local storage
    localStorage.setItem('watchList', JSON.stringify([...watchList, id]));
  }
  function removeFromWatchList(id: string) {
    const updatedWatchList = watchList.filter((watchId) => watchId !== id);
    setWatchList(updatedWatchList);
    // save to local storage
    localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
  }
  function nextPage() {
    if (page === Math.ceil(cryptoPriceList.length / 10)) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  }
  function previousPage() {
    if (page === 1) {
      return;
    }
    setPage((prevPage) => prevPage - 1);
  }

  const value = {
    cryptoPriceList,
    watchList,
    loading,
    addToWatchList,
    removeFromWatchList,
    sortCryptoPriceList,
    page,
    nextPage,
    previousPage,
  };

  return <CRYPTOContext.Provider value={value}>{children}</CRYPTOContext.Provider>;
}
