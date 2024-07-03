import React from 'react';
import { ReactIcon, TailwindIcon, TypeScriptIcon } from '../shared/components/iconSvg';
import { NavLink } from 'react-router-dom';

const About: React.FC = () => {
    return (
        <div className='bg-cover bg-center home-background flex items-center p-4 '>
            <div className="max-w-4xl mx-auto p-8 bg-white/80 rounded-lg h-80% border-2 border-lightGreen shadow-lg shadow-darkGreen/50">
                <h1 className="text-3xl font-bold mb-6 border-b-2 border-beige pb-3">À <span className='text-midGreen'>propos</span></h1>

                <p className="text-lg mb-4">
                    Bienvenue sur l'application <span className='text-midGreen font-bold'>Nest !</span>
                </p>
                <p className="text-lg mb-4">
                    <span className='text-midGreen font-bold'>Nest</span> est une plateforme de réservation de cabanes dans les arbres.
                </p>
                <p className="text-lg mb-4">
                    Cette application a été initialement co-designée et co-développée avec <NavLink to="https://www.linkedin.com/in/matbac/" className="text-darkGreen underline font-medium">Mathilde Baclin</NavLink> dans le cadre du projet final de notre formation de développeur front-end au centre Technocité d'Hornu.
                </p>
                <p className="text-lg mb-4">
                    Ceci est ma version de l'application, et je suis heureux de partager ce projet avec vous.
                </p>
                <p className="text-lg mb-4">
                    Merci pour votre visite !
                </p>

                <h2 className="text-xl mt-8 font-bold text-midGreen">
                    Technologies utilisées :
                </h2>
                <ul className="list-disc list-inside mt-8 flex gap-5 ">
                    <li className="flex flex-col justify-center items-center"><span className='border-2 p-2 rounded-full border-midGreen bg-white'><ReactIcon /></span>React</li>
                    <li className="flex flex-col justify-center items-center"><span className='border-2 p-2 rounded-full border-midGreen bg-white'><TypeScriptIcon /></span>TypeScript</li>
                    <li className="flex flex-col justify-center items-center"><span className='border-2 p-2 rounded-full border-midGreen bg-white'><TailwindIcon /></span>Tailwind</li>
                </ul>
                <p className="text-sm mt-12 text-end">
                    Temps de développement : 5 jours
                </p>

            </div>
        </div>
    );
};

export default About;