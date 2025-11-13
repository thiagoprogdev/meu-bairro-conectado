import React from 'react';

interface PlanCardProps {
    title: string;
    price: string;
    features: string[];
    isFeatured?: boolean;
}

const CheckIcon: React.FC = () => (
    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);


const PlanCard: React.FC<PlanCardProps> = ({ title, price, features, isFeatured }) => {
    return (
        <div className={`border rounded-lg p-6 flex flex-col ${isFeatured ? 'border-green-500 border-2' : 'border-gray-200'}`}>
            {isFeatured && <span className="text-xs font-bold uppercase tracking-wider bg-green-500 text-white px-3 py-1 rounded-full self-start mb-4">Mais Popular</span>}
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
            <p className="mt-2">
                <span className="text-4xl font-extrabold text-gray-900">{price}</span>
                <span className="text-base font-medium text-gray-500">/mês</span>
            </p>
            <ul className="mt-6 space-y-4 text-gray-600 flex-grow">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <div className="flex-shrink-0"><CheckIcon/></div>
                        <span className="ml-3">{feature}</span>
                    </li>
                ))}
            </ul>
            <button className={`mt-8 w-full font-bold py-3 px-6 rounded-lg transition-colors ${isFeatured ? 'bg-green-700 text-white hover:bg-green-600' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}>
                Assinar Agora
            </button>
        </div>
    );
};

const PlansPage: React.FC = () => {
    return (
        <div className="container mx-auto max-w-5xl">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-green-800">Planos Feitos para o seu Negócio</h1>
                <p className="mt-4 text-lg text-gray-500">Escolha o plano ideal para aumentar sua visibilidade e conectar-se com clientes no seu bairro.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PlanCard
                    title="Básico"
                    price="R$ 19,90"
                    features={[
                        'Página de perfil completa',
                        'Cadastro em 1 categoria',
                        'Até 5 fotos na galeria',
                        'Link para redes sociais'
                    ]}
                />
                 <PlanCard
                    title="Destaque"
                    price="R$ 39,90"
                    features={[
                        'Todos os benefícios do Básico',
                        'Cadastro em até 3 categorias',
                        'Até 10 fotos na galeria',
                        'Aparição na seção "Destaques"',
                        'Envio de notificações de promoções'
                    ]}
                    isFeatured
                />
                 <PlanCard
                    title="Premium"
                    price="R$ 59,90"
                    features={[
                        'Todos os benefícios do Destaque',
                        'Cadastro em categorias ilimitadas',
                        'Galeria de fotos ilimitada',
                        'Suporte prioritário via WhatsApp',
                        'Relatórios de visitas mensais'
                    ]}
                />
            </div>
        </div>
    );
};

export default PlansPage;
