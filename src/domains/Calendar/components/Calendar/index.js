import React from "react";
import BigCalendar from "react-big-calendar";
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';
import notification from 'antd/lib/notification';

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);
const Option = Select.Option;

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventModalOpen: false,
      eventTitle: '',
      eventTimeStart: moment(),
      eventTimeEnd: moment(),
      eventColor: 'grey'
    };
  }

  handleEventCreation = () => {
    this.setState({ eventModalOpen: true, eventTitle: '' });
  }

  handleEventEditing = event => {
    this.setState({
      eventModalOpen: true,
      eventTitle: event.title,
      eventTimeStart: event.start,
      eventTimeEnd: event.end,
      eventColor: event.color,
      eventObj: event
    });
  }

  closeModalAndClearValues = () => {
    this.setState({
      eventModalOpen: false,
      eventTitle: '',
      eventTimeStart: moment(),
      eventTimeEnd: moment(),
      eventColor: 'grey'
    });
  }

  deleteEvent = (event) => {
    this.props.actions.removeEvent(event);
    return this.closeModalAndClearValues();
  }

  handleSave = () => {
    const {eventTitle, eventTimeStart, eventTimeEnd, eventColor, eventObj} = this.state;
    if (!eventTitle) {
      notification.warning({message: 'Need to specify a title for the event'});
      return;
    }
    if (this.state.eventObj && this.state.eventObj.id) {
      this.props.actions.updateEvent({
        id: eventObj.id,
        title: eventTitle,
        start: moment(eventTimeStart).toDate(),
        end: moment(eventTimeEnd).toDate(),
        color: eventColor
      });
    } else {
      this.props.actions.addEvent({
        id: this.props.events.length ? this.props.events.length + 1 : 1,
        title: eventTitle,
        start: moment(eventTimeStart).toDate(),
        end: moment(eventTimeEnd).toDate(),
        color: eventColor
      });
    }
    this.closeModalAndClearValues();
  }

  handleChange = (key, value) => {
    this.setState({[key]: value})
  }

  render() {
    return (
      <div style={{ width: "70%", height: "700px", margin: "20px auto" }}>
        <Button type="primary" onClick={this.handleEventCreation}>Add Event</Button>
        <BigCalendar
          selectable
          views={['month', 'day']}
          localizer={localizer}
          events={this.props.events}
          onSelectEvent={this.handleEventEditing}
          defaultView={BigCalendar.Views.MONTH}
          eventPropGetter={event => ({
            style: {
              backgroundColor: event.color,
            },
          })}
        />
        <Modal
          visible={this.state.eventModalOpen}
          title="Add/Edit Event"
          onCancel={this.closeModalAndClearValues}
          footer={[
            this.state.eventObj ? (<Button key="delete" onClick={() => this.deleteEvent(this.state.eventObj)}>Delete</Button>): null,
            <Button key="back" onClick={this.closeModalAndClearValues}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={this.handleSave}>Save</Button>,
          ]}
          >
          <Input
            placeholder="Event Name"
            maxLength={30}
            value={this.state.eventTitle}
            onChange={e => this.handleChange('eventTitle', e.target.value)}/>
          <DatePicker
            showTime
            placeholder="Select start time"
            value={moment(this.state.eventTimeStart)}
            onChange={val => this.handleChange('eventTimeStart', val)}/>
          <DatePicker
            showTime
            placeholder="Select end time"
            value={moment(this.state.eventTimeEnd)}
            onChange={val => this.handleChange('eventTimeEnd', val)}/>
          <Select
            style={{ width: 320 }}
            placeholder="Select a color"
            value={this.state.eventColor}
            onChange={val => this.handleChange('eventColor', val)}>
            <Option value="grey">Grey</Option>
            <Option value="blue">Blue</Option>
            <Option value="red">Red</Option>
          </Select>
        </Modal>
      </div>
    );
  }
}
