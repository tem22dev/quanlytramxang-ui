import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    registerables,
} from 'chart.js';
import { ViewEntryForm } from '../../pages/EntryForm/ViewEntryForm';
import { ViewInvoice } from '../../pages/Invoice/ViewInvoice';
import 'chartjs-adapter-date-fns';
ChartJS.register(...registerables);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
    dataEntryFormFetch: ViewEntryForm[];
    dataInvoiceFetch: ViewInvoice[];
}

const Chart: React.FC<Props> = ({ dataEntryFormFetch, dataInvoiceFetch }) => {
    // Xử lý dữ liệu cho biểu đồ
    const entryFormData = dataEntryFormFetch.map((item) => ({
        x: new Date(item.created_at_date),
        y: item.total_price,
    }));

    const invoiceData = dataInvoiceFetch.map((item) => ({
        x: new Date(item.created_at_date),
        y: item.total_price,
    }));

    const data = {
        labels: [...new Set([...entryFormData.map((item) => item.x), ...invoiceData.map((item) => item.x)])].sort(),
        datasets: [
            {
                label: 'Tổng giá trị phiếu nhập',
                data: entryFormData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
            },
            {
                label: 'Tổng giá trị hoá đơn',
                data: invoiceData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Thống kê phiếu nhập và hoá đơn',
            },
        },
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    unit: 'day' as const,
                    tooltipFormat: 'yyyy-MM-dd', // Định dạng ngày
                },
                title: {
                    display: true,
                    text: 'Ngày',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tổng giá trị (VNĐ)',
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default Chart;
