import React from 'react';

interface ModalProps {
    show: boolean;
    handleClose: () => void;
}

const Modal = ({ show, handleClose }: ModalProps) => {
    return (
        <div className={`modal ${show ? 'show' : ''} bg-white border-midGreen l`}>
            <div className="modal-content max-[900px]:w-[80%] w-[50%] ">
                <h1 className="text-1xl mb-8 font-bold  md:text-2xl border-b-2 border-beige pb-3">Note <span className='text-midGreen'> importante</span></h1>
                <p>
                    Nest est une application fictive initialement co-designée et co-réalisée dans le cadre d'un projet final de formation.
                </p>
                <p className='mb-4'>
                    Les données présentées sur ce site sont fictives et ne représentent pas de vrais lieux de vacances.
                </p>
                <p className='mb-4'>
                    Cette application est une version personnelle et plus complète de l'application initiale.
                </p>
                <p >
                    Aucune donnée n'est conservée.
                </p>
                <button onClick={handleClose} className="bg-midGreen h-fit py-2 px-5 rounded-lg text-white border border-midGreen hover:bg-darkGreen hover:border-darkGreen mt-6">
                    Ok
                </button>
            </div>
        </div>
    );
};

export default Modal;