import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiSquareRemove } from "react-icons/ci";

const HomeItem = ({ item }) => {
  const dispatch = useDispatch();
  const bagItems = useSelector((store) => store.bag) || [];

  const isInBag = bagItems.some((bagItem) => bagItem.id === item.id);

  const handleAddToBag = () => {
    dispatch(bagActions.addToBag(item));
  };

  const handleRemoveFromBag = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  return (
    <div className="item-container">
      <img
        className="item-image"
        src={item?.image || ""}
        alt={item?.item_name || "item"}
      />

      <div className="rating">
        {item?.rating?.stars ?? 0} ⭐ | {item?.rating?.count ?? 0}
      </div>

      <div className="company-name">{item?.company}</div>
      <div className="item-name">{item?.item_name}</div>

      <div className="price">
        <span className="current-price">Rs {item?.current_price ?? 0}</span>
        <span className="original-price">Rs {item?.original_price ?? 0}</span>
        <span className="discount">
          ({item?.discount_percentage ?? 0}% OFF)
        </span>
      </div>

      {isInBag ? (
        <button
          className="btn-add-bag btn btn-danger"
          onClick={handleRemoveFromBag}
        >
          <CiSquareRemove /> Remove
        </button>
      ) : (
        <button
          className="btn-add-bag btn btn-success"
          onClick={handleAddToBag}
        >
          <IoAddCircleOutline /> Add to Bag
        </button>
      )}
    </div>
  );
};

export default HomeItem;
