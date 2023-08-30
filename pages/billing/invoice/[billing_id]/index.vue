<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { formArr, getSearch } = useBillingInvoice();

const route = useRoute();

const { cellParams, cellSelected, filterDate, filterString, formatDate } = useSearchGrid();

const columnDefs = [
    {
        field: 'id',
        headerName: 'Invoice ID',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'store_product_name',
        headerName: 'Store Product',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'date_from',
        headerName: 'Date',
        filter: 'agDateColumnFilter',
        filterParams: filterDate(),
        valueFormatter: formatDate
    }
];

definePageMeta({
    description: 'Billing Invoices',
    title: 'Billing Invoices'
});

onMounted(() => {
    getSearch(route.params['billing_id'].toString());

    hasAccess('client_billing_invoice.view_billinginvoice');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonBillingInvoice :cellParams="cellParams"
                             :cellSelected="cellSelected"/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>