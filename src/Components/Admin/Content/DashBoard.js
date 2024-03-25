import "./Dashboard.scss";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getOverView } from "../../../Service/ApiServeice";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

const Dashboard = () => {

    const [dataOverView, setDataOverView] = useState({});

    const data = {
        labels: ['Quiz', 'Question', 'Answer'],
        datasets: [
            {
                label: 'Data',
                data: [dataOverView?.others?.countQuiz, dataOverView?.others?.countQuestions, dataOverView?.others?.countAnswers],
                backgroundColor: 'white',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: ['Quiz', 'Question', 'Answer'],
                ticks: {
                    color: 'blakc',  // Màu chữ
                    font: {
                        size: 20,  // Kích thước chữ
                        weight: 'bold'  // Độ đậm của chữ
                    }
                }
            },
            y: {
                type: 'linear',
                beginAtZero: true,
                ticks: {
                    color: 'black',  // Màu chữ
                    font: {
                        size: 20,  // Kích thước chữ
                        weight: 'bold'  // Độ đậm của chữ
                    }
                }
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'black',  // Màu chữ
                    font: {
                        size: 20,
                        weight: 'bold'
                    }
                }
            }
        }
    };


    useEffect(() => {
        fetchOverView();
    }, [])

    const fetchOverView = async () => {
        let res = await getOverView();
        setDataOverView(res.DT)
        console.log(dataOverView)
    }

    return (
        <>
            <div className="dashboard-container">
                <div className="dashboard-title">
                    Analytics Dashboard
                </div>
                <div className="dashboard-content">
                    <div className='dashboard-left'>
                        <div className="dashboard-left-content">
                            <div>Total User</div>
                            <div><b>{dataOverView?.users?.total}</b></div>
                        </div>
                        <div className="dashboard-left-content">
                            <div>Total Quiz</div>
                            <div><b>{dataOverView?.others?.countQuiz}</b></div>
                        </div>
                        <div className="dashboard-left-content">
                            <div>Total Question</div>
                            <div><b>{dataOverView?.others?.countQuestions}</b></div>
                        </div>
                        <div className="dashboard-left-content">
                            <div>Total Answer</div>
                            <div><b>{dataOverView?.others?.countAnswers}</b></div>
                        </div>
                    </div>
                    <div className='dashboard-right'>
                        <Bar data={data} options={options} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Dashboard;
