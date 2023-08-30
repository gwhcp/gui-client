import { ComputedRef, UnwrapNestedRefs } from "vue";

interface UseAccountInterface {
    choices: ComputedRef<Record<string, string>>;
    createAccount: (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    formArr: ComputedRef<string[]>;
    formErrors: ComputedRef<Record<string, unknown>>;
    formObj: ComputedRef<{
        address: string;
        city: string;
        comment_order: string;
        confirmed_password: string;
        country: string;
        date_from: string;
        email: string;
        first_name: string;
        last_name: string;
        old_password: string;
        password: string;
        primary_phone: string;
        secondary_phone: null | string;
        state: string;
        time_format: number;
        time_zone: string;
        zipcode: string;
    }>;
    formSuccess: ComputedRef<boolean>;
    getAccessLog: () => Promise<void>;
    getChoices: () => Promise<void>;
    getEdit: () => Promise<void>;
    updatePassword: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
    updateProfile: (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void
    }) => Promise<void>;
}

export const useAccount = (): UseAccountInterface => {
    const { loadingState } = usePageLoading();

    const { $event } = useNuxtApp();

    const router = useRouter();

    const choices = computed(() => {
        return localAccount.choices;
    });

    const createAccount = async (values: Record<string, unknown>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('client/account/create', 'POST', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Client account has been created.',
                type: 'success'
            });

            await router.push({ path: '/auth' });
        }

        loadingState.isActive = false;
    };

    const formArr = computed(() => {
        return localAccount.formArr;
    });

    const formErrors = computed(() => {
        return localAccount.formErrors;
    });

    const formObj = computed(() => {
        return localAccount.formObj;
    });

    const formSuccess = computed(() => {
        return localAccount.formSuccess;
    });

    const getAccessLog = async () => {
        loadingState.isActive = true;

        const { doProcess, processorArr } = await useProcessor();

        await doProcess('client/account/accesslog', 'GET', null);

        localAccount.formArr = processorArr.value;

        loadingState.isActive = false;
    };

    const getChoices = async () => {
        const { doProcess, processorObj } = await useProcessor();

        await doProcess('client/account/choices', 'GET', null);

        localAccount.choices = processorObj.value;
    };

    const getEdit = async () => {
        loadingState.isActive = true;

        const { doProcess, processorObj } = await useProcessor();

        await doProcess('client/account/edit', 'GET', null);

        localAccount.formObj = processorObj.value;

        loadingState.isActive = false;
    };

    const localAccount: UnwrapNestedRefs<any> = reactive({
        choices: {
            comment: {},
            timeformat: {},
            timezone: {}
        },
        formArr: [],
        formErrors: {},
        formObj: {
            address: '',
            city: '',
            comment_order: '',
            confirmed_password: '',
            country: '',
            date_from: '',
            email: '',
            first_name: '',
            last_name: '',
            old_password: '',
            password: '',
            primary_phone: '',
            secondary_phone: null,
            state: '',
            time_format: 12,
            time_zone: '',
            zipcode: ''
        },
        formSuccess: false
    });

    const updatePassword = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('client/account/password', 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Password has been updated.',
                type: 'success'
            });

            await router.push({ path: '/client/account' });
        }

        loadingState.isActive = false;
    };

    const updateProfile = async (values: Record<string, string>, actions: {
        setErrors: (arg0: Record<string, unknown>) => void;
    }) => {
        loadingState.isActive = true;

        const { doProcess, processorErrors, processorSuccess } = await useProcessor();

        await doProcess('client/account/edit', 'PATCH', values);

        if (!processorSuccess.value) {
            actions.setErrors(processorErrors.value);
        } else {
            // @ts-ignore
            $event('alert', {
                display: processorSuccess.value,
                message: 'Profile has been updated.',
                type: 'success'
            });

            await router.push({ path: '/account' });
        }

        loadingState.isActive = false;
    };

    return {
        choices,
        createAccount,
        formArr,
        formErrors,
        formObj,
        formSuccess,
        getAccessLog,
        getChoices,
        getEdit,
        updatePassword,
        updateProfile
    };
};