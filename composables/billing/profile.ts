import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseBillingProfileInterface {
    createProfile: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    deleteProfile: (values: { id: string; }) => Promise<boolean>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        address: string;
        city: string;
        country: string;
        credit_card_cvv2: number;
        credit_card_month: number;
        credit_card_name: string;
        credit_card_number: number;
        credit_card_type: string;
        credit_card_year: number;
        date_from: string;
        name: string;
        primary_phone: string;
        state: string;
        zipcode: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getEdit: (billing_id: string) => Promise<void>;
    getSearch: () => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useBillingProfile = (): UseBillingProfileInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const { selectionClear } = useSearchGrid();

    const createProfile = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('client/billing/profile/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Billing profile has been created.',
                type: 'success'
            });

            await router.push({ path: '/billing/profile' });
        }

        loadingState.isActive = false;
    };

    const deleteProfile = async (values: { id: string; }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`client/billing/profile/${values['id']}/delete`, 'DELETE', null);

        if (!processorSuccess.value) {
            localBillingProfile.formErrors = processorErrors.value;
        } else {
            localBillingProfile.formArr = localBillingProfile.formArr.filter((item: {
                [x: string]: string;
            }) => item['id'] !== values['id']);

            selectionClear();

            localBillingProfile.formSuccess = true;
        }

        loadingState.isActive = false;

        return processorSuccess.value;
    };

    const formArr = computed(() => {
        return localBillingProfile.formArr;
    });

    const formErrors = computed(() => {
        return localBillingProfile.formErrors;
    });

    const formObj = computed(() => {
        return localBillingProfile.formObj;
    });

    const formSuccess = computed(() => {
        return localBillingProfile.formSuccess;
    });

    const getEdit = async (billing_id: string) => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess(`client/billing/profile/${billing_id}/edit`, 'GET', null);

        localBillingProfile.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const getSearch = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('client/billing/profile/search', 'GET', null);

        localBillingProfile.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const localBillingProfile: UnwrapNestedRefs<any> = reactive({
        formArr: [],
        formErrors: {},
        formObj: {
            address: '',
            city: '',
            country: '',
            credit_card_cvv2: '',
            credit_card_month: '',
            credit_card_name: '',
            credit_card_number: '',
            credit_card_type: '',
            credit_card_year: '',
            date_from: '',
            name: '',
            primary_phone: '',
            state: '',
            zipcode: ''
        },
        formSuccess: false
    });

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess(`client/billing/profile/${values['billing']}/edit`, 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Billing profile has been updated.',
                type: 'success'
            });

            await router.push({ path: '/billing/profile' });
        }

        loadingState.isActive = false;
    };

    return {
        createProfile,
        deleteProfile,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getEdit,
        getSearch,
        updateProfile
    };
};