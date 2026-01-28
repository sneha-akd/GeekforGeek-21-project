import React from 'react'
import { useEffect, useState } from "react";
import { getShows } from "../api";
import ShowGrid from "../components/ShowGrid";
import SeatGrid from "../components/SeatGrid";

const Shows = ({ showLogin }) => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    getShows().then(res => {
      console.log("🚀 ~ App ~ res:", res)
      setShows(res.data)
    });
  }, []);

  return <>
    {!selectedShow && (
      <ShowGrid shows={shows} onSelect={setSelectedShow} />
    )}

    {
      selectedShow && (
        <SeatGrid
          show={selectedShow}
          onBack={() => setSelectedShow(null)}
          showLogin={showLogin}
        />
      )
    }
  </>
}

export default Shows