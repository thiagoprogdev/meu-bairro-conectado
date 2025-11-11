
import React from 'react';

const HelpPage: React.FC = () => {

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.');
        // Here you would typically handle form submission, e.g., send data to an API
        (event.target as HTMLFormElement).reset();
    };


    return (
        <div className="container mx-auto max-w-2xl">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h1 className="text-3xl font-bold mb-2 text-green-800">Central de Ajuda</h1>
                <p className="text-gray-500 mb-8">Tem alguma dúvida ou sugestão? Preencha o formulário abaixo e nossa equipe entrará em contato.</p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                        <input type="text" id="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input type="email" id="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone para Contato</label>
                        <input type="tel" id="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Sua Mensagem</label>
                        <textarea id="message" rows={5} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"></textarea>
                    </div>
                    <div>
                        <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">Anexar Imagem (opcional)</label>
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:text-green-500">
                                        <span>Carregar arquivo</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">ou arraste e solte</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                         <button type="submit" className="bg-green-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors shadow-lg">
                            Enviar Mensagem
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HelpPage;
