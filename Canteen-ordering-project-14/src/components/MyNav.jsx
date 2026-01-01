import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyNav = () => {
  const cartData = useSelector((state) => state.app.cartData);
  const cartItemCount = cartData.reduce((total, res) => {
    return total + res.menuItems.reduce((sum, item) => sum + item.quantity, 0);
  }, 0);

  return <nav className="w-full bg-white shadow-md sticky top-0 z-100">
    <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-2xl font-bold text-orange-500 tracking-wide">🍽️ Canteen</h1>
      </Link>

      <Link
        to="/cart"
        className=" relative bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300"
      >
        Cart
        {cartItemCount !== 0 && <span className="absolute -top-1 -right-2 bg-orange-600 text-white rounded-full px-2 py-1 text-xs font-bold">
          {cartItemCount}
        </span>}
      </Link>

    </div>
  </nav>
}

export default MyNav;