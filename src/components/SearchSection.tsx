import React, { useState } from 'react';
import styled from '@emotion/styled';
import { SearchForm } from '@components/SearchBar';
import { SearchResult } from '@components/SearchResult';
import { DataTypes } from '@types';
import { DEVICE, STYLE } from '@constants';
import axios from 'axios';

export const SearchSection = () => {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<DataTypes[]>([]);
  const [range, setRange] = useState(15);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const products = await axios.get(`api/productList`, {
      params: { length: 15, text: e.target.value },
    });
    setResults(products.data.requests);
  };
  return (
    <SearchContainer>
      <SearchForm inputValue={inputValue} handleChange={handleChange} />
      <SearchResult
        list={results}
        setResults={setResults}
        inputValue={inputValue}
        range={range}
        setRange={setRange}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: ${STYLE.MAX_WIDTH};
  min-height: 100vh;
  padding: 60px 0;
  @media ${DEVICE.MEDIUM} {
    padding: 80px 15px;
  }
  @media ${DEVICE.SMALL} {
    padding: 30px 15px;
  }
`;
