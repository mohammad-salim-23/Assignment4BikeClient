/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Overview = ({ role }: { role: string }) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [orderStats, setOrderStats] = useState<{ month: string; orders: number }[]>([]);
  const [recentOrders, setRecentOrders] = useState<{ key: number; name: string; product: string; status: string; price: string }[]>([]);

  useEffect(() => {
    // Mock API calls
    setTotalUsers(120);
    setTotalOrders(450);
    setTotalProducts(78);

    setOrderStats([
      { month: "Jan", orders: 40 },
      { month: "Feb", orders: 60 },
      { month: "Mar", orders: 80 },
      { month: "Apr", orders: 50 },
      { month: "May", orders: 90 },
    ]);

    setRecentOrders([
      { key: 1, name: "Salim", product: "Helmet", status: "Delivered", price: "$50" },
      { key: 2, name: "Naiem", product: "Gloves", status: "Pending", price: "$20" },
      { key: 3, name: "Rasel", product: "Jacket", status: "Cancelled", price: "$70" },
    ]);
  }, []);

  const orderStatusPie = [
    { name: "Delivered", value: 300 },
    { name: "Pending", value: 100 },
    { name: "Cancelled", value: 50 },
  ];

  const columns = [
    { title: "Customer", dataIndex: "name", key: "name" },
    { title: "Product", dataIndex: "product", key: "product" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  return (
    <div className="space-y-6">
      {/* Cards */}
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Total Users" bordered={false}>
            {totalUsers}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Orders" bordered={false}>
            {totalOrders}
          </Card>
        </Col>
        {role === "admin" && (
          <Col span={8}>
            <Card title="Total Products" bordered={false}>
              {totalProducts}
            </Card>
          </Col>
        )}
      </Row>

      {/* Bar and Pie Charts */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Monthly Orders">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderStats}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Order Status">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={orderStatusPie} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                  {orderStatusPie.map(( index :any) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Card title="Recent Orders">
        <Table columns={columns} dataSource={recentOrders} pagination={false} />
      </Card>
    </div>
  );
};

export default Overview;
