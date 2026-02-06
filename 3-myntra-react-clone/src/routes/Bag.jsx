import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import BagSummary from "../components/BagSummary";
import BagItem from "../components/BagItem";

const Bag = () => {
  const dispatch = useDispatch();
  const bagItems = useSelector((store) => store.bag) || [];

  const handleRemoveFromBag = (itemId) => {
    dispatch(bagActions.removeFromBag(itemId));
  };

  const totalMRP = bagItems.reduce(
    (sum, item) => sum + (item.original_price || 0),
    0,
  );
  const totalDiscount = bagItems.reduce(
    (sum, item) =>
      sum + ((item.original_price || 0) - (item.current_price || 0)),
    0,
  );
  const convenienceFee = 40;
  const finalPayment = totalMRP - totalDiscount + convenienceFee;

  return (
    <main>
      <div className="bag-page">
        <div className="bag-items-container">
          {bagItems.length === 0 ? (
            <p style={{ fontSize: "18px", color: "#282c3f" }}>
              Your bag is empty
            </p>
          ) : (
            bagItems.map((item) => (
              <BagItem
                key={item.id}
                item={item}
                removeFromBag={handleRemoveFromBag}
              />
            ))
          )}
        </div>

        {bagItems.length > 0 && (
          <BagSummary
            totalItem={bagItems.length}
            totalMRP={totalMRP}
            totalDiscount={totalDiscount}
            finalPayment={finalPayment}
            convenienceFee={convenienceFee}
          />
        )}
      </div>
    </main>
  );
};

export default Bag;
