import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createNewEvent, createSpotifyPlaylist } from '../store'
import { withRouter } from 'react-router-dom';
import { Button, Dropdown, Form, Rating, Segment, Header, Message, Statistic } from 'semantic-ui-react'
import { EventGenres } from '/'
import genreList, { importanceOptions } from './genreList'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css'

/**
 * COMPONENT
 */
export class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventname: '',
      date: moment(),
      type: '',
      genres: [],
      danceability: 0,
      loudness: 0,
      energy: 0,
      acousticness: 0,
      valence: 0,
      instrumentalness: 0,
      tempo: 0,
      danceabilityWeight: 0,
      loudnessWeight: 0,
      energyWeight: 0,
      acousticnessWeight: 0,
      valenceWeight: 0,
      instrumentalnessWeight: 0,
      tempoWeight: 0,
      weightPoints: 12,
      visible: false,
      submitVisible: false,
      entryMessage: true,
    }
    this.renderError = this.renderError.bind(this)
    this.renderInfo = this.renderInfo.bind(this)
    this.checkPoints = this.checkPoints.bind(this)
    this.handleDismiss = this.handleDismiss.bind(this)
    this.handleDismissInfo = this.handleDismissInfo.bind(this)
  }

  checkPoints() {
    if (this.state.weightPoints < 0) {
      this.setState({ visible: true, submitVisible: true })
    }
    else if (this.state.weightPoints >= 0) {
      this.setState({ visible: false, submitVisible: false })
    }
  }
  handleChange(evt) {
    var change = {}
    change[evt.target.name] = evt.target.value
    this.setState(change)
  }
  handleDateChange = (evt) => {
    this.setState({ date: evt })
  }

  handleGenreChange = (evt, { value }) => {
    this.setState({ genres: value })
  }
  handleDanceability = (evt) => {
    this.setState({ danceability: evt.target.value * 1 })
  }
  handleLoudness = (evt) => {
    this.setState({ loudness: evt.target.value * 1 })
  }
  handleEnergy = (evt) => {
    this.setState({ energy: evt.target.value * 1 })
  }
  handleAcousticness = (evt) => {
    this.setState({ acousticness: evt.target.value * 1 })
  }
  handleValence = (evt) => {
    this.setState({ valence: evt.target.value * 1 })
  }
  handleInstrumentalness = (evt) => {
    this.setState({ instrumentalness: evt.target.value * 1 })
  }
  handleTempo = (evt) => {
    this.setState({ tempo: evt.target.value * 1 })
  }
  handleDanceabilityWeight = (evt, data) => {
    let pointsUsed = (data.value * 1) - this.state.danceabilityWeight;
    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ danceabilityWeight: data.value * 1, weightPoints: remainingPoints })
    setTimeout(() => {
      this.checkPoints()
    }, 500)
  }
  handleLoudnessWeight = (evt, data) => {
    let pointsUsed = (data.value * 1) - this.state.loudnessWeight;
    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ loudnessWeight: data.value * 1, weightPoints: remainingPoints })
    setTimeout(() => {
      this.checkPoints()
    }, 500)

  }
  handleEnergyWeight = (evt, data) => {
    let pointsUsed = (data.value * 1) - this.state.energyWeight;
    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ energyWeight: data.value * 1, weightPoints: remainingPoints })

    setTimeout(() => {
      this.checkPoints()
    }, 500)
  }
  handleAcousticnessWeight = (evt, data) => {
    let pointsUsed = (data.value * 1) - this.state.acousticnessWeight;
    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ acousticnessWeight: data.value * 1, weightPoints: remainingPoints })

    setTimeout(() => {
      this.checkPoints()
    }, 500)
  }
  handleValenceWeight = (evt, data) => {
    let pointsUsed = (data.value * 1) - this.state.valenceWeight;
    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ valenceWeight: data.value * 1, weightPoints: remainingPoints })
    setTimeout(() => {
      this.checkPoints()
    }, 500)
  }
  handleInstrumentalnessWeight = (evt, data) => {
    let pointsUsed = (data.value * 1) - this.state.instrumentalnessWeight;
    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ instrumentalnessWeight: data.value * 1, weightPoints: remainingPoints })
    setTimeout(() => {
      this.checkPoints()
    }, 500)
  }
  handleTempoWeight = (evt, data) => {
    let pointsUsed = (data.value * 1) - this.state.tempoWeight;
    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ tempoWeight: data.value * 1, weightPoints: remainingPoints })
    setTimeout(() => {
      this.checkPoints()
    }, 500)
  }
  handleDismiss = () => {
    this.setState({ visible: false })
  }
  handleDismissInfo = () => {
    this.setState({ entryMessage: false })
  }

  render() {
    const { handleSubmit, user } = this.props
    let eventname = this.state.eventname
    let date = this.state.date
    let type = this.state.type
    let genres = this.state.genres
    let danceability = this.state.danceability / 10
    let loudness = this.state.loudness / 10
    let energy = this.state.energy / 10
    let acousticness = this.state.acousticness / 10
    let valence = this.state.valence / 10
    let instrumentalness = this.state.instrumentalness / 10
    let tempo = this.state.tempo
    let danceabilityWeight = this.state.danceabilityWeight
    let loudnessWeight = this.state.loudnessWeight
    let energyWeight = this.state.energyWeight
    let acousticnessWeight = this.state.acousticnessWeight
    let valenceWeight = this.state.valenceWeight
    let instrumentalnessWeight = this.state.instrumentalnessWeight
    let tempoWeight = this.state.tempoWeight
    let spotifyUserId = user.user.spotifyUserId
    let token = user.access
    const StyleFormGroup = (props) => {
      return (
        <Form.Field inline inverted style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {props.children}
        </Form.Field>
      )
    }

    return (

      <div style={{ marginLeft: '9em', marginRight: '9em', background: '#2184d0' }}>
        <Segment raised padded inverted style={{ paddingLeft: '6em', paddingRight: '6em', height: 'auto', marginTop: '.85em' }}>
          <Header textAlign="center" as="h1" color="purple" size="huge" >Create New Event</Header>
          <Form size="large" inverted onSubmit={(evt) => handleSubmit(evt, eventname, date, type, genres, danceability, danceabilityWeight, loudness, loudnessWeight, energy, energyWeight, acousticness, acousticnessWeight, valence, valenceWeight, instrumentalness, instrumentalnessWeight, tempo, tempoWeight, spotifyUserId, token)}>
            {this.renderInfo()}
            <Form.Group widths="equal">
              <Form.Field>
                <label>Event Name</label>
                <input name="eventname" onChange={this.handleChange.bind(this)} value={this.state.eventname} placeholder="New Year's Celebration" required={true} />
              </Form.Field>
              <Form.Field width={6}>
                <label>Date</label>
                <DatePicker
                  name="date"
                  selected={this.state.date}
                  value={this.state.date}
                  onChange={this.handleDateChange.bind(this)}
                  required={true}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Event Description</label>
                <input name="type" onChange={this.handleChange.bind(this)} value={this.state.type} placeholder="Party" required={true} />
              </Form.Field>
              <Form.Field
                control={Dropdown} label="Genre Preferences" name="genres" placeholder="Hip Hop, Electronic, Pop" fluid multiple search selection options={genreList} onChange={this.handleGenreChange.bind(this)} defaultValue={this.state.genres}
              />
              <Statistic
                floated="right"
                inverted
                size="tiny"
                color="purple"
                label="Remaining Importance Points"
                value={this.state.weightPoints}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Danceability: {this.state.danceability}</label>
                <input type="range" min={0} max={10} value={this.state.danceability} onChange={this.handleDanceability.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup>
                <label>Danceability Importance: </label>
                <Dropdown selection compact options={importanceOptions} value={this.state.danceabilityWeight} onChange={this.handleDanceabilityWeight.bind(this)} />
              </StyleFormGroup>
            </Form.Group>
            <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Loudness: {this.state.loudness}</label>
                <input type="range" min={0} max={10} value={this.state.loudness} onChange={this.handleLoudness.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup>
                <label>Loudness Importance: </label>
                <Dropdown selection compact options={importanceOptions} value={this.state.loudnessWeight} onChange={this.handleLoudnessWeight.bind(this)} />
              </StyleFormGroup>
            </Form.Group>
            <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Energy: {this.state.energy}</label>
                <input type="range" min={0} max={10} value={this.state.energy} onChange={this.handleEnergy.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup >
                <label>Energy Importance:      </label>
                <Dropdown selection compact options={importanceOptions} value={this.state.energyWeight} onChange={this.handleEnergyWeight.bind(this)} />
              </StyleFormGroup>
            </Form.Group>
            <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Acousticness: {this.state.acousticness}</label>
                <input type="range" min={0} max={10} value={this.state.acousticness} onChange={this.handleAcousticness.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup>
                <label>Acousticness Importance:</label>
                <Dropdown selection compact options={importanceOptions} value={this.state.acousticnessWeight} onChange={this.handleAcousticnessWeight.bind(this)} />
              </StyleFormGroup>
            </Form.Group>
            <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Happiness: {this.state.valence}</label>
                <input type="range" min={0} max={10} value={this.state.valence} onChange={this.handleValence.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup>
                <label>Happiness Importance:</label>
                <Dropdown selection compact options={importanceOptions} value={this.state.valenceWeight} onChange={this.handleValenceWeight.bind(this)} />
              </StyleFormGroup>
            </Form.Group>
            <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Instrumentalness: {this.state.instrumentalness}</label>
                <input type="range" min={0} max={10} value={this.state.instrumentalness} onChange={this.handleInstrumentalness.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup>
                <label>Instrumentalness Importance:</label>
                <Dropdown selection compact options={importanceOptions} value={this.state.instrumentalnessWeight} onChange={this.handleInstrumentalnessWeight.bind(this)} />
              </StyleFormGroup>
            </Form.Group>
            <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Tempo: {this.state.tempo}</label>
                <input type="range" min={0} max={160} value={this.state.tempo} onChange={this.handleTempo.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup>
                <label>Tempo Importance: </label>
                <Dropdown selection compact options={importanceOptions} value={this.state.tempoWeight} onChange={this.handleTempoWeight.bind(this)} />
              </StyleFormGroup>
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {this.renderError()}
              <Button disabled={this.state.submitVisible} color="purple" type="submit" size="huge">Create Event</Button>
            </div>
          </Form>
        </Segment>
      </div>
    )
  }
  renderError() {
    if (this.state.visible) {
      return (
        <Message
          onDismiss={this.handleDismiss}
          color="red"
          header="You have used too many points!"
          content="You only have 12 total points to split between the importance fields."
        />
      );
    }
  }

  renderInfo() {
    if (this.state.entryMessage) {
      return (
        <Message
          onDismiss={this.handleDismissInfo}
          color="purple"
          header="Welcome to groupMix Events!"
          content="Fill out the form below to create an event. Choose specific genres to populate your event playlist with mostly songs of those genres. Choose target attritibutes (e.g. Danceability) for your playlist songs on a scale of 1-10. A target Danceability of 10 will fill your playlist with mostly dance songs. You also have 12 total points to determine each attribute's importance relative to the rest. Give more points to attributes you really care about. If you DO NOT care about an attribute / do not want it to be considered, leave the importance at 0. Enjoy your stress-free playlist! "
        />
      );
    }
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    newEvent: state.newEvent
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt, name, date, type, genres, danceability, danceabilityWeight, loudness, loudnessWeight, energy, energyWeight, acousticness, acousticnessWeight, valence, valenceWeight, instrumentalness, instrumentalnessWeight, tempo, tempoWeight, spotifyUserId, token) {
      let { history } = ownProps
      let newEvent = { name, date, type, genres, danceability, danceabilityWeight, loudness, loudnessWeight, energy, energyWeight, acousticness, acousticnessWeight, valence, valenceWeight, instrumentalness, instrumentalnessWeight, tempo, tempoWeight, spotifyUserId, token }
      evt.preventDefault()
      dispatch(createNewEvent(newEvent, history))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(NewEvent))
