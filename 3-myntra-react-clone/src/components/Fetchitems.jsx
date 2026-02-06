import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.markFetchingStarted());

    // Use products endpoint and normalize fields to the app's expected shape
    fetch("https://dummyjson.com/products?limit=50", { signal })
      .then((res) => res.json())
      .then(({ products }) => {
        const mapped = products.map((p, index) => ({
          id: p.id,
          image: Array.isArray(p.images) && p.images.length ? p.images[0] : "",
          rating: { stars: p.rating ?? 0, count: p.stock ?? 0 },
          company: p.brand ?? "",
          item_name: p.title ?? "",
          current_price: p.price ?? 0,
          original_price:
            p.discountPercentage != null
              ? Math.round(p.price / (1 - p.discountPercentage / 100))
              : p.price,
          discount_percentage: p.discountPercentage
            ? Math.round(p.discountPercentage)
            : 0,
          return_period: 14,
          delivery_date: new Date(
            Date.now() + (3 + (index % 5)) * 24 * 60 * 60 * 1000,
          ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        }));

        dispatch(itemsActions.addInitialItems(mapped));
        dispatch(fetchStatusActions.markFetchDone());
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      })
      .finally(() => {
        dispatch(fetchStatusActions.markFetchingFinished());
      });

    return () => controller.abort();
  }, [fetchStatus.fetchDone, dispatch]);

  // This component handles background fetching; it doesn't render UI now.
  return null;
};

export default FetchItems;
