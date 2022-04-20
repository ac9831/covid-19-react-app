import React, { Component } from 'react'

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css'
import { fetchData } from './api'

import coronaImage from './images/image.png'

interface IState {
  data: {
    confirmed: {
      value: number,
      detail: string
    }
    recovered: {
        value: number,
        detail: string
    }
    deaths: {
        value: number,
        detail: string
    }
    lastUpdate: Date
  } | undefined,
  country: string,
}

class App extends Component<{}, IState> {

  state = {
    data: {
      confirmed: {
        value: 0,
        detail: ''
      },
      recovered: {
        value: 0,
        detail: ''
      },
      deaths: {
        value: 0,
        detail: ''
      },
      lastUpdate: new Date()
    },
    country: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData(this.state.country)
    this.setState({ data: fetchedData })
  }

  handleCountryChange = async (country: string) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  }

  render() {
    const { data, country }= this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country} />
      </div>
    )
  }
}

export default App;
