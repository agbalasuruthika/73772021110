npx create-react-app train-schedule-app
cd train-schedule-app
npm install axios react-router-dom @material-ui/core @material-ui/icons
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllTrainsPage from './pages/AllTrainsPage';
import SingleTrainPage from './pages/SingleTrainPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AllTrainsPage} />
        <Route path="/trains/:trainId" component={SingleTrainPage} />
      </Switch>
    </Router>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrainCard from '../components/TrainCard';

function AllTrainsPage() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('API_ENDPOINT_URL');
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>All Trains</h1>
      {trains.map(train => (
        <TrainCard key={train.id} train={train} />
      ))}
    </div>
  );
}

export default AllTrainsPage;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleTrainPage() {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`API_ENDPOINT_URL/${trainId}`);
        setTrain(response.data);
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    fetchData();
  }, [trainId]);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Train {train.name}</h1