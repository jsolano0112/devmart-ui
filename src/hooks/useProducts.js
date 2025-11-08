import { productTypes } from "../types/productTypes";
import { getAllProducts } from "../api/productsService";

export const useProducts= (dispatch) => {
    const getProducts = async () => {

        dispatch({ type: productTypes.loadingProducts });
        
        const { ok, products, errorMessage } = await getAllProducts();
        
        if (!ok) {
            dispatch({
                type: productTypes.productsError,
                payload: errorMessage
            });
            return false;
        }
        console.log("usepr",products)
        dispatch({
            type: productTypes.getProducts,
            payload: products
        });
        return true;
    };

    // const getProductById = async (id) => {
    //     dispatch({ type: productTypes.loadingProducts });
        
    //     try {
    //         // Aquí puedes implementar la llamada individual al producto
    //         // Por ahora usaremos el array existente
    //         const product = productState.products.find(p => p.id === id);
            
    //         if (product) {
    //             dispatch({
    //                 type: productTypes.getProductById,
    //                 payload: product
    //             });
    //             return true;
    //         } else {
    //             dispatch({
    //                 type: productTypes.productsError,
    //                 payload: "Producto no encontrado"
    //             });
    //             return false;
    //         }
    //     } catch (error) {
    //         dispatch({
    //             type: productTypes.productsError,
    //             payload: "Error al obtener el producto"
    //         });
    //         return false;
    //     }
    // };

    // const createProduct = async (productData) => {
    //     dispatch({ type: productTypes.loadingProducts });
        
    //     try {
    //         // Implementar llamada a API para crear producto
    //         // const { ok, data, errorMessage } = await createProductAPI(productData);
            
    //         // Simulación por ahora
    //         const newProduct = {
    //             id: Date.now(), // Temporal
    //             ...productData
    //         };
            
    //         dispatch({
    //             type: productTypes.createProduct,
    //             payload: newProduct
    //         });
    //         return true;
    //     } catch (error) {
    //         dispatch({
    //             type: productTypes.productsError,
    //             payload: "Error al crear el producto"
    //         });
    //         return false;
    //     }
    // };

    // const updateProduct = async (id, productData) => {
    //     dispatch({ type: productTypes.loadingProducts });
        
    //     try {
    //         // Implementar llamada a API para actualizar producto
    //         // const { ok, data, errorMessage } = await updateProductAPI(id, productData);
            
    //         // Simulación por ahora
    //         const updatedProduct = {
    //             id,
    //             ...productData
    //         };
            
    //         dispatch({
    //             type: productTypes.updateProduct,
    //             payload: updatedProduct
    //         });
    //         return true;
    //     } catch (error) {
    //         dispatch({
    //             type: productTypes.productsError,
    //             payload: "Error al actualizar el producto"
    //         });
    //         return false;
    //     }
    // };

    // const deleteProduct = async (id) => {
    //     dispatch({ type: productTypes.loadingProducts });
        
    //     try {
    //         // Implementar llamada a API para eliminar producto
    //         // const { ok, errorMessage } = await deleteProductAPI(id);
            
    //         // Simulación por ahora
    //         dispatch({
    //             type: productTypes.deleteProduct,
    //             payload: id
    //         });
    //         return true;
    //     } catch (error) {
    //         dispatch({
    //             type: productTypes.productsError,
    //             payload: "Error al eliminar el producto"
    //         });
    //         return false;
    //     }
    // };
    return {getProducts}
};
