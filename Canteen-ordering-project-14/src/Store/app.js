import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  restaurantData: [],
  cartData: [],
};

// helper function to update image urls
// dummy dish images
const dummyMenuItemImage = [
  "https://t3.ftcdn.net/jpg/06/15/30/52/240_F_615305272_33za7OoIucKSdHqnXhj7Yplofli5OSTd.jpg",
  "https://t4.ftcdn.net/jpg/04/16/68/71/240_F_416687114_Tw5evwgHq33s8hbwJVFiim28qlqiJaid.jpg",
  "https://as1.ftcdn.net/v2/jpg/04/16/04/82/1000_F_416048265_vu7bQVd1CDYLuJ9xpVKvv8gHkQM9ptJb.jpg",   // Example placeholder image for Pizza
  "https://as1.ftcdn.net/v2/jpg/06/70/75/96/1000_F_670759654_DStcleVHR7fNd4EmDCONz0jx8fJ9jo4j.jpg",  // Example placeholder image for Burger
  "https://media.gettyimages.com/id/543739338/photo/the-replica-food-manufactured-from-vinyl-chloride-is-displayed-at-the-companys-workshop-in.jpg?s=612x612&w=0&k=20&c=OV5wgxkkPrG22Amz_Axuu4XcuMTPXyo910LhBa5Egq8=",
  "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2023/06/pouring-honey-on-pancakes.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2023/05/steak-cooked-on-fire.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/ff-images/2025/05/colorful-breakfast-bowl-with-eggs-and-vegetables.webp",
  "https://www.foodiesfeed.com/wp-content/uploads/ff-images/2025/09/savory-taco-with-fresh-toppings-in-basket.webp",
];

export const dummyRestaurantImage = [
  "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
  "https://images.unsplash.com/photo-1543353071-087092ec393f?w=800",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  "https://images.unsplash.com/photo-1584931423298-c576fda54bd1?w=800",
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
];

const getRandomDummyImage = (imglist) => {
  const idx = Math.floor(Math.random() * imglist.length);
  return imglist[idx];
}

/// @brief: Update the response payload by replacing the 
/// image url for each menu item
/// restaurantData: Array of individual restaurant details
const updateMenuItemImageUrls = (restaurantData) => {
  const updatedRestaurants = restaurantData.map((res) => {

    const updated_menu = res.menu.map((item) => ({ ...item, image_url: getRandomDummyImage(dummyMenuItemImage) }))

    return {
      ...res,
      image_url: getRandomDummyImage(dummyRestaurantImage),
      menu: [...updated_menu]
    }
  })
  return updatedRestaurants;
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRestaurantData: (state, action) => {
      state.restaurantData = updateMenuItemImageUrls(action.payload);
    },
    addItemsInCart: (state, action) => {
      const { resId, item_id } = action.payload;

      const resInCart = state.cartData.find((obj) => obj.id == resId);

      if (!resInCart) {
        // then we have to add the resaturant as well ass the item
        const restaurantData = state.restaurantData.find(
          (data) => data.id === resId
        );
        const itemData = restaurantData.menu.find(
          (data) => data.item_id === item_id
        );
        state.cartData.push({
          id: resId,
          restaurantDetails: {
            name: restaurantData.name,
            cuisine: restaurantData.cuisine,
            address: restaurantData.address,
            image_url: restaurantData.image_url,
          },
          menuItems: [{ ...itemData, quantity: 1 }],
        });
      } else {
        const itemExist = resInCart.menuItems.find(
          (data) => data.item_id === item_id
        );

        if (itemExist) {
          itemExist.quantity += 1;
        } else {
          const restaurantData = state.restaurantData.find(
            (data) => data.id === resId
          );
          const itemData = restaurantData.menu.find(
            (data) => data.item_id === item_id
          );
          resInCart.menuItems.push({ ...itemData, quantity: 1 });
        }
      }
    },
    deleteItemsInCart: (state, action) => {
      console.log("handleDeleteItem");
      const { resId, item_id } = action.payload;
      const resDataIncartIndex = state.cartData.findIndex(
        (obj) => obj.id === resId
      );
      const resDataIncart = state.cartData[resDataIncartIndex];
      const itemIndex = resDataIncart.menuItems.findIndex(
        (obj) => obj.item_id === item_id
      );

      if (resDataIncart.menuItems[itemIndex].quantity == 1) {
        state.cartData[resDataIncartIndex].menuItems.splice(itemIndex, 1);
      } else {
        state.cartData[resDataIncartIndex].menuItems[itemIndex].quantity -= 1;
      }
    },
  },
});

export const { setRestaurantData, addItemsInCart, deleteItemsInCart } =
  appSlice.actions;

export default appSlice.reducer;
// [
//     {
//       id: "",
//       restaurantDetails: {
//         name: "",
//         cuisine: "",
//         address: "669 Main St, Food District",
//         image_url:
//           "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
//       },
//       menuItems: [
//         {
//          quantity : 1,
//           item_id: "res_001_m01",
//           name: "Italian Signature Plate",
//           price: 35.18,
//           description:
//             "A delicious Italian Signature Plate made with fresh, locally sourced ingredients.",
//           image: "https://picsum.photos/seed/res_001_m01/400/300",
//         },
//       ],
//     },
//   ]