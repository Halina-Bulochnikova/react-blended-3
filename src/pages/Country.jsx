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

  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { countryId } = useParams();
  console.log('params', countryId);
  
  
  const location = useLocation();
  console.log('Country location', location);
  const goBack = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [countryId]);
  console.log('country', Country);
 

return (
  <Section>
    <Container>
      <GoBackBtn path={goBack.current} />
      {isLoading && <Loader />}
      {error && <Heading title="Ooop! Something went wrong..." bottom />}
      {country && <CountryInfo {...country} />}
    </Container>
  </Section>
);
};
export default Country;
