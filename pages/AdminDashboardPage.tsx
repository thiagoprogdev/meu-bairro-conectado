
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const searchesData = [
  { name: 'Salão', buscas: 400 },
  { name: 'Restaurante', buscas: 300 },
  { name: 'Construção', buscas: 200 },
  { name: 'Papelaria', buscas: 278 },
  { name: 'Pet Shop', buscas: 189 },
  { name: 'Mercado', buscas: 239 },
  { name: 'Farmácia', buscas: 349 },
];

const visitsData = [
  { name: 'Jan', visits: 400 },
  { name: 'Fev', visits: 300 },
  { name: 'Mar', visits: 500 },
  { name: 'Abr', visits: 450 },
  { name: 'Mai', visits: 600 },
  { name: 'Jun', visits: 800 },
];

const StatCard: React.FC<{ title: string; value: string; change: string; }> = ({ title, value, change }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        <p className="text-sm text-green-500 mt-2">{change}</p>
    </div>
);

const AdminDashboardPage: React.FC = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-green-800">Painel de Controle do Administrador</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Visitas Totais" value="12,450" change="+12% vs. último mês" />
                <StatCard title="Buscas Realizadas" value="38,920" change="+8% vs. último mês" />
                <StatCard title="Novos Cadastros" value="78" change="+5% vs. último mês" />
                <StatCard title="Receita Mensal" value="R$ 1.560,00" change="+2% vs. último mês" />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Categorias Mais Buscadas</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={searchesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="buscas" fill="#166534" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Visitas no Site (Últimos 6 Meses)</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={visitsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="visits" stroke="#84cc16" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
