import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import { fetchByRegion } from '../service/countryApi';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import SearchForm from '../components/SearchForm/SearchForm';
import CountryList from '../components/CountryInfo/CountryInfo';


const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const region = searchParams.get('region');

  useEffect(() => {
    if (!region) return;
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [region]);

  const handleSubmit = value => {
    setSearchParams({ region: value });
  };
  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handleSubmit} />
        {isLoading && <Loader />}
        {error && <Heading title="Ooop! Пошук не задався" bottom />}
        {countries.length > 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};

export default SearchCountry;
