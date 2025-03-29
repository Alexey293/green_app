import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    PencilSquareIcon,
    PlusCircleIcon,
    TrashIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { useState, useRef, useEffect } from "react";
import ConfirmDelete from "@/Components/Product/ConfirmDelete";
import Pagination from "@/Components/Product/Pagination";

export default function Index({ products }) {
    const { delete: destroy } = useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const carouselRefs = useRef({});
    const [scrollStates, setScrollStates] = useState({});

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    // Inicializar estados de scroll
    useEffect(() => {
        const initialStates = {};
        currentProducts.forEach((product) => {
            initialStates[product.id] = {
                position: 0,
                maxScroll: Math.max(
                    0,
                    ((product.images?.length || 0) - 2) * 116
                ),
            };
        });
        setScrollStates(initialStates);
    }, [currentProducts]);

    const openDeleteModal = (id) => {
        setSelectedProduct(id);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const handleDelete = () => {
        if (selectedProduct) {
            destroy(route("products.destroy", selectedProduct));
            closeModal();
        }
    };

    const scrollCarousel = (productId, direction) => {
        const carousel = carouselRefs.current[productId];
        if (!carousel) return;

        const currentState = scrollStates[productId] || {
            position: 0,
            maxScroll: 0,
        };
        const scrollAmount = 232; // 2 imágenes (100px + 8px gap) * 2

        let newPosition;
        if (direction === "left") {
            newPosition = Math.max(0, currentState.position - scrollAmount);
        } else {
            newPosition = Math.min(
                currentState.maxScroll,
                currentState.position + scrollAmount
            );
        }

        carousel.scrollTo({
            left: newPosition,
            behavior: "smooth",
        });

        setScrollStates((prev) => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                position: newPosition,
            },
        }));
    };

    const handleScroll = (productId) => {
        const carousel = carouselRefs.current[productId];
        if (carousel) {
            setScrollStates((prev) => ({
                ...prev,
                [productId]: {
                    ...prev[productId],
                    position: carousel.scrollLeft,
                },
            }));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">
                    Lista de Productos
                </h2>
            }
        >
            <Head title="Productos" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex justify-end mb-4">
                            <Link
                                href="/products/create"
                                className="flex items-center px-4 py-2 bg-white text-gray-800 
                                border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 
                                hover:shadow-lg transition duration-300"
                            >
                                <PlusCircleIcon className="h-5 w-5 text-gray-800 mr-2" />
                                <span className="ml-1">Agregar Producto</span>
                            </Link>
                        </div>

                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <table className="w-full text-left text-gray-700">
                                <thead className="bg-gray-100">
                                    <tr className="text-gray-600 uppercase text-sm">
                                        <th className="px-6 py-3">Imágenes</th>
                                        <th className="px-6 py-3">Nombre</th>
                                        <th className="px-6 py-3">
                                            Descripción
                                        </th>
                                        <th className="px-6 py-3">Precio</th>
                                        <th className="px-6 py-3">Stock</th>
                                        <th className="px-6 py-3">Estado</th>
                                        <th className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentProducts.length > 0 ? (
                                        currentProducts.map((product) => {
                                            const imageCount =
                                                product.images?.length || 0;
                                            const showNavigation =
                                                imageCount > 2;
                                            const currentScroll =
                                                scrollStates[product.id]
                                                    ?.position || 0;
                                            const maxScroll =
                                                scrollStates[product.id]
                                                    ?.maxScroll || 0;

                                            return (
                                                <tr
                                                    key={product.id}
                                                    className="border-b hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="relative">
                                                            <div
                                                                ref={(el) =>
                                                                    (carouselRefs.current[
                                                                        product.id
                                                                    ] = el)
                                                                }
                                                                className="flex gap-2 overflow-x-auto py-2 w-[216px] scrollbar-hide"
                                                                onScroll={() =>
                                                                    handleScroll(
                                                                        product.id
                                                                    )
                                                                }
                                                                style={{
                                                                    scrollbarWidth:
                                                                        "none",
                                                                }}
                                                            >
                                                                {imageCount >
                                                                0 ? (
                                                                    product.images.map(
                                                                        (
                                                                            image
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    image.id
                                                                                }
                                                                                className="flex-shrink-0"
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        image.url.startsWith(
                                                                                            "http"
                                                                                        )
                                                                                            ? image.url
                                                                                            : `/storage/${image.url}`
                                                                                    }
                                                                                    alt={`Imagen de ${product.name}`}
                                                                                    className="w-24 h-24 rounded-md object-cover shadow-sm border"
                                                                                />
                                                                            </div>
                                                                        )
                                                                    )
                                                                ) : (
                                                                    <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                                                                        Sin
                                                                        imagen
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {showNavigation && (
                                                                <>
                                                                    {currentScroll >
                                                                        0 && (
                                                                        <button
                                                                            onClick={() =>
                                                                                scrollCarousel(
                                                                                    product.id,
                                                                                    "left"
                                                                                )
                                                                            }
                                                                            className="absolute left-1 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition"
                                                                        >
                                                                            <ChevronLeftIcon className="h-5 w-5" />
                                                                        </button>
                                                                    )}
                                                                    {currentScroll <
                                                                        maxScroll && (
                                                                        <button
                                                                            onClick={() =>
                                                                                scrollCarousel(
                                                                                    product.id,
                                                                                    "right"
                                                                                )
                                                                            }
                                                                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition"
                                                                        >
                                                                            <ChevronRightIcon className="h-5 w-5" />
                                                                        </button>
                                                                    )}
                                                                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                                                                        {Math.min(
                                                                            imageCount,
                                                                            Math.ceil(
                                                                                currentScroll /
                                                                                    116
                                                                            ) +
                                                                                2
                                                                        )}
                                                                        /
                                                                        {
                                                                            imageCount
                                                                        }
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold">
                                                        {product.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500 truncate max-w-xs">
                                                        {product.description}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium">
                                                        ${product.price}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {product.stock}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {product.status
                                                            ? "Activo"
                                                            : "Inactivo"}
                                                    </td>
                                                    <td className="px-6 py-4 flex space-x-2">
                                                        <Link
                                                            href={`/products/${product.id}/edit`}
                                                            className="p-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow-sm hover:bg-green-100 hover:shadow-lg transition"
                                                        >
                                                            <PencilSquareIcon className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                openDeleteModal(
                                                                    product.id
                                                                )
                                                            }
                                                            className="p-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow-sm hover:bg-red-100 hover:shadow-lg transition"
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="text-center py-6 text-gray-500"
                                            >
                                                No hay productos disponibles.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
            {modalOpen && (
                <ConfirmDelete
                    product={products.find((p) => p.id === selectedProduct)}
                    onClose={closeModal}
                    onConfirm={handleDelete}
                />
            )}
        </AuthenticatedLayout>
    );
}
