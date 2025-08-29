import React from "react";
import "./MyOrderPage.css";
import Table from "../Common/Table";

const MyOrderPage = () => {
  return (
    <section className="align_center myorder_page">
      <Table headings={["Order", "Product", "Total", "Status"]}>
        <tbody>
          <tr>
            <td>1</td>
            <td> iphone, Power Bank</td>
            <td>$1299</td>
            <td>Shipping</td>
          </tr>
        </tbody>
      </Table>
    </section>
  );
};

export default MyOrderPage;
