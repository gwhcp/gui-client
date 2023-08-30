import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseStoreCouponInterface {
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        amount: string;
        coupon_code: string;
        coupon_is_active: boolean;
        id: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    validateCoupon: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useStoreCoupon = (): UseStoreCouponInterface => {
    const { loadingState } = usePageLoading();

    const formErrors = computed(() => {
        return localStoreCoupon.formErrors;
    });

    const formObj = computed(() => {
        return localStoreCoupon.formObj;
    });

    const formSuccess = computed(() => {
        return localStoreCoupon.formSuccess;
    });

    const localStoreCoupon: UnwrapNestedRefs<any> = reactive({
        formErrors: {},
        formObj: {
            amount: '0.00',
            coupon_code: '',
            coupon_is_active: false,
            id: ''
        },
        formSuccess: false
    });

    const validateCoupon = async (values: Record<string, any>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`client/store/coupon/validate/${values['coupon_code'].toLowerCase()}`, 'GET', null);

        if (processorObj.value['error']) {
            actions.setErrors(processorObj.value['errors']);

            localStoreCoupon.formObj['amount'] = '0.00';

            localStoreCoupon.formObj['coupon_is_active'] = false;

            localStoreCoupon.formObj['coupon_code'] = '';

            localStoreCoupon.formObj['id'] = '';
        } else {
            localStoreCoupon.formObj['amount'] = processorObj.value['amount'];

            localStoreCoupon.formObj['coupon_is_active'] = true;

            localStoreCoupon.formObj['coupon_code'] = values['coupon_code'].toLowerCase();

            localStoreCoupon.formObj['id'] = processorObj.value['id'];
        }

        loadingState.isActive = false;
    }

    return {
        formErrors,
        formObj,
        formSuccess,
        validateCoupon
    };
};