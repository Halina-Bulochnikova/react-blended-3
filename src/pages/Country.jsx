import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Section from '../components/Section/Section';
import Container from '../components/Container/Container';  
import { fetchCountry } from '../service/countryApi';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';
import Heading from '../components/Heading/Heading';
import CountryInfo from '../components/CountryInfo/CountryInfo';

const Country = () => {

  const { countryId } = useParams();
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const location = useLocation();
  console.log('CountryList location', location);
  const goBack = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCountry(countryId);
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [countryId]);


return (
  <Section>
    <Container>
      <GoBackBtn path={goBack.current} />
      {isLoading && <Loader />}
      {error && <Heading title="Ooop! Something went wrong..." bottom />}
      {countries && <CountryInfo {...countries} />}
    </Container>
  </Section>
);
};
export default Country;
