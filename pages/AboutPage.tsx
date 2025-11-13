import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="container mx-auto max-w-4xl">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h1 className="text-3xl font-bold mb-4 text-green-800">Quem Somos</h1>
                <div className="prose max-w-none text-gray-700 space-y-4">
                    <p>
                        O <strong>Meu Bairro Conectado</strong> nasceu de uma ideia simples: fortalecer o comércio local e facilitar a vida dos moradores. Acreditamos que cada bairro tem um universo de serviços, produtos e experiências incríveis a serem descobertos, e nossa missão é ser a ponte que conecta você a tudo isso.
                    </p>
                    <p>
                        Para os <strong>moradores</strong>, somos a forma mais fácil e inteligente de encontrar exatamente o que precisam, seja um salão de beleza de última hora, a melhor lanchonete da região ou uma loja de material de construção para aquela reforma sonhada. Com o poder da inteligência artificial, nossa busca entende o que você quer e traz os melhores resultados, perto de você.
                    </p>
                     <p>
                        Para os <strong>lojistas e empreendedores</strong>, somos o parceiro ideal para aumentar a visibilidade e atrair mais clientes. Oferecemos uma plataforma onde você pode cadastrar seu negócio, mostrar seus produtos com fotos, compartilhar suas redes sociais e anunciar promoções diretamente para quem está mais perto: seus vizinhos.
                    </p>
                     <p>
                        Junte-se a nós e vamos, juntos, construir bairros mais fortes, conectados e prósperos.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
