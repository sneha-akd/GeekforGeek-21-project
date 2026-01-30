import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurantData } from "./Store/app";

export function useGetResaturantData() {
  const dispatch = useDispatch();
  const restaurantData = useSelector((state) => state.app.restaurantData);
  async function getData() {
    console.log("api called");
    let apiData = await fetch(
      "https://6973175cb5f46f8b58261c61.mockapi.io/api/bookapp/v1/data"
    );
    let jsonData = await apiData.json();

    dispatch(setRestaurantData(jsonData[0].restaurants));
  }

  useEffect(() => {
    if (restaurantData.length !== 0) return;
    getData();
  }, [restaurantData]);
}