import React, { useEffect, useState } from "react";

import * as Api from "../pages/api";

import { Flex, Image, SimpleGrid, useMediaQuery } from "@chakra-ui/react";

import Card from "./components/Card";
import CardAdd from "./components/CardAdd";
import EventCard from "./components/Event";

function Home() {
  const [eventOpen, setEventOpen] = useState(false);
  const [event, setEvent] = useState({});
  const [events, setEvents] = useState([]);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const fetchEvents = async () => {
    const { data } = await Api.getAllEvents();

    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenEvent = async (item) => {
    setEventOpen(true);
    setEvent(item);
  };

  const onCloseEvent = () => {
    setEventOpen(false);
    setEvent({});
  };

  const onAddEvent = async (event) => {
    setEvents([...events, event]);

    await Api.insertEvent(event);
  };

  const onRemoveEvent = async (eventId) => {
    setEvents(events.filter((a) => a._id !== eventId));

    await Api.deleteEvent(eventId);
  };

  const onUpdateEvent = async (item) => {
    const newEvents = events.map((el) => {
      if (el._id === item._id) {
        return { ...el, ...item };
      }

      return el;
    });

    setEvents(newEvents);

    await Api.updateEvent(item._id, item);
  };

  const onAddParticipant = async (eventId, participant) => {
    const newEvents = events.map((el) => {
      if (el._id === eventId) {
        const newEvent = {
          ...el,
          participants: [
            ...el.participants,
            {
              ...participant,
              isPaid: false,
            },
          ],
        };

        setEvent(newEvent);

        return newEvent;
      }

      return el;
    });

    setEvents(newEvents);

    await Api.insertParticipant(eventId, participant);
  };

  const onChangeParticipant = async (item, participant) => {
    const body = {
      ...participant,
      isPaid: !participant.isPaid,
    };

    setEvents((current) =>
      current.map((event) => {
        if (event._id === item._id) {
          let newParticipants = event.participants.map((el) => {
            if (el._id === participant._id) {
              return body;
            }

            return el;
          });

          console.log(newParticipants);

          const newEvent = { ...event, participants: newParticipants };

          setEvent(newEvent);

          return newEvent;
        }

        return event;
      })
    );

    await Api.updateParticipant(participant._id, body);
  };

  return (
    <div className="container">
      <section className="hero" role="img" aria-label="Image Description">
        <h1 className="hero-title">Churrasco dos Guri</h1>
        <Flex justifyContent="center" flexDirection="row">
          <Image
            boxSize="80px"
            src="https://cdn-icons-png.flaticon.com/512/6332/6332176.png"
          />
          <Image
            boxSize="80px"
            src="https://cdn-icons-png.flaticon.com/512/1406/1406827.png"
          />
          <Image
            boxSize="80px"
            src="https://cdn-icons-png.flaticon.com/512/472/472727.png"
          />
          <Image
            boxSize="80px"
            src="https://cdn-icons-png.flaticon.com/512/7466/7466980.png"
          />
        </Flex>
      </section>

      {!eventOpen ? (
        <div className="wrapper">
          <SimpleGrid columns={isMobile ? 1 : 4} spacing={10}>
            {events &&
              events.map((item, index) => (
                <div key={index} className="card">
                  <Card
                    item={item}
                    handleOpenEvent={handleOpenEvent}
                    onRemoveEvent={onRemoveEvent}
                    onUpdateEvent={onUpdateEvent}
                  />
                </div>
              ))}
            <CardAdd onAddEvent={onAddEvent} />
          </SimpleGrid>
        </div>
      ) : (
        <div className="wrapper-event">
          <EventCard
            item={event}
            isMobile={isMobile}
            onCloseEvent={onCloseEvent}
            onAddParticipant={onAddParticipant}
            onChangeParticipant={onChangeParticipant}
          />
        </div>
      )}

      <style jsx>{`
        .hero {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          width: 100%;
          height: 500px;
          overflow: hidden;
          background-size: cover !important;
          background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.65),
              rgba(0, 0, 0, 0.85)
            ),
            url("https://img.huffingtonpost.com/asset/5cf823d22500002e0adbfb1f.jpeg?cache=XZbZsaLNdF&ops=1778_1000")
              no-repeat bottom;
        }

        .hero-title {
          font-style: normal;
          font-weight: bold;
          color: #eee;
          font-size: ${isMobile ? "50px" : "70px"};
          letter-spacing: 0.03em;
          line-height: 1;
          text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.8);
          margin-bottom: 40px;
          padding: 0 20px;
        }

        .container {
          width: 100%;
          background-color: #efefef;
        }

        .wrapper {
          padding: ${isMobile ? "50px 15px" : "50px"};
          margin-top: -100px;
        }

        .wrapper-event {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
