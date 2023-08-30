<script lang="ts"
        setup>
const { hasAccess } = useAuthorization();

const { formArr, getAccessLog } = useAccount();

const route = useRoute();

const { filterDate, filterString, formatDate } = useSearchGrid();

const columnDefs = [
    {
        field: 'date_from',
        headerName: 'Login Date',
        filter: 'agDateColumnFilter',
        filterParams: filterDate(),
        valueFormatter: formatDate
    },
    {
        field: 'ipaddress',
        headerName: 'IP Address',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    },
    {
        field: 'reverse_ipaddress',
        headerName: 'Reverse IP Address',
        filter: 'agTextColumnFilter',
        filterParams: filterString()
    }
];

definePageMeta({
    description: 'Account Access Log',
    title: 'Account Access Log'
});

onMounted(() => {
    getAccessLog();

    hasAccess('client_account.view_accesslog');
});

useHead({
    title: `${route.meta['title']}`
});
</script>

<template>
    <NavButtonAccount/>

    <SearchGrid :column-defs="columnDefs"
                :form-arr="formArr"/>
</template>

<style scoped>

</style>