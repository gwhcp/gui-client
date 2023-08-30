<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { deleteProfile, formArr, formErrors, getSearch } = useBillingProfile();

const route = useRoute();

const { cellParams, cellStatus, cellSelected, filterString, formatActiveStatus } = useSearchGrid();

const columnDefs = [
    {
        field: 'id',
        headerName: 'Profile ID',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'name',
        headerName: 'Name',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'is_active',
        headerName: 'Status',
        filter: 'agTextColumnFilter',
        filterParams: filterString(),
        valueGetter: formatActiveStatus,
        cellStyle: cellStatus
    }
];

definePageMeta({
    description: 'Billing Profiles',
    title: 'Billing Profiles'
});

onMounted(() => {
    getSearch();

    hasAccess('client_billing_profile.view_billingprofile');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonBillingProfile :cellParams="cellParams"
                             :cellSelected="cellSelected"
                             :deleteFunction="deleteProfile"
                             :formErrors="formErrors"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>