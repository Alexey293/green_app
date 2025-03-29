import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useRef, useState } from "react";

export default function Form({
    data,
    setData,
    errors,
    categories,
    brands,
    submit,
    product = {},
}) {
    const [previewImages, setPreviewImages] = useState([]);
    const fileInputRef = useRef(null);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Generar previews
        const newPreviews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setPreviewImages([...previewImages, ...newPreviews]);

        // Actualizar data.images para enviar al backend
        setData("images", [...(data.images || []), ...files]);
    };

    const removeImage = (index, imageId = null) => {
        if (imageId) {
            // Es una imagen existente que queremos eliminar
            setImagesToDelete([...imagesToDelete, imageId]);
        }

        // Eliminar de las previews o imágenes nuevas
        const updatedPreviews = [...previewImages];
        updatedPreviews.splice(index, 1);
        setPreviewImages(updatedPreviews);

        // Actualizar data.images
        const updatedImages = [...data.images];
        updatedImages.splice(index, 1);
        setData("images", updatedImages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submit({
            ...data,
            deleted_images: imagesToDelete,
        });
    };
    return (
        <form
            onSubmit={submit}
            className="grid grid-cols-2 gap-6"
            encType="multipart/form-data"
        >
            <div className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Nombre*" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="w-full"
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Descripción*" />
                    <textarea
                        id="description"
                        name="description"
                        value={data.description}
                        className="w-full border-gray-300 rounded-md"
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    <InputError message={errors.description} />
                </div>

                <InputLabel htmlFor="price" value="Precio*" />
                <div className="relative">
                    <div className="flex items-center">
                        <span className="absolute left-3 text-gray-500">$</span>
                        <TextInput
                            id="price"
                            type="number"
                            name="price"
                            value={data.price}
                            className="w-full pl-7"
                            onChange={(e) =>
                                setData("price", parseFloat(e.target.value))
                            }
                        />
                    </div>
                    <InputError message={errors.price} />
                </div>

                <div>
                    <InputLabel htmlFor="stock" value="Stock*" />
                    <TextInput
                        id="stock"
                        type="number"
                        name="stock"
                        value={data.stock}
                        className="w-full"
                        onChange={(e) =>
                            setData("stock", parseInt(e.target.value))
                        }
                    />
                    <InputError message={errors.stock} />
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <InputLabel htmlFor="category_id" value="Categoría*" />
                    <select
                        id="category_id"
                        name="category_id"
                        value={data.category_id}
                        className="w-full border-gray-300 rounded-md"
                        onChange={(e) => setData("category_id", e.target.value)}
                    >
                        <option value="">Seleccionar Opción</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.category_id} />
                </div>

                <div>
                    <InputLabel htmlFor="brand_id" value="Marca" />
                    <select
                        id="brand_id"
                        name="brand_id"
                        value={data.brand_id}
                        className="w-full border-gray-300 rounded-md"
                        onChange={(e) => setData("brand_id", e.target.value)}
                    >
                        <option value="">Seleccionar Opción</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.brand_id} />
                </div>

                <div>
                    <InputLabel htmlFor="size" value="Talla*" />
                    <select
                        id="size"
                        name="size"
                        value={data.size}
                        className="w-full border-gray-300 rounded-md"
                        onChange={(e) => setData("size", e.target.value)}
                    >
                        <option value="">Seleccionar Talla</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                    <InputError message={errors.size} />
                </div>

                <div>
                    <InputLabel htmlFor="color" value="Color" />
                    <select
                        id="color"
                        name="color"
                        value={data.color}
                        className="w-full  border-gray-300 rounded-md"
                        onChange={(e) => setData("color", e.target.value)}
                    >
                        <option value="">Seleccionar Color</option>
                        <option>Rojo</option>
                        <option>Azul marino</option>
                        <option>Amarillo</option>
                        <option>Blanco</option>
                        <option>Negro</option>
                        <option>Gris claro</option>
                        <option>Gris oscuro</option>
                        <option>Verde</option>
                        <option>Naranja</option>
                        <option>Púrpura</option>
                        <option>Beige</option>
                        <option>Marrón</option>
                        <option>Rosa</option>
                        <option>Turquesa</option>
                    </select>
                    <InputError message={errors.size} />
                </div>

                <div>
                    <InputLabel htmlFor="status" value="Estado" />
                    <div className="flex items-center">
                        <input
                            id="status"
                            type="checkbox"
                            checked={data.status}
                            className="h-5 w-5 text-gray-700"
                            onChange={(e) =>
                                setData("status", e.target.checked)
                            }
                        />
                        <span className="ml-2 text-gray-700">Activo</span>
                    </div>
                    <InputError message={errors.status} />
                </div>

                <div>
                    <InputLabel
                        htmlFor="images"
                        value="Imágenes del producto"
                    />
                    <input
                        type="file"
                        id="images"
                        name="images"
                        ref={fileInputRef}
                        className="w-full mt-1"
                        onChange={handleFileChange}
                        multiple
                        accept="image/*"
                    />
                    <InputError message={errors.images} />

                    {/* Previsualización de imágenes */}
                    <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                            {/* Imágenes existentes */}
                            {product.images?.map((image, index) => (
                                <div
                                    key={`existing-${image.id}`}
                                    className="relative group"
                                >
                                    <img
                                        src={
                                            image.url.startsWith("http")
                                                ? image.url
                                                : `/storage/${image.url}`
                                        }
                                        alt={`Imagen de ${product.name}`}
                                        className="w-20 h-20 object-cover rounded border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeImage(index, image.id)
                                        }
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}

                            {/* Nuevas imágenes (previews) */}
                            {previewImages.map((preview, index) => (
                                <div
                                    key={`preview-${index}`}
                                    className="relative group"
                                >
                                    <img
                                        src={preview.preview}
                                        alt={`Previsualización ${index + 1}`}
                                        className="w-20 h-20 object-cover rounded border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        {product.images?.length === 0 &&
                            previewImages.length === 0 && (
                                <p className="text-gray-500 mt-2">
                                    No hay imágenes seleccionadas
                                </p>
                            )}
                    </div>
                </div>
            </div>

            <div className="col-span-2 flex justify-end mt-4 gap-4">
                <PrimaryButton type="submit">Guardar cambios</PrimaryButton>
            </div>
        </form>
    );
}
