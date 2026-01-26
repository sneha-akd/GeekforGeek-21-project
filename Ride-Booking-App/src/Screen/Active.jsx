
import { Star, CircleCheckBig, Phone, MessageSquare, Shield, Clock, Route } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { cancelRide, finishRide } from '../../Store/app';

// this screen will have three modes,
// driver found, enroute, with driver details and ETA/distance, cancel button
// ride in progress, with driver details and ETA/distance
// ride finished, with star rating input

// Will be using dummy driver, with random distance and time generator
const driver = {
  name: "Jon Snow",
  rating: 4.9,
  car: {
    "Economy": { model: "Honda Amaze", number: "HMA-2019" },
    "Comfort": { model: "Toyota Camry", number: "TC-111" },
    "Premium": { model: "BMW S6", number: "BS6-98" },
    "XL": { model: "Range Rover", number: "RR-Intl" }
  }
}

const INCOMING = "incoming";
const PROGRESS = "progress";
const FINISHED = "finished";

const DirverDetails = ({ vehicle }) => {
  return <div>
    <div className='flex items-center gap-3 w-full bg-gray-100 rounded-full shadow-lg px-5 my-5 py-3'>

      {/* Profile photo */}
      <div className='rounded-full border-none bg-green-500 h-15 w-15 flex items-center justify-center'><p className='text-white text-shadow-amber-50'>JS</p></div>
      <div>
        <h2>{driver.name}</h2>
        <p><Star size={17} fill="yellow" className='inline-block' /> {driver.rating} {driver.car[vehicle]?.model}</p>
        <p>{driver.car[vehicle]?.number}</p>
      </div>
    </div>
  </div>
}

const NotificationMsg = ({ mode }) => {
  const message = mode === INCOMING ? "Driver Found!" : mode === PROGRESS ? "Ride in Progress" : "Ride Completed";
  const greeting = mode === INCOMING ? "Your driver is on the way to pick you up"
    : mode === PROGRESS ? "Enjoy your ride!" : "Thank you for riding with us";
  return <><div className='w-fit mx-auto bg-gray-100 rounded-full shadow-lg px-5 my-5 py-3 flex'>
    {mode !== FINISHED && <div className='w-2 h-2 bg-green-300 border-green-500 my-auto mr-2 rounded-full'></div>}
    {mode === FINISHED && <CircleCheckBig size={15} color={`rgb(0, 201, 81)`} className="my-auto mr-2" />}
    <span>{message}</span>
  </div>
    <p className='w-fit mx-auto text-gray-500'>{greeting}</p>
  </>;
}

const Actions = () => {
  const classes = `flex-1 p-2 bg-gray-100 rounded-full shadow-lg text-center
  hover:bg-gray-200 active:bg-gray-300`;
  return <div className='flex gap-2'>
    <button className={classes}> <Phone size={18} className='inline-block' /><span className='pl-2'>Call</span></button>
    <button className={classes}> <MessageSquare size={18} className='inline-block' /><span className='pl-2'>Message</span></button>
    <button className={classes}> <Shield size={18} className='inline-block ' /><span className='pl-2'>Safety</span></button>
  </div>
}

// starts a timer to reduce the time in seconds mapped to minutes
const ETA = ({ time }) => {
  const [pending, setPending] = useState(time * 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      setPending((prev) => {
        if (prev <= 1) clearInterval(timer)
        return prev <= 0 ? 0 : prev - 1000
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, []);

  return <div className='flex items-center gap-3 w-full bg-gray-100 rounded-full shadow-lg px-5 my-5 py-3'>
    <Clock />
    <div>
      <p>ETA</p>
      <p>{pending / 1000} mins</p>
    </div>
  </div >
}

// Static, not changing once set
const DistanceCard = ({ distance, time }) => {
  return <div className='flex items-center gap-3 w-full bg-gray-100 rounded-full shadow-lg px-5 my-5 py-3'>
    <Route />
    <div>
      <p>Distance</p>
      <p>{distance} km</p>
    </div>
  </div>
}

const FeedbackCard = () => {
  const [rating, setRating] = useState(0);
  return <div className='text-center p-2'>
    <p className='my-5'>How was your ride with us?</p>
    <div className='flex justify-center'>
      {Array.from({ length: 5 }).map((_, index) => {
        return <button className='h-12' onClick={() => setRating(index + 1)} key={index}>
          <Star strokeWidth={2} size={48} className='h-8 hover:h-10 text-gray-300' fill={index < rating ? "#ffc107" : "transparent"} />
        </button>
      })}
    </div>
  </div>
}

const Active = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { distance, selectedVehicle, time } = useSelector((state) => state.app.bookingData);

  const [mode, setMode] = useState(INCOMING);

  // console.log("Active", distance, selectedVehicle, time);

  useEffect(() => {
    // go back to home, if ride details are missing
    if (distance === 0) {
      navigate("/home");
      return;
    }

    // once the component is loaded, we show incoming ride for about 5 seconds.

    const timer = setTimeout(() => {
      setMode(PROGRESS);
    }, 5000);

    return () => { clearTimeout(timer); }
  }, []);

  useEffect(() => {
    if (mode === INCOMING) {
      // do nothing
    } else if (mode === PROGRESS) {
      const timer = setTimeout(() => {
        setMode(FINISHED);
      }, time * 1000);
      return () => { clearTimeout(timer); }
    } else {
      // do nothing
    }
  }, [mode]);

  // modes are incoming, inprogress and done
  return (<>
    <div className="relative z-20 max-w-md mx-auto p-4 space-y-4 bg-white rounded-lg shadow-lg my-1">
      <NotificationMsg mode={mode} />
      {mode === INCOMING && <div>
        <DirverDetails vehicle={selectedVehicle} />
        <Actions />
        <ETA time={5} />
        <DistanceCard distance={5} time={5} />
        <button className='w-full bg-gray-50 hover:bg-cyan-200 rounded-full p-2
        border border-transparent active:border-cyan-500 shadow-lg'
          onClick={() => {
            dispatch(cancelRide())
            navigate("/history");
          }}>
          <span className='px-2'>&times;</span> Cancel Ride</button>

      </div>}

      {mode === PROGRESS && <div>
        <DirverDetails vehicle={selectedVehicle} />
        <Actions />
        <ETA time={time} />
        <DistanceCard distance={distance} time={time} />
      </div>}

      {mode === FINISHED && <div><FeedbackCard />
        <button className='w-full bg-green-200 rounded-full p-2
        border border-transparent active:border-green-500 shadow-lg'
          onClick={() => {
            dispatch(finishRide())
            navigate("/history");
          }}>Done</button></div>}
    </div>
  </>
  )
}

export default Active