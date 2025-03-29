import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const products = [
    {
        id: 1,
        name: "Sudadera",
        price: 100,
        image: "/images/productos/producto1.jpg",
        description: "Una sudadera cómoda y moderna.",
        stock: 20,
        deliveryTime: "2-3 días",
    },
    {
        id: 2,
        name: "Gorra",
        price: 200,
        image: "/images/productos/producto2.jpg",
        description: "Gorra perfecta para protegerte del sol.",
        stock: 15,
        deliveryTime: "1-2 días",
    },
    {
        id: 3,
        name: "Playera",
        price: 300,
        image: "/images/productos/producto3.jpg",
        description: "Playera ligera y fresca para el verano.",
        stock: 10,
        deliveryTime: "3-4 días",
    },
    {
        id: 4,
        name: "Chaleco",
        price: "400",
        image: "/images/productos/producto4.jpg",
        description: "Chaleco ideal para el clima frío.",
        stock: 10,
        deliveryTime: "6-10 días",
    },
    {
        id: 5,
        name: "Bufanda",
        price: "250",
        image: "/images/productos/producto4.jpg",
        description: "Bufanda cálida y elegante.",
        stock: 20,
        deliveryTime: "1-4 días",
    },
    {
        id: 6,
        name: "Short",
        price: "450",
        image: "/images/productos/producto4.jpg",
        description: "Short cómodo para actividades deportivas.",
        stock: 10,
        deliveryTime: "5-10 días",
    },
    {
        id: 7,
        name: "Camisa",
        price: "500",
        image: "/images/productos/producto4.jpg",
        description: "Camisa formal para ocasiones especiales.",
        stock: 15,
        deliveryTime: "10-15 días",
    },
    {
        id: 8,
        name: "Chaqueta",
        price: "800",
        image: "/images/productos/producto4.jpg",
        description: "Chaqueta resistente para el invierno.",
        stock: 25,
        deliveryTime: "10-20 días",
    },
];

export default function Dashboard() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [likes, setLikes] = useState({});

    const handleImageClick = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    const handleLike = (id) => {
        setLikes((prevLikes) => {
            if (prevLikes[id]) return prevLikes; // Si ya hay "me gusta", no hacer nada
            return {
                ...prevLikes,
                [id]: 1, // Establece el "me gusta" en 1
            };
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Menú de Productos
                </h2>
            }
        >
            <Head title="Menú de Productos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-800"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover cursor-pointer"
                                    onClick={() => handleImageClick(product)}
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        ${product.price}
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Likes: {likes[product.id] || 0}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                        {selectedProduct.name}
                                    </h3>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <p className="text-4xl text-gray-700 dark:text-gray-300 mt-4">
                                    ${selectedProduct.price}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mt-4">
                                    {selectedProduct.description}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 mt-4">
                                    Tiempo de llegada:{" "}
                                    {selectedProduct.deliveryTime}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">
                                    Stock disponible: {selectedProduct.stock}
                                </p>
                                <div className="mt-6 flex gap-4">
                                    <button
                                        onClick={() =>
                                            handleLike(selectedProduct.id)
                                        }
                                        className="p-2 rounded-full border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    >
                                        ♥
                                    </button>
                                    <button className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500">
                                        Agregar al carrito
                                    </button>
                                    <button className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500">
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
