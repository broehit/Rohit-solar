import { useState } from 'react';
import { Calculator as CalcIcon, TrendingUp, DollarSign, Zap } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Calculator() {
  const [monthlyBill, setMonthlyBill] = useState('');
  const [electricityRate, setElectricityRate] = useState('8');
  const [systemSize, setSystemSize] = useState('');
  const [results, setResults] = useState<{
    annualGeneration: number;
    annualSavings: number;
    paybackPeriod: number;
    savings25Years: number;
    monthlySavings: number;
  } | null>(null);

  const calculateSavings = (e: React.FormEvent) => {
    e.preventDefault();

    const bill = parseFloat(monthlyBill);
    const rate = parseFloat(electricityRate);
    const size = parseFloat(systemSize);

    if (isNaN(bill) || isNaN(rate) || isNaN(size)) return;

    const annualGeneration = size * 1200;
    const annualSavings = (annualGeneration * rate);
    const monthlySavings = annualSavings / 12;
    const systemCost = size * 50000;
    const paybackPeriod = systemCost / annualSavings;
    const savings25Years = (annualSavings * 25) - systemCost;

    setResults({
      annualGeneration,
      annualSavings,
      paybackPeriod,
      savings25Years,
      monthlySavings,
    });
  };

  const generateYearlyData = () => {
    if (!results) return { labels: [], data: [] };

    const labels = [];
    const data = [];
    let cumulative = -parseFloat(systemSize) * 50000;

    for (let year = 0; year <= 25; year++) {
      labels.push(`Year ${year}`);
      if (year > 0) {
        cumulative += results.annualSavings;
      }
      data.push(cumulative);
    }

    return { labels, data };
  };

  const chartData = generateYearlyData();

  const lineChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Cumulative Savings (₹)',
        data: chartData.data,
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ['Year 5', 'Year 10', 'Year 15', 'Year 20', 'Year 25'],
    datasets: [
      {
        label: 'Savings (₹)',
        data: results ? [
          results.annualSavings * 5 - (parseFloat(systemSize) * 50000),
          results.annualSavings * 10 - (parseFloat(systemSize) * 50000),
          results.annualSavings * 15 - (parseFloat(systemSize) * 50000),
          results.annualSavings * 20 - (parseFloat(systemSize) * 50000),
          results.annualSavings * 25 - (parseFloat(systemSize) * 50000),
        ] : [],
        backgroundColor: [
          'rgba(234, 179, 8, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(22, 163, 74, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Solar Savings Calculator</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Calculate your potential savings with solar energy over 25 years
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-2 mb-6">
              <CalcIcon className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Enter Your Details</h2>
            </div>

            <form onSubmit={calculateSavings} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Electricity Bill (₹)
                </label>
                <input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  placeholder="e.g., 5000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Electricity Rate (₹/kWh)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(e.target.value)}
                  placeholder="e.g., 8"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Solar System Size (kW)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={systemSize}
                  onChange={(e) => setSystemSize(e.target.value)}
                  placeholder="e.g., 5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Recommended: {monthlyBill ? Math.ceil(parseFloat(monthlyBill) / 1000) : '-'} kW
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:from-yellow-600 hover:to-orange-700 transition-all shadow-lg"
              >
                Calculate Savings
              </button>
            </form>
          </div>

          {results && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Savings Estimate</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center text-yellow-700 mb-2">
                    <Zap className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">Annual Generation</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {results.annualGeneration.toLocaleString()} kWh
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center text-green-700 mb-2">
                    <DollarSign className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">Monthly Savings</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{results.monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center text-orange-700 mb-2">
                    <TrendingUp className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">Annual Savings</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{results.annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center text-blue-700 mb-2">
                    <CalcIcon className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">Payback Period</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {results.paybackPeriod.toFixed(1)} years
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-700 to-green-900 text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Savings Over 25 Years</h3>
                <p className="text-4xl font-bold">
                  ₹{results.savings25Years.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          )}
        </div>

        {results && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cumulative Savings Over Time</h3>
              <Line data={lineChartData} options={chartOptions} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">5-Year Savings Projection</h3>
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
