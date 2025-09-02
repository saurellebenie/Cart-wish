import React, { useContext } from "react";
import "./MyOrderPage.css";
import Table from "../Common/Table";

import useData from "../../hooks/useData";
import Loader from "../Common/Loader";

const MyOrderPage = () => {
  const {
    data: orders,
    error,
    isLoading,
  } = useData("/order", null, ["myorders"], 1 * 60 * 1000);

  const getProductString = (order) => {
    const productString = order.products.map(
      (i) => `${i.product.title} ${i.quantity}`
    );
    return productString.join(", ");
  };
  return (
    <section className="align_center myorder_page">
      {isLoading && <Loader />}
      {error && <em className="form_error">{error}</em>}
      {orders && (
        <Table headings={["Order", "Product", "Total", "Status"]}>
          <tbody>
            {orders.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td> {getProductString(item)}</td>
                <td>{item.total}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  );
};

export default MyOrderPage;
