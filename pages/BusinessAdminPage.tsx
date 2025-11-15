import React from 'react';
import { categories } from '../data/categories';

const BusinessAdminPage: React.FC = () => {

    const handleRegistrationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const businessData = {
            name: formData.get('businessName'),
            category: formData.get('category'),
            description: formData.get('description'),
            phone: formData.get('phone'),
            instagram: formData.get('instagram'),
            facebook: formData.get('facebook'),
            files: (formData.get('file-upload') as File)?.name ? 'Arquivos selecionados' : 'Nenhum arquivo selecionado'
        };

        // 1. Simulate sending the email by logging to the console
        console.log("--- SIMULAÇÃO DE ENVIO DE E-MAIL ---");
        console.log("Para: thiagoanalista.estacio@gmail.com");
        console.log("Assunto: Novo Cadastro de Estabelecimento Recebido");
        console.log("Corpo do E-mail (Dados do Formulário):");
        console.log(JSON.stringify(businessData, null, 2));
        console.log("--------------------------------------");

        // 2. Alert the user
        alert('Cadastro enviado com sucesso! Nossa equipe recebeu seus dados e entrará em contato em breve para acordar o pagamento e ativar seu perfil.');

        // 3. Reset the form
        event.currentTarget.reset();
    };


    return (
        <div className="container mx-auto max-w-4xl">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h1 className="text-3xl font-bold mb-2 text-green-800">Cadastre seu Estabelecimento</h1>
                <p className="text-gray-500 mb-8">Preencha o formulário abaixo. Após o envio, nossa equipe receberá seus dados, fará a validação e entrará em contato para combinar o pagamento e ativar seu anúncio no app.</p>

                <form className="space-y-8" onSubmit={handleRegistrationSubmit}>
                    {/* Basic Info */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Informações Básicas</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Nome do Estabelecimento</label>
                                <input type="text" id="businessName" name="businessName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
                                <select id="category" name="category" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
                                    <option value="">Selecione uma categoria</option>
                                    {categories.map(category => (
                                      <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                            <textarea id="description" name="description" rows={4} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" placeholder="Descreva seu negócio, produtos e serviços..."></textarea>
                        </div>
                    </div>

                    {/* Contact & Social */}
                    <div className="border-b pb-6">
                         <h2 className="text-xl font-semibold text-gray-700 mb-4">Contato e Redes Sociais</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone para Contato (WhatsApp)</label>
                                <input type="tel" id="phone" name="phone" required placeholder="(11) 99999-8888" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram (link)</label>
                                <input type="url" id="instagram" name="instagram" placeholder="https://instagram.com/seunegocio" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                            </div>
                             <div>
                                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">Facebook (link)</label>
                                <input type="url" id="facebook" name="facebook" placeholder="https://facebook.com/seunegocio" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                            </div>
                         </div>
                    </div>

                    {/* Photos */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Fotos (até 10)</h2>
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:text-green-500">
                                        <span>Carregar arquivos</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" />
                                    </label>
                                    <p className="pl-1">ou arraste e solte</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end pt-6">
                        <button type="submit" className="bg-green-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors shadow-lg">
                            Enviar Cadastro para Análise
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BusinessAdminPage;
