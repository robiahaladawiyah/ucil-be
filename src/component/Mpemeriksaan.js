import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export function DemoApp() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formStart, setFormStart] = useState('');
  const [formEnd, setFormEnd] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://easy-tan-betta-garb.cyclic.app/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const handleEventCreate = async (event) => {
    try {
      const response = await fetch('https://easy-tan-betta-garb.cyclic.app/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      const data = await response.json();
      setEvents((prevEvents) => [
        ...prevEvents,
        { ...data, extendedProps: { handleDelete: handleEventDelete } },
      ]);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const handleEventUpdate = async (event) => {
    try {
      await fetch(`https://easy-tan-betta-garb.cyclic.app/events/${event.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      setEvents((prevEvents) =>
        prevEvents.map((e) => (e.id === event.id ? event : e))
      );
      handleCloseModal();
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleEventDelete = async (event) => {
    try {
      await fetch(`https://easy-tan-betta-garb.cyclic.app/events/${event.id}`, {
        method: 'DELETE',
      });
      setEvents((prevEvents) =>
        prevEvents.filter((e) => e.id !== event.id)
      );
      handleCloseModal();
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      title: formTitle,
      start: new Date(formStart),
      end: new Date(formEnd),
    };

    if (selectedEvent) {
      eventData.id = selectedEvent.id;
      handleEventUpdate(eventData);
    } else {
      handleEventCreate(eventData);
    }
  };

  const handleFormReset = () => {
    clearForm();
    setSelectedEvent(null);
  };

  const clearForm = () => {
    setFormTitle('');
    setFormStart('');
    setFormEnd('');
  };

  const handleEventClick = (info) => {
    const event = info.event;

    setSelectedEvent(event);
    setFormTitle(event.title);
    setFormStart(event.start.toISOString().slice(0, -8));
    setFormEnd(event.end.toISOString().slice(0, -8));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearForm();
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <button onClick={() => eventInfo.event.extendedProps.handleDelete()}>
          Delete
        </button>
      </>
    );
  };

  return (
    <div>
      <h1>Demo App</h1>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Open Form
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent ? 'Update Event' : 'Create Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formStart">
              <Form.Label>Start:</Form.Label>
              <Form.Control
                type="datetime-local"
                value={formStart}
                onChange={(e) => setFormStart(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEnd">
              <Form.Label>End:</Form.Label>
              <Form.Control
                type="datetime-local"
                value={formEnd}
                onChange={(e) => setFormEnd(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {selectedEvent ? 'Update' : 'Create'}
            </Button>
            <Button variant="secondary" onClick={handleFormReset}>
              Clear
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        eventContent={renderEventContent}
        editable={true}
        selectable={true}
        eventClick={handleEventClick}
      />
    </div>
  );
}

export default DemoApp;
