import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseStoreProductInterface {
    createOrder: (values: Record<string, unknown>) => Promise<void>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        billing_profile: number;
        coupon_code: string;
        domain: boolean;
        mail: boolean;
        mysql: boolean;
        postgresql: boolean;
        store_product: object,
        store_product_price: number;
    }>;
    formSuccess: ComputedRef<boolean>;
    getProduct: (product_id: string) => Promise<void>;
    getProductDomain: () => Promise<void>;
    getProductPrices: (product_id: string) => Promise<void>;
    getProductTypes: () => Promise<void>;
}

export const useStoreProduct = (): UseStoreProductInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const createOrder = async (values: Record<string, unknown>) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('client/store/product/create', 'POST', values);

        if (!processorSuccess.value) {
            localStoreProduct.formErrors = processorErrors.value;
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Order has been created.',
                type: 'success'
            });

            await router.push({ path: '/' });
        }

        loadingState.isActive = false;
    };

    const formArr = computed(() => {
        return localStoreProduct.formArr;
    });

    const formErrors = computed(() => {
        return localStoreProduct.formErrors;
    });

    const formObj = computed(() => {
        return localStoreProduct.formObj;
    });

    const formSuccess = computed(() => {
        return localStoreProduct.formSuccess;
    });

    const getProduct = async (product_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`client/store/product/${product_id}`, 'GET', null);

        localStoreProduct.formObj['store_product'] = processorObj.value;

        loadingState.isActive = false;
    };

    const getProductDomain = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('client/store/product/search/product/domain', 'GET', null);

        localStoreProduct.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const getProductPrices = async (product_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess(`client/store/product/search/${product_id}/prices`, 'GET', null);

        localStoreProduct.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const getProductTypes = async () => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess('client/store/product/search/types', 'GET', null);

        localStoreProduct.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const localStoreProduct: UnwrapNestedRefs<any> = reactive({
        formArr: [],
        formErrors: {},
        formObj: {
            billing_profile: 0,
            coupon_code: '',
            domain: false,
            mail: false,
            mysql: false,
            postgresql: false,
            store_product: {},
            store_product_price: 0
        },
        formSuccess: false
    });

    return {
        createOrder,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getProduct,
        getProductDomain,
        getProductPrices,
        getProductTypes
    };
};