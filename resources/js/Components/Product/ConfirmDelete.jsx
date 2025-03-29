import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function ConfirmDelete({ product, onClose, onConfirm }) {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-[30rem] text-center">
                <div className="flex justify-center mb-6">
                    <TrashIcon className="h-20 w-20 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    CONFIRMAR ELIMINACIÓN
                </h2>
                <p className="mb-8 text-xl text-gray-700">
                    ¿Estás seguro de eliminar el producto
                    <br />
                    <strong className="text-2xl">
                        {product?.name || "desconocido"}
                    </strong>
                    ?
                </p>
                <div className="flex justify-center gap-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition text-lg"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-3 text-lg"
                    >
                        <TrashIcon className="h-7 w-7" />
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}
