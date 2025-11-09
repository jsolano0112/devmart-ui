import { productTypes } from "../types/productTypes";
import { createProduct, deleteProductBySku, getAllProducts, updateProduct } from "../api/productsService";

export const useProducts = (dispatch) => {
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
        dispatch({
            type: productTypes.getProducts,
            payload: products
        });
        return true;
    };

    const createOneProduct = async (newProduct) => {
        dispatch({ type: productTypes.loadingProducts });

        const { ok, data, errorMessage } = await createProduct(newProduct);
        console.log(data)
        if (!ok) {
            dispatch({
                type: productTypes.productsError,
                payload: errorMessage
            });
            return false;
        }

        setTimeout(async () => {
            await getProducts();
        }, 500);


        return true;
    };

    const updateOneProduct = async (productData) => {
        dispatch({ type: productTypes.loadingProducts });
        const { ok, data, errorMessage } = await updateProduct(productData);
        console.log(data)
        if (!ok) {
            dispatch({
                type: productTypes.productsError,
                payload: errorMessage
            });
            return false;
        }
        dispatch({
            type: productTypes.updateProduct,
            payload: productData
        });
        return true
    };

    const deleteOneProduct = async (sku) => {
        dispatch({ type: productTypes.loadingProducts });
        const { ok, data, errorMessage } = await deleteProductBySku(sku);
        console.log(data)
        if (!ok) {
            dispatch({
                type: productTypes.productsError,
                payload: errorMessage
            });
            return false;
        }
        dispatch({
            type: productTypes.deleteProduct,
            payload: sku
        });
        return true
    };
    return { getProducts, createOneProduct, deleteOneProduct, updateOneProduct }
};
