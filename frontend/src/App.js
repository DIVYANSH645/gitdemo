import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App = () => {
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState({});
    const [selectedMonth, setSelectedMonth] = useState('2024-07');

    useEffect(() => {
        fetchTransactions(selectedMonth);
        fetchStats(selectedMonth);
    }, [selectedMonth]);

    const fetchTransactions = async (month) => {
        try {
            const response = await axios.get(`http://localhost:3000/${month}`);
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const fetchStats = async (month) => {
        try {
            const response = await axios.get(`http://localhost:3000/stats/${month}`);
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const columns = React.useMemo(
        () => [
            { Header: 'ID', accessor: '_id' },
            { Header: 'Date of Sale', accessor: 'dateOfSale' },
            { Header: 'Price', accessor: 'price' },
            { Header: 'Sold', accessor: 'sold' }
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: transactions });

    const chartData = {
        labels: ['Total Sales', 'Total Sold Items', 'Total Not Sold Items'],
        datasets: [
            {
                label: 'Statistics',
                data: [stats.totalSaleAmount || 0, stats.totalSoldItems || 0, stats.totalNotSoldItems || 0],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    return (
        <div>
            <h1>Transaction Dashboard</h1>
            <select value={selectedMonth} onChange={handleMonthChange}>
                <option value="2024-07">July 2024</option>
                <option value="2024-08">August 2024</option>
                {/* Add more months as needed */}
            </select>

            <h2>Transactions</h2>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <h2>Statistics</h2>
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
    );
};

export default App;
